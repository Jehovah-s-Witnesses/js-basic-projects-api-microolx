import JWT from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { Session } from '../db/Session';
const { sign, verify } = JWT;
const SECRET_KEY = 'SECRET';

export const sessionService = {
  async generateTokens(userId: string) {
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = randomUUID();
    const expiresIn = this.generateExpiresTime();
    const session = new Session({
      refreshToken,
      userId,
      expiresIn,
    });

    await session.save();

    return { accessToken, refreshToken };
  },
  async refreshTokens(refreshToken: string) {
    const currentSession = await Session.findOne({ refreshToken });

    if (currentSession && +currentSession.expiresIn > Date.now()) {
      const newAccessToken = this.generateAccessToken(
        currentSession.userId.toString(),
      );
      const newRefreshToken = randomUUID();
      const expiresIn = this.generateExpiresTime();

      await Session.updateOne(
        { refreshToken },
        { refreshToken: newRefreshToken, expiresIn },
      );

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    await this.deleteSession(refreshToken);
    throw new Error('Session does not exist or expired');
  },

  generateAccessToken(userId: string) {
    const accessToken = sign({ userId }, SECRET_KEY, {
      expiresIn: '5m',
    });

    return accessToken;
  },
  generateExpiresTime() {
    const expiresIn = new Date();
    expiresIn.setMonth(expiresIn.getMonth() + 2);

    return expiresIn;
  },
  async verifyToken(accessToken: string) {
    return verify(accessToken, SECRET_KEY) as { userId: string };
  },
  async deleteSession(refreshToken: string) {
    await Session.deleteOne({ refreshToken });
  },
};
