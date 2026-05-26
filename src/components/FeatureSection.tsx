import { ImagePlaceholder } from "@/components/ImagePlaceholder";

type FeatureSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  point: string;
  description: string;
  imageLabel: string;
  reverse?: boolean;
};

export function FeatureSection({
  id,
  eyebrow,
  title,
  point,
  description,
  imageLabel,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <section
      id={id}
      className={[
        "grid gap-8 rounded-[2.5rem] bg-white px-6 py-8 shadow-[0_18px_55px_rgba(56,39,20,0.08)] lg:grid-cols-2 lg:px-8 lg:py-10",
        reverse ? "lg:[&>*:first-child]:order-2" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ImagePlaceholder label={imageLabel} className="min-h-[320px] bg-[#d6ddd8]" />
      <div className="flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-500">{eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-stone-900">{title}</h2>
        <p className="mt-6 text-sm uppercase tracking-[0.24em] text-[#7e5d34]">{point}</p>
        <p className="mt-4 text-sm leading-8 text-stone-700">{description}</p>
        <a
          href="#"
          className="mt-6 inline-flex w-fit items-center rounded-full border border-stone-900/15 px-5 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
        >
          詳細はこちら
        </a>
      </div>
    </section>
  );
}
