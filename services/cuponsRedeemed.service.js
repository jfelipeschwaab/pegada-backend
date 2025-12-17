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



export async function redeemCupon(user_id, cupom_id){
    try {
        const { data: cuponRedeemed, error } = await supabase
            .from('couponsRedeemed')
            .insert([{ user_id, cupom_id }])
            .select()
            .single();
        if (error) {
            throw new Error(`Erro ao resgatar cupom: ${error.message}`);
        }
        return cuponRedeemed;
    } catch (error) {
         throw new Error(`Erro ao resgatar cupom: ${error.message}`);
    }
}