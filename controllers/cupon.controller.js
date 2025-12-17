import * as CuponService from '../services/cupon.service.js';

export async function getCupons(req, res) {
    try{
        const cupons = await CuponService.listCupons();
        res.status(200).json(cupons);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

export async function postCupon(req, res) {
    try{
        const { created_at,is_active,price_points, description, store_id, expiration_date } = req.body;
        if(!price_points || !description || !store_id || !expiration_date){
            return res.status(400).json({ error: 'Pontos do Cupom, Descrição, ID da Loja e Data de Expiração são obrigatórios.' });
        }
        const newCupon = await CuponService.createCupon(created_at,is_active,price_points, description, store_id, expiration_date);
        res.status(201).json(newCupon);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}