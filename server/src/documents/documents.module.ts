import { Module } from "@nestjs/common";
import { DocumentsController } from "./documents.controller";
import { DocumentsGateway } from "./documents.gateway";
import { DocumentsService } from "./documents.service";

/**
 * Module for managing documents functionality
 */
@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsGateway],
})
export class DocumentsModule {}
