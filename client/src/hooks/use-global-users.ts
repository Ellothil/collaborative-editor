import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { env } from "@/config/env";
import type { User } from "@/types/user";

type OnlineUser = User & {
  id: string;
};

/**
 * Hook to track all users currently online in the app using Socket.IO.
 *
 * @param {User} currentUser - The current user's information.
 * @returns {Object} An object containing all online users and the current user.
 */
export const useGlobalUsers = (
  currentUser: User
): {
  onlineUsers: OnlineUser[];
  currentUserId: string | null;
} => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io(env.SOCKET_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setCurrentUserId(newSocket.id || null);
      newSocket.emit("userJoined", {
        name: currentUser.name,
        color: currentUser.color,
      });
    });

    newSocket.on("onlineUsers", (users: OnlineUser[]) => {
      setOnlineUsers(users);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentUser.name, currentUser.color]);

  // Update user info when it changes
  useEffect(() => {
    if (socket?.connected) {
      socket.emit("userJoined", {
        name: currentUser.name,
        color: currentUser.color,
      });
    }
  }, [currentUser.name, currentUser.color, socket]);

  return { onlineUsers, currentUserId };
};
