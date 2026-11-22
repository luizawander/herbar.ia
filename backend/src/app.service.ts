import { Injectable } from '@nestjs/common';

export interface HealthStatus {
  status: 'ok';
  service: string;
  timestamp: string;
}

@Injectable()
export class AppService {
  /**
   * Returns basic liveness metadata so the mobile app can verify LAN connectivity.
   */
  getHealth(): HealthStatus {
    return {
      status: 'ok',
      service: 'herbaria-backend',
      timestamp: new Date().toISOString(),
    };
  }
}

