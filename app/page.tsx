"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { moduleUniverse, projects, tagUniverse, type Project } from "./projects";

const MODULE_LABELS: Record<Project["module"], string> = {
  "Vibe Coding": "Vibe 编程",
  "AI Workflow": "AI 工作流"
};

const STATUS_LABELS: Record<NonNullable<Project["status"]>, string> = {
  Ready: "已就绪",
  WIP: "进行中"
};

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
  const title = p.title.trim().length > 0 ? p.title : "（待补充）";
  const subtitle = p.subtitle.trim();
  const description = p.description.trim();
  const featureHighlights = (p.proofPoints ?? [])
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .slice(0, 2);
  const proof = featureHighlights[0] ?? "";

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
      <header className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{p.id}</Badge>
          <Badge>{MODULE_LABELS[p.module]}</Badge>
          <Badge>{p.category}</Badge>
          {p.status ? <Badge>{STATUS_LABELS[p.status]}</Badge> : null}
        </div>

        <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">{title}</h2>
        {subtitle ? (
          <p className="mt-2 text-sm text-white/75">{subtitle}</p>
        ) : (
          <div className="mt-2 max-w-sm">
            <Skeleton className="h-3 w-full" />
          </div>
        )}
      </header>

      {featured ? (
        <>
          <section className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">项目简介</h3>
            {description ? (
              <p className="mt-2 text-sm leading-6 text-white/80">{description}</p>
            ) : (
              <div className="mt-2">
                <SkeletonLines rows={4} />
              </div>
            )}
          </section>

          <section className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">面试看点</h3>
            {featureHighlights.length > 0 ? (
              <ul className="mt-2 space-y-2 text-sm leading-6 text-white/80">
                {featureHighlights.map((item) => (
                  <li key={`${p.id}-${item}`}>{item}</li>
                ))}
              </ul>
            ) : (
              <div className="mt-2">
                <SkeletonLines rows={2} />
              </div>
            )}
          </section>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.slice(0, 8).map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/60 ring-1 ring-inset ring-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </>
      ) : (
        <>
          <section className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">证据要点</h3>
            {proof ? (
              <p className="mt-2 text-sm leading-6 text-white/80">{proof}</p>
            ) : (
              <Skeleton className="mt-2 h-3 w-full" />
            )}
          </section>

          {description ? (
            <p className="mt-4 text-sm leading-6 text-white/75">{description}</p>
          ) : (
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-10/12" />
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.slice(0, 8).map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/60 ring-1 ring-inset ring-white/10"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5">
            <div className="grid gap-4 md:grid-cols-2">
              <section className="rounded-xl border border-white/10 bg-black/20 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">我做了什么</h3>
                {p.coreSkills.length > 0 ? (
                  <ul className="mt-3 space-y-2 text-sm text-white/75">
                    {p.coreSkills.slice(0, 4).map((skill, idx) => (
                      <li key={`${p.id}-skill-${idx}`} className="leading-6">
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-3">
                    <SkeletonLines rows={3} />
                  </div>
                )}
              </section>

              <section className="rounded-xl border border-white/10 bg-black/20 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">
                  评估方式（如何衡量）
                </h3>
                {p.suggestedMetrics.length > 0 ? (
                  <ul className="mt-3 space-y-2 text-sm text-white/75">
                    {p.suggestedMetrics.slice(0, 4).map((metric, idx) => (
                      <li key={`${p.id}-metric-${idx}`} className="leading-6">
                        {metric}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-3">
                    <SkeletonLines rows={3} />
                  </div>
                )}
              </section>
            </div>

            <section className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">证据链接</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.evidence.length > 0
                  ? p.evidence.map((item, idx) => (
                      <a
                        key={`${p.id}-evidence-${idx}`}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:border-white/20 hover:bg-white/10"
                      >
                        {item.label}
                      </a>
                    ))
                  : Array.from({ length: 2 }).map((_, i) => (
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

            <section className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">交付物</h3>
              {p.deliverables.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.deliverables.map((item, idx) => (
                    <span
                      key={`${p.id}-deliverable-${idx}`}
                      className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 opacity-70"
                    >
                      <Skeleton className="h-3 w-20" />
                    </span>
                  ))}
                </div>
              )}
            </section>
          </div>
        </>
      )}
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
        <Badge>置顶</Badge>
        <Badge>占位</Badge>
      </div>
      <div className="mt-4 space-y-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-3 w-11/12" />
      </div>

      <section className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">项目简介</h3>
        <div className="mt-2">
          <SkeletonLines rows={4} />
        </div>
      </section>

      <section className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">面试看点</h3>
        <div className="mt-2">
          <SkeletonLines rows={2} />
        </div>
      </section>

      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>
    </motion.article>
  );
}

function DrawerSection({
  label,
  rows,
  text,
  items
}: {
  label: string;
  rows: number;
  text?: string;
  items?: string[];
}) {
  const hasText = Boolean(text && text.trim().length > 0);
  const hasItems = Boolean(items && items.length > 0);

  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">{label}</h3>
      {hasText ? (
        <p className="mt-3 text-sm leading-6 text-white/75">{text}</p>
      ) : hasItems ? (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-white/75">
          {items?.map((item, idx) => (
            <li key={`${label}-${idx}`}>{item}</li>
          ))}
        </ul>
      ) : (
        <div className="mt-3">
          <SkeletonLines rows={rows} />
        </div>
      )}
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

  const sectionData = project?.sections;
  const drawerEvidence = sectionData?.evidence ?? [];

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="关闭抽屉"
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
              <Badge>{project?.id ?? "未知"}</Badge>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
              >
                关闭
              </button>
            </div>

            <div className="h-[calc(100%-65px)] space-y-4 overflow-y-auto p-5">
              <DrawerSection label="目标" rows={3} text={sectionData?.goal} />
              <DrawerSection label="流程/架构" rows={5} items={sectionData?.pipeline} />
              <DrawerSection label="难点" rows={4} items={sectionData?.hardProblems} />
              <DrawerSection label="结果" rows={3} items={sectionData?.outcomes} />
              <DrawerSection label="复现" rows={4} items={sectionData?.repro} />

              <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">证据链接</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {drawerEvidence.length > 0
                    ? drawerEvidence.map((item, idx) => (
                        <a
                          key={`drawer-evidence-${idx}`}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:border-white/20 hover:bg-white/10"
                        >
                          {item.label}
                        </a>
                      ))
                    : Array.from({ length: 3 }).map((_, i) => (
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

  const selectedProject = useMemo(() => projects.find((p) => p.id === selectedId) ?? null, [selectedId]);

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
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">作品集</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Vibe Coding × AI Diffusion
              </h1>
            </div>

            <div className="flex flex-wrap content-start gap-2 lg:justify-end">
              <a
                href="https://github.com/Haibo114Luo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                GitHub 主页 ↗
              </a>
              <a
                href="#projects"
                className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                项目列表 ↓
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-sm font-semibold text-white">个人能力</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">
                能在需求不完全明确时快速完成原型搭建、联调与排障，把想法稳定落地为可运行系统。
              </p>
            </article>

            <article className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-sm font-semibold text-white">作品集简介</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">
                作品集采用证据优先结构，强调目标、流程、难点、结果与复现路径，便于在面试中快速评估工程能力。
              </p>
            </article>

            <article className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-sm font-semibold text-white">希望从事岗位</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">
                AI 应用工程、AI 工作流工程，或 AI + 全栈产品工程相关岗位，侧重从原型到可交付系统的全流程实现。
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-white/70">置顶项目</h2>
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

      <section id="projects" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/50">模块</span>
              <PillButton active={activeModule === "All"} onClick={() => setActiveModule("All")}>
                全部
              </PillButton>
              {moduleUniverse.map((m) => (
                <PillButton key={m} active={activeModule === m} onClick={() => setActiveModule(m)}>
                  {MODULE_LABELS[m]}
                </PillButton>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/50">标签</span>
              <PillButton active={activeTag === "All"} onClick={() => setActiveTag("All")}>
                全部
              </PillButton>
              {tagUniverse.map((t) => (
                <PillButton key={t} active={activeTag === t} onClick={() => setActiveTag(t)}>
                  {t}
                </PillButton>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="w-full sm:max-w-sm">
                <span className="mb-1 block text-xs text-white/50">搜索</span>
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
                重置筛选
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 mt-5 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-white/70">全部项目</h2>
          <p className="text-sm text-white/60">
            当前显示 <span className="text-white">{filtered.length}</span> 个项目
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
