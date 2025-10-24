import { Server } from "@hocuspocus/server";
import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";

@Injectable()
export class HocuspocusService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(HocuspocusService.name);
  private server: Server;

  async onModuleInit() {
    this.server = new Server({
      port: 1234,
    });

    try {
      await this.server.listen();
      this.logger.log("Hocuspocus server started on port 1234");
    } catch (error) {
      this.logger.error("Failed to start Hocuspocus server", error);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.server) {
      await this.server.destroy();
      this.logger.log("Hocuspocus server stopped");
    }
  }

  getServer(): Server {
    return this.server;
  }
}
