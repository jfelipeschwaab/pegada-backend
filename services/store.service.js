import { supabase } from './supabase.js'

export async function createStore(created_at, name, cnpj, address, isActive, updated_at) {
    try {
        const { data: existingStore, error: findError } = await supabase
            .from('stores')
            .select('*')
            .eq('cnpj', cnpj)
            .single();

        if (findError && findError.code !== 'PGRST116') {
            throw new Error(`Erro ao verificar loja existente: ${findError.message}`);
        }

        if (existingStore) {
            throw new Error('Loja com este CNPJ já existe.');
        }

        const { data: storeCreated, error: insertError } = await supabase
            .from('stores')
            .insert([{ created_at, name, cnpj, address, isActive, updated_at }])
            .select()
            .single();
        if (insertError) {
            throw new Error(`Erro ao criar loja: ${insertError.message}`);
        }
        return storeCreated;
    } catch (error) {
        console.error("Erro ao criar loja:", error.message)
        throw error
    }
}

export async function listStores(){
    try {
        const { data: stores, error } = await supabase
            .from('stores')
            .select('*');
        if (error) {
            throw new Error(`Erro ao buscar lojas: ${error.message}`);
        }
        return stores;
    } catch (error) {
        console.error("Erro ao buscar lojas:", error.message)
        throw error
    }
}

export async function listStoreByCNPJ(cnpj) {
    try {
        if (!cnpj) {
            throw new Error('CNPJ é obrigatório para buscar a loja.');
        }

        const { data: store, error } = await supabase
            .from('stores')
            .select('*')
            .eq('cnpj', cnpj)
            .single();

        if (error) {
            throw new Error(`Erro ao buscar loja: ${error.message}`);
        }
        return store;
    } catch (error) {
        console.error("Erro ao buscar loja:", error.message)
        throw error
    }
}