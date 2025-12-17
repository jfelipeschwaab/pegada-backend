import { supabase } from './supabase.js'

export async function createMissionTouristicPoint( touristicPoint_id,mission_id) {
    try {
        const { data: missionTouristicPointCreated, error } = await supabase
            .from('mission_touristicPoints')
            .insert([{touristicPoint_id, mission_id }])
            .select()
            .single();
        if (error) {
            throw new Error(`Erro ao criar ponto turístico da missão: ${error.message}`);
        }
        return missionTouristicPointCreated;
    } catch (error) {
        throw new Error(`Erro ao criar ponto turístico da missão: ${error.message}`);
    }
}

export async function listMissionTouristicPoints() {
    try {
        const { data: missionTouristicPoints, error } = await supabase
            .from('mission_touristicPoints')
            .select('*');
        if (error) {
            throw new Error(`Erro ao buscar pontos turísticos da missão: ${error.message}`);
        }
        return missionTouristicPoints;
    } catch (error) {
        throw new Error(`Erro ao buscar pontos turísticos da missão: ${error.message}`);
    }
}