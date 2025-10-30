import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DocumentsModule } from "./documents/documents.module";
import { HocuspocusModule } from "./hocuspocus/hocuspocus.module";

/**
 * Root application module that orchestrates all application components.
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HocuspocusModule,
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
