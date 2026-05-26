type ImagePlaceholderProps = {
  label: string;
  className?: string;
};

export function ImagePlaceholder({
  label,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={[
        "grid place-items-center overflow-hidden rounded-[2rem] border border-white/10",
        "bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-stone-200">
        {label} / ここに画像
      </div>
    </div>
  );
}
