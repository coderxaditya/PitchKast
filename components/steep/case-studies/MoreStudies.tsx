"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * "View all case studies": reveals the second bento in place.
 *
 * There is no case study index page to go to, so the reference's link to one
 * becomes a toggle for the three studies that do not fit the first bento.
 */
export function MoreStudies() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    const next = !open;
    const more = document.getElementById("more-studies");
    if (more) more.hidden = !next;
    setOpen(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={open}
      aria-controls="more-studies"
      className="flex shrink-0 items-center gap-[7px] rounded-full border border-hairline px-7 py-3.5 text-[16px] font-semibold text-ink transition-colors duration-150 hover:border-ink"
    >
      {open ? "Show fewer case studies" : "View all case studies"}
      <ArrowUpRight
        className={`size-4 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
}
