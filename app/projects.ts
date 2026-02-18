export type LinkItem = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  module: "Vibe Coding" | "AI Workflow";
  category: string;
  title: string;
  subtitle: string; // one-liner
  description: string;
  coreSkills: string[];
  evidence: LinkItem[];
  suggestedMetrics: string[];
  deliverables: string[];
  tags: string[];
  status?: "Ready" | "WIP";
};

// IMPORTANT:
// 1) Keep this file at: app/projects.ts
// 2) page.tsx imports it with: import { projects, tagUniverse, moduleUniverse } from "./projects";

export const projects: Project[] = [
  {
    id: "P1",
    module: "Vibe Coding",
    category: "ML落地",
    title: "Whisper 语音转文字",
    subtitle: "预处理 → 推理 → 后处理 → 输出格式化",
    description:
      "基于 Whisper 搭建音频转写 pipeline，覆盖音频预处理、推理调用、结果后处理与输出格式化，用于会议/访谈内容快速文本化。",
    coreSkills: ["ML 推理工程化", "数据预处理", "批处理/吞吐优化", "结果评估与交付"],
    evidence: [
      { label: "GitHub Repo", href: "https://github.com/Haibo114Luo/list_of_works" },
      { label: "Live Site", href: "https://listofworks.vercel.app" }
    ],
    suggestedMetrics: ["转写耗时（x 倍实时）", "错误率（WER/CER）", "批处理吞吐量（files/min）"],
    deliverables: ["Demo 片段", "pipeline 说明", "复现步骤"],
    tags: ["ML", "Whisper", "Inference", "Pipeline"],
    status: "Ready"
  },
  {
    id: "P2",
    module: "Vibe Coding",
    category: "ML落地 · 工程排障",
    title: "PaddleOCR：PDF 转文字（GPU 环境排障）",
    subtitle: "CUDA/cuDNN/DLL/依赖冲突：稳定运行与复现策略",
    description:
      "基于 PaddleOCR 做 PDF 文本抽取，重点展示 GPU 环境配置、依赖冲突定位、DLL/CUDA/cuDNN 问题排查与稳定运行策略。",
    coreSkills: ["工程排障", "依赖/环境治理", "GPU 运行栈定位", "稳定性与可复现性"],
    evidence: [
      { label: "GitHub Repo", href: "https://github.com/Haibo114Luo/list_of_works" },
      { label: "Live Site", href: "https://listofworks.vercel.app" }
    ],
    suggestedMetrics: ["成功率（可解析 PDF 占比）", "崩溃率下降（before/after）", "单文档时延（s/doc）"],
    deliverables: ["Debug 时间线", "Root Cause 总结", "复现脚本/环境锁定"],
    tags: ["OCR", "PaddleOCR", "CUDA", "Debug"],
    status: "Ready"
  },
  {
    id: "P3",
    module: "Vibe Coding",
    category: "Python工具化",
    title: "AIDC 计算器",
    subtitle: "参数化建模 + 敏感性分析 + 可复算输出",
    description:
      "把行业研究参数抽象为可调模型，构建可复算工具，支持参数敏感性分析与标准化输出。",
    coreSkills: ["业务建模", "Python 工具化", "可解释输出", "敏感性分析"],
    evidence: [
      { label: "GitHub Repo", href: "https://github.com/Haibo114Luo/list_of_works" },
      { label: "Live Site", href: "https://listofworks.vercel.app" }
    ],
    suggestedMetrics: ["参数维度/覆盖数", "计算耗时（ms/run）", "复算一致性（误差/容差）"],
    deliverables: ["交互页面或 Notebook", "公式/假设说明", "示例输入输出"],
    tags: ["AIDC", "Modeling", "Python", "Sensitivity"],
    status: "WIP"
  },
  {
    id: "P4",
    module: "Vibe Coding",
    category: "全栈逻辑",
    title: "德州扑克筹码计算器（前后端）",
    subtitle: "复杂规则与状态流转：边界条件正确性优先",
    description:
      "设计前后端协作的筹码计算应用，处理复杂规则与状态流转，确保边界条件与异常输入下输出正确。",
    coreSkills: ["架构能力", "复杂逻辑建模", "前后端协同", "测试与边界处理"],
    evidence: [
      { label: "GitHub Repo", href: "https://github.com/Haibo114Luo/list_of_works" },
      { label: "Live Site", href: "https://listofworks.vercel.app" }
    ],
    suggestedMetrics: ["规则测试通过率（%）", "异常输入覆盖率（cases）", "接口响应时间（p95）"],
    deliverables: ["架构图", "API 示例", "在线演示"],
    tags: ["Fullstack", "API", "Testing", "StateMachine"],
    status: "WIP"
  },
  {
    id: "P5",
    module: "AI Workflow",
    category: "Prompt系统 · 新闻检索",
    title: "AI 找新闻（可评测 Prompt 系统）",
    subtitle: "标准化输出 + 复盘迭代：沉淀领域知识库",
    description:
      "设计可迭代 Prompt 流程用于新闻检索与筛选，引入标准化输出与复盘机制，沉淀为可复用的领域知识库。",
    coreSkills: ["Prompt 系统设计", "流程自动化", "评测/复盘机制", "知识沉淀"],
    evidence: [
      { label: "GitHub Repo", href: "https://github.com/Haibo114Luo/list_of_works" },
      { label: "Live Site", href: "https://listofworks.vercel.app" }
    ],
    suggestedMetrics: ["相关性命中率（人工标注）", "去重率（%）", "人工修订率（%）", "更新时效（T）"],
    deliverables: ["流程图", "Prompt 迭代记录", "样例库"],
    tags: ["Prompt", "Retrieval", "Workflow", "Evaluation"],
    status: "Ready"
  },
  {
    id: "P6",
    module: "AI Workflow",
    category: "Schema流水线 · 研报阅读",
    title: "AI 读研报（Schema 笔记流水线）",
    subtitle: "Schema 驱动结构化抽取：质量控制 + 可检索笔记",
    description:
      "通过 Schema 驱动的结构化抽取与总结流程，将研报阅读转化为可检索笔记，提升效率与一致性，并保留质检记录。",
    coreSkills: ["Workflow 设计", "Schema 标准化", "质量控制", "结构化抽取与检索"],
    evidence: [
      { label: "GitHub Repo", href: "https://github.com/Haibo114Luo/list_of_works" },
      { label: "Live Site", href: "https://listofworks.vercel.app" }
    ],
    suggestedMetrics: ["阅读时间节省比例（%）", "字段完整率（%）", "错引/幻觉率（%）"],
    deliverables: ["Schema 卡片", "前后对比样例", "质检记录"],
    tags: ["Schema", "Extraction", "QC", "Notes"],
    status: "Ready"
  }
];

export const tagUniverse: string[] = Array.from(
  new Set(projects.flatMap((p) => p.tags))
).sort();

export const moduleUniverse: Array<Project["module"]> = ["Vibe Coding", "AI Workflow"];
