import { supabase } from './supabase.js'

export async function insertPointsIntoUser(user_id, points, safeCarbon) {
  try {
    const { data: user, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user_id);

    if (error) {
      throw new Error(error.message);
    }
    var newCurrentPoints = user[0].currentPoints + points;
    var newSafeCarbon = user[0].totalSafeCarbon + safeCarbon;
    var newTotalPoints = user[0].totalPoints + points;
    const { data: updatedUser, erro } = await supabase
      .from('profiles')
      .update({
        totalPoints: newTotalPoints,
        currentPoints: newCurrentPoints,
        totalSafeCarbon: newSafeCarbon,
      })
      .eq('id', user_id)
      .select();

    if (erro) {
      throw new Error(erro.message);
    }
    return updatedUser;
  } catch (err) {
    const message =
      err?.message ??
      err?.error_description ??
      'Erro desconhecido ao inserir pontos no usuário';

    throw new Error(`Erro ao inserir pontos no usuário: ${message}`);
  }
}