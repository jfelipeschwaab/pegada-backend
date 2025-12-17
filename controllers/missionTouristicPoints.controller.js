import * as MissionTouristicService from '../services/mission_touristicPoints.service.js';

export async function getMissionTouristicPoints(req, res) {
    try {
        const missionTouristicPoints = await MissionTouristicService.listMissionTouristicPoints();
        res.status(200).json(missionTouristicPoints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}       

export async function postMissionTouristicPoint(req, res) {
    try {
        const { mission_id, touristicPoint_id } = req.body;
        if (!mission_id || !touristicPoint_id) {
            return res.status(400).json({ error: 'ID da missão e ID do ponto turístico são obrigatórios.' });
        }
        const newMissionTouristicPoint = await MissionTouristicService.createMissionTouristicPoint(mission_id, touristicPoint_id);
        res.status(201).json(newMissionTouristicPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   