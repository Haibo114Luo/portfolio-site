"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects, tagUniverse, moduleUniverse, type Project } from "./projects";

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

function ExternalLink({ href, label }: { href: string; label: string }) {
  const isExternal = /^https?:\/\//i.test(href);
  const cls =
    "inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-white transition";

  if (isExternal) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer">
        {label}
        <span className="text-white/40">↗</span>
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {label}
    </Link>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.35, delay: index * 0.03 }}
      className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:border-white/20"
    >
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{p.id}</Badge>
            <Badge>{p.module}</Badge>
            <Badge>{p.category}</Badge>
            {p.status ? <Badge>{p.status}</Badge> : null}
          </div>

          <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">
            {p.title}
          </h2>
          <p className="mt-1 text-sm text-white/70">{p.subtitle}</p>
        </div>

        <div className="hidden shrink-0 sm:block">
          <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 group-hover:bg-white/10" />
        </div>
      </header>

      <p className="mt-4 text-sm leading-6 text-white/75">{p.description}</p>

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

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-white/10 bg-black/20 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">
            Core skills
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-white/75">
            {p.coreSkills.slice(0, 4).map((s) => (
              <li key={s} className="flex gap-2">
                <span className="text-white/40">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-white/10 bg-black/20 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">
            Suggested metrics
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-white/75">
            {p.suggestedMetrics.slice(0, 3).map((m) => (
              <li key={m} className="flex gap-2">
                <span className="text-white/40">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">
          Evidence / links
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.evidence.map((l) => (
            <ExternalLink key={l.label} href={l.href} label={l.label} />
          ))}
        </div>
      </section>

      <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
        <div className="flex flex-wrap gap-2">
          {p.deliverables.slice(0, 3).map((d) => (
            <span
              key={d}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1"
            >
              {d}
            </span>
          ))}
        </div>
        <span className="text-white/35">Auto-deploy via GitHub → Vercel</span>
      </footer>
    </motion.article>
  );
}

export default function Page() {
  const [activeModule, setActiveModule] = useState<string>("All");
  const [activeTag, setActiveTag] = useState<string>("All");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const okModule = activeModule === "All" ? true : p.module === activeModule;
      const okTag = activeTag === "All" ? true : p.tags.includes(activeTag);
      return okModule && okTag;
    });
  }, [activeModule, activeTag]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.06),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.95))]" />
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                Portfolio
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                list_of_works
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                Evidence-first portfolio. Each project uses a consistent template:
                goal → pipeline → hard problems → measurable outcomes → reproducible evidence.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-white transition"
                href="https://github.com/Haibo114Luo/list_of_works"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <a
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-white transition"
                href="https://listofworks.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                Live Site ↗
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/50">Module:</span>
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
              <span className="text-xs text-white/50">Tag:</span>
              <PillButton active={activeTag === "All"} onClick={() => setActiveTag("All")}>
                All
              </PillButton>
              {tagUniverse.map((t) => (
                <PillButton key={t} active={activeTag === t} onClick={() => setActiveTag(t)}>
                  {t}
                </PillButton>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-white/60">
            Showing <span className="text-white">{filtered.length}</span> projects
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveModule("All");
              setActiveTag("All");
            }}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white transition"
          >
            Reset filters
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm text-white/70">
          <p className="text-white/80 font-medium">Fix checklist (if anything breaks)</p>
          <ol className="mt-2 space-y-1">
            <li>1) Ensure file exists: <code className="text-white/80">app/projects.ts</code></li>
            <li>2) Ensure import path is exactly: <code className="text-white/80">from &quot;./projects&quot;</code></li>
            <li>3) Restart dev server: stop then run <code className="text-white/80">npm run dev</code></li>
          </ol>
        </div>
      </section>
    </main>
  );
}
