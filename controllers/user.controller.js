import * as UserService from '../services/user.service.js';

// =======================
// RANKING
// =======================
export async function getUsersRanking(req, res) {
    try {
        const users = await UserService.listUsersRanking();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// =======================
// PERFIL
// =======================
export async function getUserProfile(req, res) {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: 'ID do usuário é obrigatório.' });
        }

        const user = await UserService.getUserProfile(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// =======================
// ATUALIZAR NOME
// =======================
export async function updateUserName(req, res) {
    try {
        const { userId } = req.params;
        const { name } = req.body;

        if (!userId || !name) {
            return res.status(400).json({ error: 'ID do usuário e novo nome são obrigatórios.' });
        }

        const updatedUser = await UserService.updateUserName(userId, name);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
