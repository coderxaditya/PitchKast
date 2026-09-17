"use client";

import { useEffect, useState } from "react";

/** "20:24 GMT+5:30 AT YOUR LOCATION", as monad.com's footer reads. Rendered
    only after mount, since the server cannot know the reader's clock. */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
      const off = -d.getTimezoneOffset();
      const sign = off >= 0 ? "+" : "-";
      const h = Math.floor(Math.abs(off) / 60);
      const m = Math.abs(off) % 60;
      setNow(`${time} GMT${sign}${h}${m ? `:${String(m).padStart(2, "0")}` : ""} at your location`);
    };
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, []);

  return <p className="min-h-[1.35em] text-body-sm tracking-[0.03em] text-smoke uppercase">{now}</p>;
}
