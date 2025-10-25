import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HocuspocusModule } from './hocuspocus/hocuspocus.module';

/**
 * Root application module that orchestrates all application components.
 */
@Module({
  imports: [HocuspocusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
