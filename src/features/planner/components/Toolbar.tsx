type ToolbarProps = {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
};

function ToolbarButton({
  children,
  onClick,
  disabled = false,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="min-h-11 rounded-full border border-gold/50 bg-white px-5 font-medium transition hover:bg-blush/50 disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function Toolbar({ canUndo, canRedo, onUndo, onRedo, onReset }: ToolbarProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <ToolbarButton onClick={onUndo} disabled={!canUndo} label="Undo">
        ↶ Undo
      </ToolbarButton>
      <ToolbarButton onClick={onRedo} disabled={!canRedo} label="Redo">
        ↷ Redo
      </ToolbarButton>
      <ToolbarButton onClick={onReset} label="Clear all seating">
        Clear
      </ToolbarButton>
    </div>
  );
}

export default Toolbar;