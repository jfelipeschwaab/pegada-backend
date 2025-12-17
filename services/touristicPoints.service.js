import { supabase } from './supabase.js'

export async function createTouristicPoint(created_at,name,address,lat,long,img_url,points_multiplier,is_active){
    try {
        const { data: touristicPointCreated, error } = await supabase
            .from('touristicPoints')
            .insert([{ created_at,name,address,lat,long,img_url,points_multiplier,is_active }])
            .select()
            .single();
        if (error) {
            throw new Error(`Erro ao criar ponto turístico: ${error.message}`);
        }
        return touristicPointCreated;
    } catch (error) {
        throw new Error(`Erro ao criar ponto turístico: ${error.message}`);
    }
}

export async function listTouristicPoints(){
    try {
        const { data: touristicPoints, error } = await supabase
            .from('touristicPoints')
            .select('*');
        if (error) {
            throw new Error(`Erro ao buscar pontos turísticos: ${error.message}`);
        }
        return touristicPoints;    
    } catch (error) {
        throw new Error(`Erro ao buscar pontos turísticos: ${error.message}`);
    }
}