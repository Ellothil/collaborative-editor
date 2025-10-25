import { Module } from "@nestjs/common";
import { HocuspocusService } from "./hocuspocus.service";

/**
 * Module that provides the Hocuspocus collaborative editing service.
 * Exports the HocuspocusService for use across the application.
 */
@Module({
  providers: [HocuspocusService],
  exports: [HocuspocusService],
})
export class HocuspocusModule {}
