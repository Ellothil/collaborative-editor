import { Body, Controller, Get, Post } from "@nestjs/common";
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
}
