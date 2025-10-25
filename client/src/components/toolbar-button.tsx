import type { JSX } from "react";

type ToolbarButtonProps = {
  name: string;
  display: React.ReactNode;
  onClick: () => void;
  title: string;
};

/**
 * A button component for the toolbar.
 *
 * @param {string} name - The name for the aria-label of the button.
 * @param {React.ReactNode} display - The display shown on the button.
 * @param {string} title - The html title of the button.
 * @param {() => void} onClick - The click event handler of the button.
 * @returns {JSX.Element} A JSX element representing the toolbar button component.
 */
export const ToolbarButton = ({
  name,
  display,
  title,
  onClick,
}: ToolbarButtonProps): JSX.Element => (
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
