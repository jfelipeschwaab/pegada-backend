import * as MissionService from '../services/missions.service.js';

export async function getMissions(req, res) {
    try {
        const missions = await MissionService.listMissions();
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function postMission(req, res) {
    try {
        const { created_at, name, description, base_points, points_multiplier, is_active, start_at, end_at } = req.body;
        if (!name || !description || !base_points || !points_multiplier) {
            return res.status(400).json({ error: 'Nome, Descrição, Pontos Base e Multiplicador de Pontos são obrigatórios.' });
        }
        const newMission = await MissionService.createMission(created_at, name, description, base_points, points_multiplier, is_active, start_at, end_at);
        res.status(201).json(newMission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function postCompleteMission(req, res) {
    try {
        const { user_id, mission_id } = req.body;
        if (!user_id || !mission_id) {
            return res.status(400).json({ error: 'ID do usuário e ID da missão são obrigatórios.' });
        }
        const completionResult = await MissionService.completeMissionRewardPoints({ user_id, mission_id });
        res.status(200).json(completionResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}