import * as ProfileService from '../services/profile.service.js';

export async function postPoints(req, res) {
    try {
        const { user_id, points, safeCarbon } = req.body;

        if (!user_id) {
            return res.status(400).json({ error: 'ID do Usuário é obrigatório.' });
        }

        const updatedProfile = await ProfileService.insertPointsIntoUser(user_id, points, safeCarbon);
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}