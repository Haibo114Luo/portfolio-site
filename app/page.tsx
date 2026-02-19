"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { moduleUniverse, projects, tagUniverse, type Project } from "./projects";

const MODULE_LABELS: Record<Project["module"], string> = {
  "Vibe Coding": "Vibe 编程",
  "AI Workflow": "AI 工作流"
};

const STATUS_LABELS: Record<NonNullable<Project["status"]>, string> = {
  Ready: "已就绪",
  WIP: "进行中"
};

const EXTERNAL_LINK_CLASS =
  "inline-flex items-center rounded-sm text-blue-300 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-200 hover:decoration-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70";

const FEATURED_SHOWCASE = [
  {
    title: "研报整理流水线：PDF→Markdown→结构化结论库",
    image1: "/featured/report-1.png",
    text1: "文字解释占位符1",
    image2: "/featured/report-2.png",
    text2: "文字解释占位符2"
  },
  {
    title: "德州扑克记牌器：局域网筹码与底池管理",
    image1: "/featured/chips-1.png",
    text1: "文字解释占位符1",
    image2: "/featured/chips-2.png",
    text2: "文字解释占位符2"
  }
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

function FeaturedShowcaseCard({
  title,
  image1,
  text1,
  image2,
  text2
}: {
  title: string;
  image1: string;
  text1: string;
  image2: string;
  text2: string;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>

      <section className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/70">图片占位符1</p>
        <img
          src={image1}
          alt={`${title} 图片 1`}
          className="mt-2 h-48 w-full rounded-lg border border-white/10 object-cover"
          loading="lazy"
        />
      </section>

      <section className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/70">文字解释占位符1</p>
        <p className="mt-2 text-sm leading-6 text-white/75">{text1}</p>
      </section>

      <section className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/70">图片占位符2</p>
        <img
          src={image2}
          alt={`${title} 图片 2`}
          className="mt-2 h-48 w-full rounded-lg border border-white/10 object-cover"
          loading="lazy"
        />
      </section>

      <section className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/70">文字解释占位符2</p>
        <p className="mt-2 text-sm leading-6 text-white/75">{text2}</p>
      </section>
    </article>
  );
}

function ProjectCard({
  p,
  index,
  featured
}: {
  p: Project;
  index: number;
  featured?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const title = p.title.trim().length > 0 ? p.title : "（待补充）";
  const subtitle = p.subtitle.trim();
  const description = p.description.trim();
  const proof = (p.proofPoints ?? []).map((item) => item.trim()).find((item) => item.length > 0) ?? "";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.35, delay: index * 0.03 }}
      className={cx(
        "group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition hover:border-white/20",
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
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">效果评估</h3>
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
                    className={cx(EXTERNAL_LINK_CLASS, "text-xs")}
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
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">作品集</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Vibe Coding × AI Diffusion</h1>
            </div>

            <div className="flex flex-wrap content-start gap-2 lg:justify-end">
              <a
                href="https://github.com/Haibo114Luo"
                target="_blank"
                rel="noreferrer"
                className={cx(EXTERNAL_LINK_CLASS, "text-sm")}
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
                能在需求不完全明确且快速变化的情况下，用“先跑通再收敛”的方式把原型做成可交付系统：前后端联调、接口契约、端口/网络可达性、环境依赖与 GPU 相关问题都能定位解决。对 AI 能力的使用不是停留在调用模型，而是把不稳定的生成过程变成稳定的工作流产物（Schema 约束、分段续写、质检与回放），让效率可以复用到更多场景。
              </p>
            </article>

            <article className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-sm font-semibold text-white">作品集简介</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">
                作品集坚持证据与可复现优先：每个项目都给出目标、关键设计取舍、踩坑与排障路径、以及可以一键复跑的入口（脚本、notebook、配置与固定依赖）。我不仅展示功能完成，更展示如何把流程标准化、如何做质量控制与边界处理，方便面试官快速评估工程交付能力。
              </p>
            </article>

            <article className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-sm font-semibold text-white">希望从事岗位</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">
                AI 应用工程、AI 工作流/平台工程、AI 产品策略等岗位。核心诉求是把模型能力嵌入真实业务链路：从本地/私有化部署、提示与结构化输出、到评测与质检闭环，再到前后端集成与上线维护，负责从原型到稳定交付的全流程实现。
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

        <div className="flex flex-col gap-5">
          {FEATURED_SHOWCASE.map((card) => (
            <FeaturedShowcaseCard
              key={card.title}
              title={card.title}
              image1={card.image1}
              text1={card.text1}
              image2={card.image2}
              text2={card.text2}
            />
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

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setActiveModule("All");
                  setActiveTag("All");
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
              <ProjectCard key={p.id} p={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-6">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="mt-2 h-3 w-64" />
          </div>
        )}
      </section>
    </main>
  );
}
