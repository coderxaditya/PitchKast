/**
 * The client portal, rebuilt.
 *
 * These surfaces are renderings of the real PitchKast portal — its counters,
 * a client's post table, the month calendar, the post editor and the activity
 * feed — put back together as markup rather than pasted in as screenshots.
 *
 * That is the whole point. A screenshot of a 1100px table scaled into a 633px
 * column is soft, carries JPEG artefacts, cannot restyle with the page and
 * cannot be read by anything that is not a pair of eyes. Rebuilt, the same
 * surface is sharp at any width, weighs a few hundred bytes, and its text is
 * text. It is also what Steep does: the fragments floating around their
 * headline are live components, which is exactly why they read as product
 * rather than as pictures of product.
 *
 * Nothing here is styled by eye. Colours, radii, the two faces and the
 * soft-UI shadow pair were read off the running portal's computed styles and
 * are recorded in `globals.css`. The content is one client's — the Test
 * account — taken from the portal as it stands.
 *
 * There is no portal navigation and no window chrome in any of it. The
 * fragments are the product; framing them in invented chrome is what made an
 * earlier version read as a picture of an app.
 */

/* ── Data ──────────────────────────────────────────────────────
   One table, because everything below is derived from it: the
   counters, the queue, the calendar. A count that is computed
   cannot disagree with the rows it counts. */

type Platform = "linkedin" | "x" | "instagram";
type Status = "review" | "approved" | "scheduled" | "published" | "changes";

type Post = {
  title: string;
  on: Platform;
  status: Status;
  /** Expected publish date. Month is zero-based, as `Date` has it. */
  due: [year: number, month: number, day: number];
};

const POSTS: Post[] = [
  { title: "How High-Growth Companies Build Their Sales Pipeline", on: "x", status: "review", due: [2026, 8, 24] },
  { title: "The Growth Bottleneck Most Founders Overlook", on: "x", status: "review", due: [2026, 10, 1] },
  { title: "How to Build a Predictable B2B Growth Pipeline", on: "linkedin", status: "approved", due: [2026, 10, 1] },
  { title: "From Leads to Revenue: Building a Pipeline That Converts", on: "instagram", status: "published", due: [2026, 10, 2] },
  { title: "Why Your Pipeline Isn't Growing (And What to Fix)", on: "linkedin", status: "published", due: [2026, 10, 3] },
  { title: "Your Next Stage of Growth Starts With Your Pipeline", on: "x", status: "approved", due: [2026, 10, 6] },
  { title: "The Founder's Guide to Predictable Lead Flow", on: "linkedin", status: "scheduled", due: [2026, 10, 6] },
  { title: "How to Turn Attention Into a Sales Pipeline", on: "linkedin", status: "published", due: [2026, 10, 10] },
  { title: "The Founder's Playbook for Consistent Lead Generation", on: "instagram", status: "changes", due: [2026, 10, 12] },
  { title: "Why More Leads Won't Fix a Broken Sales Process", on: "linkedin", status: "published", due: [2026, 10, 15] },
  { title: "The Simple System Behind Predictable Growth", on: "x", status: "review", due: [2026, 10, 17] },
  { title: "What's Actually Holding Your Business Back From Growth", on: "instagram", status: "scheduled", due: [2026, 10, 20] },
  { title: "Turning Outbound Into a Predictable Growth Engine", on: "linkedin", status: "review", due: [2026, 10, 23] },
  { title: "The Difference Between Leads and Real Pipeline", on: "x", status: "published", due: [2026, 10, 28] },
];

/* ── Vocabulary ────────────────────────────────────────────────
   The portal's own status and platform styling. The status tints
   are Tailwind's palette at the exact steps the portal uses —
   the 400 at a quarter opacity behind the 800, with the 500 as
   the dot — so these are the real colours rather than matches
   for them. */

const STATUS: Record<Status, { label: string; tint: string; dot: string }> = {
  review: { label: "Awaiting review", tint: "bg-amber-300/35 text-amber-800", dot: "bg-amber-500" },
  approved: { label: "Approved", tint: "bg-blue-400/25 text-blue-800", dot: "bg-blue-500" },
  scheduled: { label: "Scheduled", tint: "bg-violet-400/25 text-violet-800", dot: "bg-violet-500" },
  published: { label: "Published", tint: "bg-emerald-400/25 text-emerald-800", dot: "bg-emerald-500" },
  changes: { label: "Changes requested", tint: "bg-red-400/25 text-red-800", dot: "bg-red-500" },
};

