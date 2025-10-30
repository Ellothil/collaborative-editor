/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: <> */
import { Injectable } from "@nestjs/common";
// biome-ignore lint/style/useImportType: <>
import { ConfigService } from "@nestjs/config";
import {
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  type OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import type { Server, Socket } from "socket.io";
// biome-ignore lint/style/useImportType: <>
import { DocumentsService } from "./documents.service";

type User = {
  id: string;
  name: string;
  color: string;
};

@Injectable()
@WebSocketGateway()
export class DocumentsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly documentsService: DocumentsService;
  private readonly onlineUsers = new Map<string, User>();
  private readonly cors_options;

  constructor(
    documentsService: DocumentsService,
    private readonly configService: ConfigService
  ) {
    this.documentsService = documentsService;
    this.cors_options = {
      origin: this.configService.get("CORS_ORIGINS")?.split(","),
    };
  }

  afterInit(server: Server) {
    console.log("CORS options in gateway:", this.cors_options);
    // Configure CORS dynamically
    const allowedOrigins = this.cors_options || [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ];

    server.engine.opts.cors = {
      origin: allowedOrigins,
      methods: ["GET", "POST", "DELETE"],
      credentials: true,
    };

    this.server.engine.opts.transports = ["websocket", "polling"];

    const events = this.documentsService.getDocumentEvents();
    events.on("documentCreated", (document) => {
      this.server.emit("documentCreated", document);
    });
    events.on("documentDeleted", (document) => {
      this.server.emit("documentDeleted", document);
    });
  }

  handleConnection(_client: Socket) {}

  handleDisconnect(client: Socket) {
    this.onlineUsers.delete(client.id);
    this.broadcastOnlineUsers();
  }

  @SubscribeMessage("userJoined")
  handleUserJoined(client: Socket, user: Omit<User, "id">) {
    const userData: User = {
      id: client.id,
      name: user.name,
      color: user.color,
    };
    this.onlineUsers.set(client.id, userData);
    this.broadcastOnlineUsers();
  }

  private broadcastOnlineUsers() {
    const users = Array.from(this.onlineUsers.values());
    this.server.emit("onlineUsers", users);
  }
}
