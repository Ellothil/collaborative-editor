import type { HocuspocusProvider } from "@hocuspocus/provider";
import { useEffect, useState } from "react";
import type { User } from "@/types/user";

type OnlineUser = User & {
  id: string;
};

/**
 * Hook to fetch all currently online users from the awareness field of the Hocuspocus provider.
 *
 * @param {HocuspocusProvider} provider - The Hocuspocus provider instance.
 * @returns {Object} An object containing the online users and the current user.
 */
export const useOnlineUsers = (
  provider: HocuspocusProvider
): {
  onlineUsers: OnlineUser[];
  currentUser: OnlineUser | null;
} => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [currentUser, setCurrentUser] = useState<OnlineUser | null>(null);

  useEffect(() => {
    if (!provider) {
      return;
    }

    // Update users when awareness changes
    const updateUsers = () => {
      const awareness = provider.awareness;
      if (!awareness) {
        return;
      }

      const states = Array.from(awareness.getStates().entries());
      const users: OnlineUser[] = states.map(([clientId, state]) => {
        const typedState = state as { user?: User };
        return {
          id: clientId.toString(),
          name: typedState.user?.name || `User ${clientId}`,
          color: typedState.user?.color || "#888888",
        };
      });

      setOnlineUsers(users);

      // Find current user
      const ourClientId = awareness.clientID;
      const ourUser =
        users.find((user) => user.id === ourClientId.toString()) || null;
      setCurrentUser(ourUser);
    };

    updateUsers();

    // Listen for awareness changes
    provider.awareness?.on("change", updateUsers);

    // Cleanup
    return () => {
      provider.awareness?.off("change", updateUsers);
    };
  }, [provider]);

  return { onlineUsers, currentUser };
};
