import { Server } from "@hocuspocus/server";
import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";

/**
 * Service that manages the Hocuspocus WebSocket server for collaborative editing.
 * Handles server lifecycle including startup and graceful shutdown.
 */
@Injectable()
export class HocuspocusService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(HocuspocusService.name);
  private server: Server;

  /**
   * Initializes the Hocuspocus server when the module loads.
   * Creates a new server instance and starts listening on port 1234.
   */
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

  /**
   * Gracefully shuts down the Hocuspocus server when the module is destroyed.
   * Ensures all connections are properly closed.
   */
  async onModuleDestroy() {
    if (this.server) {
      await this.server.destroy();
      this.logger.log("Hocuspocus server stopped");
    }
  }

  /**
   * Returns the underlying Hocuspocus server instance.
   * @returns {Server} The Hocuspocus server instance.
   */
  getServer(): Server {
    return this.server;
  }
}
