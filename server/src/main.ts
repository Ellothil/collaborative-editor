import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

/**
 * Bootstraps the NestJS application.
 * Creates and starts the HTTP server on the configured port.
 */
async function bootstrap() {
  const DEFAULT_PORT = 3000;
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for client requests from port 5173
  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}
bootstrap();
