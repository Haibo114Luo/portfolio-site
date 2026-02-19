"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { moduleUniverse, projects, tagUniverse, type Project } from "./projects";

const TEMPLATE_SECTIONS = [
  "Goal",
  "Pipeline",
  "Hard problems",
  "Outcomes",
  "Repro",
  "Evidence"
] as const;

function cx(...xs: Array<string | null | undefined | false>) {
  return xs.filter((x): x is string => typeof x === "string" && x.length > 0).join(" ");
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cx("rounded bg-white/10 motion-safe:animate-pulse", className)} />;
}

function PillButton({
  active,
  children,
  onClick
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full border px-3 py-1.5 text-sm transition",
        active
          ? "border-white/30 bg-white/10 text-white"
          : "border-white/10 bg-transparent text-white/70 hover:border-white/20 hover:bg-white/5 hover:text-white"
      )}
      type="button"
    >
      {children}
    </button>
  );
}

function SkeletonLines({ rows }: { rows: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className={cx("h-3", i === rows - 1 ? "w-3/4" : "w-full")} />
      ))}
    </div>
  );
}

function ProjectCard({
  p,
  index,
  onOpen,
  featured
}: {
  p: Project;
  index: number;
  onOpen: (id: string) => void;
  featured?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const title = p.title.trim().length > 0 ? p.title : "(TBD)";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.35, delay: index * 0.03 }}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(p.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          onOpen(p.id);
        }
      }}
      className={cx(
        "group cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30",
        featured ? "min-h-[430px]" : "min-h-[380px]"
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{p.id}</Badge>
            <Badge>{p.module}</Badge>
            <Badge>{p.category}</Badge>
            {p.status ? <Badge>{p.status}</Badge> : null}
          </div>

          <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">{title}</h2>
          <div className="mt-2 max-w-sm">
            <Skeleton className="h-3 w-full" />
          </div>
        </div>

        <div className="hidden shrink-0 sm:block">
          <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 group-hover:bg-white/10" />
        </div>
      </header>

      <section className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">Proof</h3>
        <Skeleton className="mt-2 h-3 w-full" />
      </section>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.slice(0, 6).map((t) => (
          <span
            key={t}
            className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/60 ring-1 ring-inset ring-white/10"
          >
            {t}
          </span>
        ))}
      </div>

      <div className={cx("mt-5", featured ? "grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]" : "") }>
        <div>
          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">What I did</h3>
              <div className="mt-3">
                <SkeletonLines rows={3} />
              </div>
            </section>

            <section className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">
                Evaluation (how I measure)
              </h3>
              <div className="mt-3">
                <SkeletonLines rows={3} />
              </div>
            </section>
          </div>

          <section className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">Evidence</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 opacity-70"
                >
                  <Skeleton className="h-3 w-20" />
                </button>
              ))}
            </div>
          </section>
        </div>

        {featured ? (
          <aside className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">Template sections</h3>
            <ul className="mt-3 space-y-2">
              {TEMPLATE_SECTIONS.map((name) => (
                <li key={name} className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
                  <p className="text-xs text-white/70">{name}</p>
                  <Skeleton className="mt-2 h-2.5 w-3/4" />
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </motion.article>
  );
}

function FeaturedPlaceholderCard({ index, onOpen }: { index: number; onOpen: (id: string) => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.35, delay: index * 0.03 }}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(`__featured_placeholder_${index}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          onOpen(`__featured_placeholder_${index}`);
        }
      }}
      className="group min-h-[430px] cursor-pointer rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-5 transition hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30"
    >
      <div className="flex flex-wrap gap-2">
        <Badge>Featured</Badge>
        <Badge>Placeholder</Badge>
      </div>
      <div className="mt-4 space-y-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-3 w-11/12" />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
        <div className="space-y-4">
          <section className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">Proof</h3>
            <Skeleton className="mt-2 h-3 w-full" />
          </section>

          <section className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">What I did</h3>
            <div className="mt-3">
              <SkeletonLines rows={3} />
            </div>
          </section>
        </div>

        <aside className="rounded-xl border border-white/10 bg-black/20 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">Template sections</h3>
          <ul className="mt-3 space-y-2">
            {TEMPLATE_SECTIONS.map((name) => (
              <li key={name} className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
                <p className="text-xs text-white/70">{name}</p>
                <Skeleton className="mt-2 h-2.5 w-3/4" />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </motion.article>
  );
}

function DrawerSection({ label, rows }: { label: string; rows: number }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">{label}</h3>
      <div className="mt-3">
        <SkeletonLines rows={rows} />
      </div>
    </section>
  );
}

function ProjectDrawer({
  open,
  project,
  onClose
}: {
  open: boolean;
  project: Project | null;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close drawer"
            onClick={onClose}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[1px]"
          />

          <motion.aside
            initial={reduceMotion ? false : { x: "100%" }}
            animate={reduceMotion ? undefined : { x: 0 }}
            exit={reduceMotion ? undefined : { x: "100%" }}
            transition={reduceMotion ? undefined : { duration: 0.28, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-50 w-full border-l border-white/10 bg-black sm:w-[560px] md:w-[620px]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/95 px-5 py-4">
              <Badge>{project?.id ?? "N/A"}</Badge>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="h-[calc(100%-65px)] space-y-4 overflow-y-auto p-5">
              <DrawerSection label="Goal" rows={3} />
              <DrawerSection label="Pipeline" rows={5} />
              <DrawerSection label="Hard problems" rows={4} />
              <DrawerSection label="Outcomes" rows={3} />
              <DrawerSection label="Repro" rows={4} />

              <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">Evidence</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      disabled
                      className="inline-flex cursor-not-allowed items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 opacity-70"
                    >
                      <Skeleton className="h-3 w-24" />
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default function Page() {
  const [activeModule, setActiveModule] = useState<string>("All");
  const [activeTag, setActiveTag] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const featuredProjects = useMemo(
    () =>
      projects
        .filter((p) => typeof p.featuredRank === "number")
        .sort((a, b) => (a.featuredRank ?? Number.MAX_SAFE_INTEGER) - (b.featuredRank ?? Number.MAX_SAFE_INTEGER))
        .slice(0, 2),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return projects.filter((p) => {
      const okModule = activeModule === "All" ? true : p.module === activeModule;
      const okTag = activeTag === "All" ? true : p.tags.includes(activeTag);
      const okQuery =
        q.length === 0
          ? true
          : [p.title, p.subtitle, ...p.tags]
              .join(" ")
              .toLowerCase()
              .includes(q);

      return okModule && okTag && okQuery;
    });
  }, [activeModule, activeTag, query]);

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedId) ?? null,
    [selectedId]
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.06),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.95))]" />
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-14">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-4 h-10 w-3/4" />
              <Skeleton className="mt-3 h-3 w-full" />
              <Skeleton className="mt-2 h-3 w-11/12" />
            </div>

            <div className="flex flex-wrap content-start gap-2 lg:justify-end">
              {Array.from({ length: 3 }).map((_, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2"
                >
                  <Skeleton className="h-3 w-16" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <article key={i} className="rounded-xl border border-white/10 bg-black/20 p-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="mt-3 h-3 w-11/12" />
                <div className="mt-4 flex gap-2">
                  <Skeleton className="h-6 w-14 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-white/70">Featured Projects</h2>
          <Skeleton className="h-3 w-24" />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {featuredProjects.length > 0
            ? featuredProjects.map((p, i) => (
                <ProjectCard key={p.id} p={p} index={i} featured onOpen={(id) => setSelectedId(id)} />
              ))
            : Array.from({ length: 2 }).map((_, i) => (
                <FeaturedPlaceholderCard key={i} index={i} onOpen={(id) => setSelectedId(id)} />
              ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/50">Module</span>
              <PillButton active={activeModule === "All"} onClick={() => setActiveModule("All")}>
                All
              </PillButton>
              {moduleUniverse.map((m) => (
                <PillButton key={m} active={activeModule === m} onClick={() => setActiveModule(m)}>
                  {m}
                </PillButton>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/50">Tag</span>
              <PillButton active={activeTag === "All"} onClick={() => setActiveTag("All")}>
                All
              </PillButton>
              {tagUniverse.map((t) => (
                <PillButton key={t} active={activeTag === t} onClick={() => setActiveTag(t)}>
                  {t}
                </PillButton>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="w-full sm:max-w-sm">
                <span className="mb-1 block text-xs text-white/50">Search</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder=""
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/30"
                  type="search"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  setActiveModule("All");
                  setActiveTag("All");
                  setQuery("");
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Reset filters
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 mt-5 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-white/70">All Projects</h2>
          <p className="text-sm text-white/60">
            Showing <span className="text-white">{filtered.length}</span> projects
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} p={p} index={i} onOpen={(id) => setSelectedId(id)} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-6">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="mt-2 h-3 w-64" />
          </div>
        )}
      </section>

      <ProjectDrawer open={selectedId !== null} project={selectedProject} onClose={() => setSelectedId(null)} />
    </main>
  );
}
