import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import { config } from '@wahyoo/wahyoo-shared';

@Injectable()
export class JWTService {
  constructor() {}

  public createTokenInternalAPI(): string {
    const secretKey = config.internalAPISecretKey;
    const expiredDate = moment().add(15, 'days');
    const expiredInMilliseconds = expiredDate.toDate().getMilliseconds();
    const jwtPayload = {
      id: config.internalAPIUserId,
      email: 'system.api@wahyoo.com',
      firstName: 'system',
      lastName: 'api',
      countryCode: '+62',
      phone: '812345678910',
      username: '',
      expToken: expiredDate
    };

    return jwt.sign(jwtPayload, secretKey, {
      expiresIn: expiredInMilliseconds
    });
  }

  public renewTokenInternalAPI(token: string): string {
    const secretKey = config.internalAPISecretKey;
    try {
      const payload = jwt.verify(token, secretKey);
      if (payload) {
        return token;
      }
    } catch (err) {
      console.log('token already expired');
    } finally {
      return this.createTokenInternalAPI();
    }
  }
}
