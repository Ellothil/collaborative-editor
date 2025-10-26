import type { JSX } from "react";

type ToolbarButtonProps = {
  name: string;
  display: React.ReactNode;
  onClick: () => void;
  title: string;
  isActive: boolean | undefined;
};

/**
 * A button component for the toolbar.
 *
 * @param {ToolbarButtonProps} props - The props for the toolbar button component.
 * @param {string} props.name - The name for the aria-label of the button.
 * @param {React.ReactNode} props.display - The display shown on the button.
 * @param {string} props.title - The html title of the button.
 * @param {() => void} props.onClick - The click event handler of the button.
 * @param {boolean | undefined} props.isActive - The active state of the button.
 * @returns {JSX.Element} A JSX element representing the toolbar button component.
 */
export const ToolbarButton = ({
  name,
  display,
  title,
  onClick,
  isActive,
}: ToolbarButtonProps): JSX.Element => (
  <button
    aria-label={name}
    className={`flex size-10 items-center justify-center rounded border transition-colors hover:bg-background-hover ${
      isActive ? "border-blue-500 bg-blue-500" : ""
    }`}
    onClick={() => onClick()}
    title={title}
    type="button"
  >
    {display}
  </button>
);
