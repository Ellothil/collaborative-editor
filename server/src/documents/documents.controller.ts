import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
// biome-ignore lint/style/useImportType: <>
import { type Document, DocumentsService } from "./documents.service";

/**
 * Controller for managing documents API endpoints
 */
@Controller("api/documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  /**
   * Get all documents
   * @returns List of all documents
   */
  @Get()
  getDocuments(): Promise<Document[]> {
    return this.documentsService.getAllDocuments();
  }

  /**
   * Create a new document
   * @param body Document creation data
   * @returns The created document
   */
  @Post()
  createDocument(@Body() body: { name: string }): Promise<Document> {
    return this.documentsService.createDocument(body.name);
  }

  /**
   * Delete a document
   * @param name Document name
   * @returns True if document was deleted
   */
  @Delete()
  deleteDocument(@Body() body: { name: string }): Promise<boolean> {
    return this.documentsService.deleteDocument(body.name);
  }
}
