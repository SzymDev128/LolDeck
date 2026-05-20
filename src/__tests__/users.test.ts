import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '@/app.js';

vi.mock('@/lib/prisma.js', () => ({
  prisma: {
    user: {
      findMany: vi.fn(),
    },
  },
}));

import { prisma } from '@/lib/prisma.js';

const mockFindMany = vi.mocked(prisma.user.findMany);

describe('GET /api/users', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 with list of users', async () => {
    const users = [{ id: '1', email: 'test@test.com', createdAt: new Date() }];
    mockFindMany.mockResolvedValue(users as any);

    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].email).toBe('test@test.com');
  });

  it('returns 200 with empty array when no users', async () => {
    mockFindMany.mockResolvedValue([]);

    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns 500 when database throws', async () => {
    mockFindMany.mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/api/users');

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Internal server error');
  });
});
