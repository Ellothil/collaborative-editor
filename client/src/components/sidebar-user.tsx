import { useGlobalUsers } from "@/hooks/use-global-users";
import type { User } from "@/types/user";

type SidebarUserProps = {
  isCollapsed: boolean;
  user: User;
};

export const SidebarUser = ({ isCollapsed, user }: SidebarUserProps) => {
  // Get all online users from the global tracking system
  const { onlineUsers, currentUserId } = useGlobalUsers(user);

  return (
    <div
      className={`flex h-full flex-col bg-background transition-all duration-300 ease-in-out ${isCollapsed ? "w-0 opacity-0" : "w-64 overflow-hidden rounded-r-xl border bg-clip-padding opacity-100"}`}
    >
      <div
        className={`flex-1 overflow-y-auto transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}
      >
        <div className="px-4 py-2">
          <h3 className="mb-2 flex h-6 justify-center border-line bg-linear-to-r from-start to-end bg-clip-text font-semibold text-transparent text-xl">
            Users ({onlineUsers.length})
          </h3>

          {onlineUsers.length === 0 ? (
            <p>No users online</p>
          ) : (
            <div className="flex flex-col gap-2">
              {onlineUsers.map((onlineUser) => (
                <div
                  className="flex items-center gap-2 rounded transition-opacity duration-200"
                  key={onlineUser.id}
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ background: onlineUser.color }}
                  />
                  <span className="truncate">
                    {onlineUser.name}
                    {onlineUser.id === currentUserId && " (You)"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
