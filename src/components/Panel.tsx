type Tone = "ivory" | "blush" | "powder";

type PanelProps = {
  title?: string;
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
};

const tones: Record<Tone, string> = {
  ivory: "bg-white/70",
  blush: "bg-blush/60",
  powder: "bg-powder/60",
};

function Panel({ title, tone = "ivory", children, className = "" }: PanelProps) {
  return (
    <section
      className={`rounded-2xl border border-gold/40 p-5 shadow-sm ${tones[tone]} ${className}`}
    >
      {title && (
        <h2 className="mb-3 border-b border-gold/30 pb-2 text-2xl font-semibold">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export default Panel;