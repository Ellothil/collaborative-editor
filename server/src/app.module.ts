import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DocumentsModule } from "./documents/documents.module";
import { HocuspocusModule } from "./hocuspocus/hocuspocus.module";

/**
 * Root application module that orchestrates all application components.
 */
@Module({
  imports: [HocuspocusModule, DocumentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
