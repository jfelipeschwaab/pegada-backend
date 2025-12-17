import * as cuponRedeemedService from '../services/cuponsRedeemed.service.js';

export async function getCuponsRedeemedByUser(req, res) {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ error: 'ID do usuário é obrigatório.' });
        }
        const cuponsRedeemed = await cuponRedeemedService.getCuponsRedeemedByUser(user_id);
        res.status(200).json(cuponsRedeemed);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function postRedeemCupon(req, res) {
    try {
        const { user_id, cupom_id } = req.body;
        if (!user_id || !cupom_id) {
            return res.status(400).json({ error: 'ID do usuário e ID do cupom são obrigatórios.' });
        }
        const cuponRedeemed = await cuponRedeemedService.redeemCupon(user_id, cupom_id);
        res.status(201).json(cuponRedeemed);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}