import * as StoreService from '../services/store.service.js';

export async function getStores(req,res) {
    try {
        const stores = await StoreService.listStores();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getStoreByCNPJ(req, res) {
    try {
        const { cnpj } = req.body;
        if(!cnpj) {
            return  res.status(400).json({ error: 'CNPJ é obrigatório.' });
        }
        const store = await StoreService.listStoreByCNPJ(cnpj);
        if (!store) {
            return res.status(404).json({ error: 'Loja não encontrada.' });
        }
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function postStore(req, res) {
    try {
        const {created_at, name, cnpj, address, isActive, updated_at} = req.body;
        if(!name || !cnpj || !address) {
            return res.status(400).json({ error: 'Nome, CNPJ e Endereço são obrigatórios.' });
        }
        const newStore = await StoreService.createStore(created_at, name, cnpj, address, isActive, updated_at);
        res.status(201).json(newStore);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   