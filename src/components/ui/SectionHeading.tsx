type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col ${alignment}`}>
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}