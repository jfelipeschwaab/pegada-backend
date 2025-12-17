import { supabase } from './supabase.js'

export async function createMission(created_at, name, description, base_points, points_multiplier, is_active, start_at, end_at) {
    try {
        const { data: missionCreated, error } = await supabase
            .from('missions')
            .insert([{ created_at, name, description, base_points, points_multiplier, is_active, start_at, end_at }])
            .select()
            .single();
        if (error) {
            throw new Error(`Erro ao criar missão: ${error.message}`);
        }
        return missionCreated;
    } catch (error) {
        throw new Error(`Erro ao criar missão: ${error.message}`);
    }
}

export async function listMissions() {
    try {
        const { data: missions, error } = await supabase
            .from('missions')
            .select('*');
        if (error) {
            throw new Error(`Erro ao buscar missões: ${error.message}`);
        }
        return missions;
    } catch (error) {
        throw new Error(`Erro ao encontr missão: ${error.message}`);
    }
}

export async function completeMissionRewardPoints({
    user_id,
    mission_id
}) {

    const { data: user, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user_id)
        .maybeSingle();

    if (userError || !user) {
        throw new Error('Usuário não encontrado');
    }


    const now = new Date().toISOString();

    const { data: mission, error: missionError } = await supabase
        .from('missions')
        .select('*')
        .eq('id', mission_id)
        .maybeSingle();

    if (missionError || !mission) {
        throw new Error('Missão não encontrada');
    }

    if (!mission.is_active) {
        throw new Error('Missão inativa');
    }

    if (
        (mission.starts_at && mission.starts_at > now) ||
        (mission.ends_at && mission.ends_at < now)
    ) {
        throw new Error('Missão fora do período válido');
    }


    const basePoints = Number(mission.base_points?? 0);
    const multiplier = Number(mission.points_multiplier ?? 1);

    const pointsEarned = Math.floor(basePoints * multiplier);

    const { error: updateUserError } = await supabase
        .from('profiles')
        .update({
            totalPoints: user.totalPoints + pointsEarned,
            currentPoints: user.currentPoints + pointsEarned,
            updated_at: new Date().toISOString()
        })
        .eq('id', user_id);

    if (updateUserError) {
        throw new Error('Erro ao atualizar pontos do usuário');
    }


    const { error: historyError } = await supabase
        .from('pointsHistory')
        .insert({
            user_id,
            type: 'ganho',
            points: pointsEarned,
            mission_id: mission_id,
            created_at: new Date().toISOString()
        });

    if (historyError) {
        throw new Error('Erro ao registrar histórico de pontos');
    }

    return {
        success: true,
        pointsEarned,
        total_points: user.totalPoints + pointsEarned,
        current_points: user.currentPoints + pointsEarned
    };
}