/* Each network's own mark colour, as the portal sets it. */
const PLATFORM: Record<Platform, { mark: string; name: string; ink: string }> = {
  linkedin: { mark: "in", name: "LinkedIn", ink: "text-[#0a66c2]" },
  x: { mark: "𝕏", name: "X / Twitter", ink: "text-[#1d2126]" },
  instagram: { mark: "ig", name: "Instagram", ink: "text-[#c13584]" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const shortDate = ([y, m, d]: Post["due"]) => `${d} ${MONTHS[m]} ${y}`;

/* ── Shared pieces ─────────────────────────────────────────── */

/** The whole portal lives inside this: its ground, its type, its radius. */
function Panel({
  label,
  className = "",
  children,
}: {
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`portal-raise h-full rounded-[16px] bg-[var(--portal-ground)] p-3 font-portal text-[var(--portal-ink)] ${className}`}
    >
      {label ? (
        <p className="px-0.5 pb-2 font-portal-display text-[9px] font-bold tracking-[0.13em] text-[var(--portal-muted)] uppercase">
          {label}
        </p>
      ) : null}
      {children}
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const s = STATUS[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-[2px] text-[9px] leading-[1.4] font-semibold ${s.tint}`}
    >
      <span aria-hidden="true" className={`size-[4px] rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function PlatformTag({ on, withName = true }: { on: Platform; withName?: boolean }) {
  const p = PLATFORM[on];
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 text-[9px] font-semibold ${p.ink}`}>
      <span aria-hidden="true">{p.mark}</span>
      {withName ? p.name : null}
    </span>
  );
}

/* ── Counters ──────────────────────────────────────────────────
   The four figures the portal opens on. Three are counted from
   the table above; the fourth is the earliest date in it. */

const count = (s: Status) => POSTS.filter((p) => p.status === s).length;

const COUNTS: { value: string; label: string; accent?: boolean }[] = [
  { value: String(POSTS.length), label: "Posts" },
  { value: String(count("published")), label: "Published" },
  /* The one figure the portal colours: what the client owes a decision on. */
  { value: String(count("review")), label: "Awaiting review", accent: true },
  { value: shortDate(POSTS[0].due).replace(" 2026", ""), label: "Next post" },
];

export function PortalCounters() {
  return (
    <Panel className="grid grid-cols-4 gap-2.5">
      {COUNTS.map((c) => (
        <div
          key={c.label}
          className="portal-raise-sm rounded-[14px] bg-[var(--portal-ground)] px-3 py-2.5"
        >
          <p
            className={`font-portal-display text-[20px] leading-none font-extrabold tracking-[-0.02em] ${
              c.accent ? "text-orange-700" : "text-[var(--portal-ink)]"
            }`}
          >
            {c.value}
          </p>
          <p className="mt-1.5 text-[10px] leading-none text-[var(--portal-muted)]">
            {c.label}
          </p>
        </div>
      ))}
    </Panel>
  );
}

/* ── The client's posts ────────────────────────────────────────
   The table a client's page opens on. Five of the fourteen rows —
   the panel is as tall as the column beside it allows, and a
   table that runs off the bottom of its own card reads as a
   scroll rather than as a crop. */

export function PortalPosts() {
  return (
    <Panel label="Test · 14 posts">
      <div className="portal-raise-sm overflow-hidden rounded-[14px] bg-[var(--portal-ground)]">
        <div className="grid grid-cols-[1fr_88px_112px_72px] gap-2 px-3 py-2 text-[8.5px] font-medium tracking-[0.1em] text-[var(--portal-muted)] uppercase">
          <span>Post</span>
          <span>Platform</span>
          <span>Status</span>
          <span>Expected</span>
        </div>

        {POSTS.slice(0, 5).map((post) => (
          <div
            key={post.title}
            className="portal-row grid grid-cols-[1fr_88px_112px_72px] items-center gap-2 px-3 py-[7px]"
          >
            <span className="truncate text-[11px] font-semibold">{post.title}</span>
            <PlatformTag on={post.on} />
            <StatusPill status={post.status} />
            <span className="text-[9px] text-[var(--portal-muted)]">
              {shortDate(post.due)}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ── The post editor ───────────────────────────────────────────
   The right-hand column of a single post: its state, the date it
   is due, and the save button. It is the only fragment with form
   controls, and they are inert — spans styled as fields, not
   inputs, because a real input in a page decoration is something
   a visitor can type into and lose what they typed.

   The purple is the portal's brand, and it is the one place on
   this page a colour outside the system's palette appears. It
   earns that by being the product's own. */

function Field({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span
      className={`portal-sink block rounded-[12px] px-3 py-[7px] text-[10px] ${
        muted ? "text-[var(--portal-label)]" : "text-[var(--portal-ink)]"
      }`}
    >
      {children}
    </span>
  );
}

export function PortalEditor() {
  return (
    <Panel label="The Growth Bottleneck…">
      <div className="space-y-2">
        <div>
          <p className="pb-1 text-[9.5px] font-medium">Status</p>
          <Field>Awaiting review</Field>
        </div>

        <div>
          <p className="pb-1 text-[9.5px] font-medium">Expected publish date</p>
          <Field>01/11/2026</Field>
        </div>

        <div>
          <p className="pb-1 text-[9.5px] font-medium">Actual publish date</p>
          <Field muted>dd/mm/yyyy</Field>
        </div>

        <p className="pt-0.5 text-[8.5px] text-[var(--portal-label)]">
          Set automatically when you mark the post published.
        </p>

        <span className="portal-raise-sm block rounded-[12px] bg-[var(--portal-brand)] py-[8px] text-center text-[10px] font-semibold text-white">
          Saved
        </span>
      </div>
    </Panel>
  );
}

/* ── The month ─────────────────────────────────────────────────
   November 2026, built from the table rather than laid out by
   hand: the leading days come from what weekday the first falls
   on, and a post lands in a cell because its date says so. A
   changed date cannot end up in the wrong square. */

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const YEAR = 2026;
const MONTH = 10; /* November */

export function PortalCalendar() {
  /* getDay() is Sunday-first; this grid is Monday-first. */
  const firstWeekday = (new Date(YEAR, MONTH, 1).getDay() + 6) % 7;
  const daysBefore = new Date(YEAR, MONTH, 0).getDate();

  const cells = [
    ...Array.from({ length: firstWeekday }, (_, i) => ({
      day: daysBefore - firstWeekday + 1 + i,
      inMonth: false,
    })),
    /* Four weeks of November. The month runs to 30; the rest is trimmed so
       the panel sits level with the one beside it. */
    ...Array.from({ length: 28 - firstWeekday }, (_, i) => ({
      day: i + 1,
      inMonth: true,
    })),
  ];

  const byDay = new Map<number, Post[]>();
  for (const post of POSTS) {
    if (post.due[1] !== MONTH) continue;
    const day = post.due[2];
    byDay.set(day, [...(byDay.get(day) ?? []), post]);
  }

  return (
    /* `flex flex-col` and the `flex-1` below let the month stretch when the
       column beside it is taller — without them the grid keeps its natural
       height and leaves a pane of empty ground under it, which is what the
       panel looked like at tablet widths. */
    <Panel label="November 2026" className="flex flex-col">
      <div className="portal-raise-sm flex-1 overflow-hidden rounded-[14px] bg-[var(--portal-ground)]">
        <div
          className="grid h-full grid-cols-7"
          /* One auto row for the weekday header, then four equal weeks. */
          style={{ gridTemplateRows: "auto repeat(4, minmax(42px, 1fr))" }}
        >
          {DOW.map((d) => (
            <div
              key={d}
              className="px-2 pt-2 pb-1 text-[8px] font-medium tracking-[0.1em] text-[var(--portal-muted)] uppercase"
            >
              {d}
            </div>
          ))}

          {cells.map((cell, i) => (
            <div
              key={i}
              className="border-t border-l border-[var(--portal-line)] px-1.5 pt-1 pb-1.5 [&:nth-child(7n+1)]:border-l-0"
            >
              <span
                className={`block text-[8px] leading-none font-medium ${
                  cell.inMonth ? "text-[var(--portal-label)]" : "text-[#b0b5c0]"
                }`}
              >
                {cell.day}
              </span>

              <div className="mt-1 space-y-[2px]">
                {(cell.inMonth ? (byDay.get(cell.day) ?? []) : []).map((post) => (
                  <div
                    key={post.title}
                    className={`flex items-center gap-[3px] rounded-[4px] px-1 py-[1.5px] ${STATUS[post.status].tint}`}
                  >
                    <span aria-hidden="true" className="text-[6.5px] leading-none font-bold opacity-70">
                      {PLATFORM[post.on].mark}
                    </span>
                    <span className="truncate text-[7px] leading-[1.35] font-semibold">
                      {post.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ── Activity ──────────────────────────────────────────────────
   What moved, and when. Names are the account's own — the person
   who made the change — and the linked titles carry the portal's
   brand purple. */

const ACTIVITY: { move: string; post: string; when: string }[] = [
  { move: "moved a post from approved to published", post: "How to Turn Attention Into a Sales Pipeline", when: "38 minutes ago" },
  { move: "moved a post from awaiting review to approved", post: "How to Turn Attention Into a Sales Pipeline", when: "38 minutes ago" },
  { move: "moved a post from approved to published", post: "Why More Leads Won't Fix a Broken Sales Process", when: "38 minutes ago" },
  { move: "moved a post from approved to scheduled", post: "What's Actually Holding Your Business Back From Growth", when: "about 1 hour ago" },
  { move: "moved a post from awaiting review to approved", post: "How to Build a Predictable B2B Growth Pipeline", when: "about 1 hour ago" },
];

export function PortalActivity() {
  return (
    <Panel label="Recent activity">
      <div className="portal-raise-sm overflow-hidden rounded-[14px] bg-[var(--portal-ground)]">
        {ACTIVITY.map((entry, i) => (
          <div key={i} className="portal-row px-2.5 py-[7px]">
            <p className="text-[9px] leading-[1.5] text-[var(--portal-muted)]">
              <span className="font-semibold text-[var(--portal-ink)]">Aditya</span>{" "}
              {entry.move} —{" "}
              <span className="font-medium text-[var(--portal-brand)]">{entry.post}</span>
            </p>
            <p className="mt-0.5 text-[8px] text-[var(--portal-label)]">
              Test · {entry.when}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
