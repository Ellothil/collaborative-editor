import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EventEmitter } from "node:events";
import { Pool } from "pg";

// Initialize PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "collaborative_editor",
  password: process.env.DB_PASSWORD || "postgres",
  port: Number.parseInt(process.env.DB_PORT || "5432", 10),
});

export type Document = {
  name: string;
  updated_at: string;
};

/**
 * Service for handling document-related database operations
 */
@Injectable()
export class DocumentsService {
  private readonly eventEmitter = new EventEmitter();

  /**
   * Get the event emitter for document changes
   */
  getDocumentEvents() {
    return this.eventEmitter;
  }

  /**
   * Get all documents
   * @returns List of all documents
   */
  async getAllDocuments(): Promise<Document[]> {
    try {
      const result = await pool.query(
        "SELECT name, updated_at FROM documents ORDER BY updated_at DESC"
      );
      return result.rows;
    } catch (error) {
      throw new HttpException(
        "Failed to fetch documents",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Create a new document
   * @param name Document name
   * @returns The created document
   */
  async createDocument(name: string): Promise<Document> {
    try {
      const result = await pool.query(
        "INSERT INTO documents (name) VALUES ($1) RETURNING name, updated_at",
        [name]
      );
      const document = result.rows[0];
      this.eventEmitter.emit('documentCreated', document);
      return document;
    } catch (error) {
      if (error.code === "23505") {
        // Unique violation
        throw new HttpException(
          "Document with this name already exists",
          HttpStatus.CONFLICT
        );
      }
      throw new HttpException(
        "Failed to create document",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get a specific document by name
   * @param name Document name
   * @returns Document data or null if not found
   */
  async getDocument(name: string): Promise<Document | null> {
    try {
      const result = await pool.query(
        "SELECT name, updated_at FROM documents WHERE name = $1",
        [name]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new HttpException(
        "Failed to fetch document",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Delete a document
   * @param name Document name
   * @returns True if deleted, false if not found
   */
  async deleteDocument(name: string): Promise<boolean> {
    try {
      const result = await pool.query("DELETE FROM documents WHERE name = $1", [
        name,
      ]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      throw new HttpException(
        "Failed to delete document",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
