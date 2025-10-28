import { Database } from "@hocuspocus/extension-database";
import { Server } from "@hocuspocus/server";
import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { Pool } from "pg";

// Initialize PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "collaborative_editor",
  password: process.env.DB_PASSWORD || "postgres",
  port: Number.parseInt(process.env.DB_PORT || "5432", 10),
});

/**
 * Service that manages the Hocuspocus WebSocket server for collaborative editing.
 * Handles server lifecycle including startup and graceful shutdown.
 */
@Injectable()
export class HocuspocusService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(HocuspocusService.name);
  private server: Server;

  /**
   * Creates the documents table if it doesn't exist.
   * A document consists of a unique uuid, a name, and yjs content.
   */
  private async ensureDocumentsTableExists() {
    try {
      // Create table if it does not exist
      await pool.query(`
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
   * Creates a new server instance and starts listening on port 1234.
   */
  async onModuleInit() {
    // Ensure the documents table exists before starting the server
    await this.ensureDocumentsTableExists();

    this.server = new Server({
      port: 1234,
      extensions: [
        new Database({
          fetch: async ({ documentName }) => {
            const res = await pool.query(
              "SELECT data FROM documents WHERE name = $1",
              [documentName]
            );
            return res.rows[0]?.data || null;
          },
          store: async ({ documentName, state }) => {
            await pool.query(
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
