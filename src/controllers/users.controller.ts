import { Request, Response } from 'express';
import { listUsers } from '@/services/users.service.js';

export async function getUsers(req: Request, res: Response) {
  // TODO: Error Handler Middleware instead of try/catch in every controller
  try {
    const users = await listUsers();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
}
