import { NextApiRequest, NextApiResponse } from 'next';
import { teamsData } from '../../../data/teams';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const team = teamsData.find((t: any) => t.id === Number(id));
  
  if (!team) {
    return res.status(404).json({ error: 'Team not found' });
  }
  
  return res.status(200).json(team);
} 