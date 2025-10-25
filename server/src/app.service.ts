import { Injectable } from '@nestjs/common';

/**
 * Basic application service providing core business logic.
 */
@Injectable()
export class AppService {
  /**
   * Returns a greeting message.
   * @returns {string} A hello world message.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
