type ToolbarButtonProps = {
  name: string;
  display: React.ReactNode;
  onClick: () => void;
  title: string;
};

export const ToolbarButton = ({
  name,
  display,
  title,
  onClick,
}: ToolbarButtonProps) => (
  <button
    aria-label={name}
    className="flex size-10 items-center justify-center rounded border hover:bg-primary/50"
    onClick={onClick}
    title={title}
    type="button"
  >
    {display}
  </button>
);
