import JWT from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { Session } from '../db/Session.js';
const { sign, verify } = JWT;
const SECRET_KEY = 'SECRET';

export const sessionService = {
  async generateTokens(userId) {
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = randomUUID();
    const expiresIn = this.generateExpiresTime();
    console.log(userId);
    const session = new Session({
      refreshToken,
      userId,
      expiresIn,
    });

    await session.save();

    return { accessToken, refreshToken };
  },
  async findSessionByToken(refreshToken) {
    await Session.findOne({ refreshToken });
  },
  async refreshTokens(refreshToken) {
    const currentSession = await Session.findOne({ refreshToken });

    if (currentSession && +currentSession.expiresIn > Date.now()) {
      const newAccessToken = this.generateAccessToken(currentSession.userId);
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

  generateAccessToken(userId) {
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
  async verifyToken(accessToken) {
    return verify(accessToken, SECRET_KEY);
  },
  async deleteSession(refreshToken) {
    await Session.deleteOne({ refreshToken });
  },
};
