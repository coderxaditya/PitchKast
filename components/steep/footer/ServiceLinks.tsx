"use client";

import { SERVICES } from "@/components/steep/services/offerings";
import { pickService } from "@/components/steep/services/pick";

/**
 * The footer's Services column items: each scrolls to the services section
 * and opens that service's tab, as the navbar dropdown does.
 */
export function ServiceLinks({ className }: { className: string }) {
  return (
    <>
      {SERVICES.map((service, i) => (
        <li key={service.name}>
          <a href="#services" onClick={() => pickService(i)} className={className}>
            {service.menuName}
          </a>
        </li>
      ))}
    </>
  );
}
