import type { HocuspocusProvider } from "@hocuspocus/provider";

type SidebarFilesProps = {
  isCollapsed: boolean;
  provider: HocuspocusProvider;
};

export const SidebarFiles = ({ isCollapsed, provider }: SidebarFilesProps) => {
  return (
    <div
      className={`flex h-full flex-col transition-all duration-300 ease-in-out ${isCollapsed ? "w-0 opacity-0" : "w-64 overflow-hidden rounded-l-xl border bg-clip-padding opacity-100"}`}
    >
      <div
        className={`flex-1 overflow-y-auto transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}
      >
        <div className="px-4 py-2">
          <h3 className="mb-2 h-6 font-semibold text-sm">Files</h3>

          {/* {onlineUsers.length === 0 ? (
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
                    {onlineUser.id === currentUser?.id && " (You)"}
                  </span>
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
