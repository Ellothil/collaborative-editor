import { Database } from "@hocuspocus/extension-database";
import { Server } from "@hocuspocus/server";
import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
// biome-ignore lint/style/useImportType: <explanation>
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";

/**
 * Service that manages the Hocuspocus WebSocket server for collaborative editing.
 * Handles server lifecycle including startup and graceful shutdown.
 */
@Injectable()
export class HocuspocusService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(HocuspocusService.name);
  private server: Server;
  private readonly pool: Pool;

  constructor(private configService: ConfigService) {
    // Initialize PostgreSQL connection pool
    this.pool = new Pool({
      user: this.configService.get("DB_USER") || "postgres",
      host: this.configService.get("DB_HOST") || "localhost",
      database: this.configService.get("DB_NAME") || "collaborative_editor",
      password: this.configService.get("DB_PASSWORD") || "postgres",
      port: Number.parseInt(this.configService.get("DB_PORT") || "5433", 10),
    });
  }

  /**
   * Creates the documents table if it doesn't exist.
   * A document consists of a unique uuid, a name, and yjs content.
   */
  private async ensureDocumentsTableExists() {
    try {
      // Create table if it does not exist
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS documents (
          name VARCHAR(255) PRIMARY KEY,
          data BYTEA,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch (error) {
      this.logger.error("Failed to create documents table", error);
      throw error;
    }
  }

  /**
   * Initializes the Hocuspocus server when the module loads.
   * Creates a new server instance and starts listening on the configured port.
   */
  async onModuleInit() {
    // Ensure the documents table exists before starting the server
    await this.ensureDocumentsTableExists();

    const hocuspocusPort = Number.parseInt(
      this.configService.get("HOCUSPOCUS_PORT") || "1234",
      10
    );

    this.server = new Server({
      port: hocuspocusPort,
      extensions: [
        new Database({
          fetch: async ({ documentName }) => {
            const res = await this.pool.query(
              "SELECT data FROM documents WHERE name = $1",
              [documentName]
            );
            return res.rows[0]?.data || null;
          },
          store: async ({ documentName, state }) => {
            await this.pool.query(
              `INSERT INTO documents(name, data)
           VALUES ($1, $2)
           ON CONFLICT (name) DO UPDATE SET data = EXCLUDED.data`,
              [documentName, state]
            );
          },
        }),
      ],
    });

    try {
      await this.server.listen();
      this.logger.log(`Hocuspocus server started on port ${hocuspocusPort}`);
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
