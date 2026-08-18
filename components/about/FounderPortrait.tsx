/**
 * Slot for the founder photograph.
 *
 * Renders a placeholder until a real image exists. To swap it in, drop the file
 * in `public/assets/` and pass the path — nothing else about the layout needs
 * to change, because the frame owns its own dimensions:
 *
 *   <FounderPortrait src="/assets/founder.jpg" alt="…, Founder of PitchKast" />
 *
 * Deliberately unnamed while it is a placeholder: a byline with an invented
 * name would read as real once this ships.
 */
export function FounderPortrait({
  src,
  alt = "",
  className = "",
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={`liquid-glass glass-on-black relative overflow-hidden rounded-[0.9rem] ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          className="grid h-full w-full place-items-center"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            className="h-7 w-7 text-white/25"
          >
            <circle cx="12" cy="8.5" r="3.75" />
            <path d="M4.75 20.25a7.25 7.25 0 0 1 14.5 0" />
          </svg>
        </div>
      )}
    </div>
  );
}
