import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

/**
 * Bootstraps the NestJS application.
 * Creates and starts the HTTP server on the configured port.
 */
async function bootstrap() {
  const DEFAULT_PORT = 3000;
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for client requests
  const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
  ];
  
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}
bootstrap();
