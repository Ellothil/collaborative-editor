// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

/**
 * Bootstraps the NestJS application.
 * Creates and starts the HTTP server on the configured port.
 */
async function bootstrap() {
  const DEFAULT_PORT = 3000;
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS for client requests
  const allowedOrigins = configService.get("CORS_ORIGINS")?.split(",") || [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
  ];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  await app.listen(configService.get("PORT") || DEFAULT_PORT);
}
bootstrap();
