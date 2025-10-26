import { useState } from "react";
import { useCollaboration } from "@/hooks/use-collaboration";
import { useOnlineUsers } from "@/hooks/use-online-users";
import type { User } from "@/types/user";

type SidebarUserProps = {
  user: User;
};

export const SidebarUser = ({ user }: SidebarUserProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Get the provider and access online users
  const { provider } = useCollaboration(user);
  const { onlineUsers, currentUser } = useOnlineUsers(provider);

  return (
    <div
      className={`relative flex h-full flex-col ${isCollapsed ? "w-0" : "w-64 border border-l-0"}`}
    >
      {/* Collapse toggle */}
      <button
        className="-translate-y-1/2 -left-4 absolute top-1/2 flex size-8 items-center justify-center rounded-full border bg-background hover:bg-background-hover"
        onClick={() => setIsCollapsed(!isCollapsed)}
        type="button"
      >
        <span className="bg-transparent">{isCollapsed ? "←" : "→"}</span>
      </button>

      {/* All users section */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2">
            <h3 className="mb-2 h-6 font-semibold text-sm">
              Online Users ({onlineUsers.length})
            </h3>

            {onlineUsers.length === 0 ? (
              <p>No users online</p>
            ) : (
              <div className="flex flex-col gap-2">
                {onlineUsers.map((onlineUser) => (
                  <div
                    className="flex items-center gap-2 rounded"
                    key={onlineUser.id}
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ background: onlineUser.color }}
                    />
                    <span className="truncate">
                      {onlineUser.name}
                      {onlineUser.id === currentUser?.id && " (You)"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
