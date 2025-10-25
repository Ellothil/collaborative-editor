import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

/**
 * Main application controller providing basic endpoints.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Returns a greeting message.
   * @returns {string} A hello world message.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
