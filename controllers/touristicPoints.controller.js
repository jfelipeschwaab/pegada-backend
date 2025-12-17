import * as touristicPointsService from '../services/touristicPoints.service.js';

export async function getTouristicPoints(req, res) {
    try {
        const touristicPoints = await touristicPointsService.listTouristicPoints();
        res.status(200).json(touristicPoints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function postTouristicPoint(req, res) {
    try {
        const { created_at, name, address, lat, long, img_url, points_multiplier, is_active } = req.body;
        if (!name || !address) {
            return res.status(400).json({ error: 'Nome, Endereço são obrigatórios.' });
        }
        const newTouristicPoint = await touristicPointsService.createTouristicPoint(created_at, name, address, lat, long, img_url, points_multiplier, is_active);
        res.status(201).json(newTouristicPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}