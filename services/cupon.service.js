import { supabase } from './supabase.js'

export async function createCupon(created_at,is_active,price_points, description, store_id, expiration_date){
    try {
        const {data: existingStore, error: findError}= await supabase
            .from('stores')
            .select('*')
            .eq('id', store_id)
            .single();

        if (!existingStore) {
            throw new Error(`Erro ao verificar loja existente: ${findError.message}`);
        }
        const { data: cuponCreated, error } = await supabase
            .from('cupons')
            .insert([{ created_at,is_active,price_points, description, store_id, expiration_date }])
            .select()
            .single();
        if (error) {
            throw new Error(`Erro ao criar cupom: ${error.message}`);
        }
        return cuponCreated;
    }catch(error){
        throw new Error(`Erro ao criar cupom: ${error.message}`);
    }
}

export async function listCupons() {
    try {
        const { data: cupons, error } = await supabase  
            .from('cupons')
            .select('*');
        if (error) {
            throw new Error(`Erro ao listar cupons: ${error.message}`);
        }
        return cupons;
    } catch (error) {
        throw new Error(`Erro ao listar cupons: ${error.message}`);
    }
}