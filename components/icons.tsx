export function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function Play({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}

/**
 * Hand-drawn check. Unlike the others this path describes the *outline* of the
 * stroke rather than being stroked itself, so it fills with currentColor —
 * which keeps it the same white as its siblings and lets the card's glass show
 * through around it exactly as before.
 */
export function CheckIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 50 50"
      fill="currentColor"
      className="text-white"
      aria-hidden="true"
    >
      <path d="M15.004,41.016C13.366,41.017,4.642,30.748,2.331,27.587c-1.376-1.881-1.405-2.278-1.294-2.595	c0.419-1.231,1.851-2.35,3.114-3.336c0.396-0.309,0.772-0.603,1.089-0.879c0.098-0.084,0.27-0.152,0.438-0.149	c0.697,0.032,2.053,1.419,6.05,5.859c1.704,1.892,3.8,4.22,4.446,4.665c0.988-0.555,5.77-4.211,10.4-7.752	C42.991,10.844,44.696,9.864,45.385,10.275c0.056,0.033,0.104,0.077,0.143,0.128c1.664,2.218,2.567,4.011,3.283,5.516l-0.001,0	c0.052,0.107,0.067,0.231,0.037,0.349c-0.34,1.335-32.272,24.694-33.83,24.747C15.013,41.016,15.009,41.016,15.004,41.016z M2.013,25.236c0.518,1.774,11.625,14.4,13.027,14.784c1.778-0.44,29.995-21.51,32.725-23.97c-0.668-1.389-1.465-2.911-2.855-4.802	c-1.799,0.763-11.332,8.055-17.728,12.945c-8.995,6.879-10.539,8-11.012,8c-0.553,0-1.328-0.753-5.186-5.038	c-1.794-1.993-4.45-4.942-5.271-5.467c-0.291,0.244-0.612,0.495-0.946,0.756C3.646,23.321,2.379,24.31,2.013,25.236z M1.981,25.322	c0,0,0,0.001-0.001,0.001C1.981,25.323,1.981,25.323,1.981,25.322z M1.51,25.156h0.01H1.51z M5.908,21.521	c-0.006,0.005-0.012,0.011-0.018,0.016C5.896,21.532,5.902,21.526,5.908,21.521z" />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.7 3.8 5.8 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.8-3.8-9S9.5 5.7 12 3Z" />
    </svg>
  );
}
