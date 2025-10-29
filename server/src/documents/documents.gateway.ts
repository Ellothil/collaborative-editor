/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: <> */
import { Injectable } from "@nestjs/common";
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
@WebSocketGateway({
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
  },
})
export class DocumentsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly documentsService: DocumentsService;
  private readonly onlineUsers = new Map<string, User>();

  constructor(documentsService: DocumentsService) {
    this.documentsService = documentsService;
  }

  afterInit() {
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
