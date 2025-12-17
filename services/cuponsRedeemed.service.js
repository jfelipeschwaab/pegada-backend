import { supabase } from './supabase.js'

export async function getCuponsRedeemedByUser(user_id) {
  try {
    const { data, error } = await supabase
      .from('couponsRedeemed')
      .select('*')
      .eq('user_id', user_id);

    if (error) throw error;

    return data ?? [];
  } catch (err) {
    const message =
      err?.message ??
      err?.error_description ??
      'Erro desconhecido ao buscar cupons resgatados';

    throw new Error(`Erro ao visualizar cupom do usuário: ${message}`);
  }
}



export async function redeemCupon(user_id, cupom_id) {
  try {
    /* 1️⃣ Buscar usuário */
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('id, currentPoints')
      .eq('id', user_id)
      .maybeSingle();

    if (userError || !user) {
      throw new Error('Usuário não encontrado');
    }

    const { data: cupom, error: cupomError } = await supabase
      .from('cupons')
      .select('id, price_points, is_active')
      .eq('id', cupom_id)
      .maybeSingle();

    if (cupomError || !cupom) {
      throw new Error('Cupom não encontrado');
    }

    const { data, error } = await supabase
      .from('couponsRedeemed')
      .select('*')
      .eq('user_id', user_id)
      .eq('cupom_id', cupom_id);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length > 0) {
      throw new Error('Cupom já resgatado por este usuário');
    }

    console.log(data, error);

    if (!cupom.is_active) {
      throw new Error('Cupom inativo');
    }

    const newPoints = user.currentPoints - cupom.price_points;

    /* 4️⃣ Atualizar pontos do usuário */
    const { error: updateUserError } = await supabase
      .from('profiles')
      .update({
        currentPoints: newPoints,
        updated_at: new Date().toISOString()
      })
      .eq('id', user_id);
    console.log(newPoints)


    if (updateUserError) {
      throw new Error('Erro ao debitar pontos do usuário');
    }

    /* 5️⃣ Registrar histórico */
    const { error: historyError } = await supabase
      .from('pointsHistory')
      .insert({
        created_at: new Date().toISOString(),
        user_id,
        points: cupom.price_points,
        type: 'gasto',
        mission_id: null,
      });

    if (historyError) {
      throw new Error('Erro ao registrar histórico de pontos');
    }

    /* 6️⃣ Registrar cupom resgatado */
    const { data: cuponRedeemed, error: redeemError } = await supabase
      .from('couponsRedeemed')
      .insert({
        user_id,
        cupom_id,
        rescue_at: new Date().toISOString()
      })
      .select()
      .single();

    if (redeemError) {
      throw new Error('Erro ao registrar cupom resgatado');
    }

    return {
      success: true,
      cuponRedeemed,
      remaining_points: newPoints
    };

  } catch (error) {
    throw new Error(`Erro ao resgatar a bomba cupom: ${error.message}`);
  }
}