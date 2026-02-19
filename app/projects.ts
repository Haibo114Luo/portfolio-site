export type LinkItem = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  module: "Vibe Coding" | "AI Workflow";
  category: string;
  title: string;
  subtitle: string;
  description: string;
  coreSkills: string[];
  evidence: LinkItem[];
  suggestedMetrics: string[];
  deliverables: string[];
  tags: string[];
  status?: "Ready" | "WIP";
  featuredRank?: number;
  proofPoints?: string[];
  sections?: {
    goal?: string;
    pipeline?: string[];
    hardProblems?: string[];
    outcomes?: string[];
    repro?: string[];
    evidence?: LinkItem[];
  };
};

// IMPORTANT:
// 1) Keep this file at: app/projects.ts
// 2) page.tsx imports it with: import { projects, tagUniverse, moduleUniverse } from "./projects";

export const projects: Project[] = [
  {
    id: "P1",
    module: "Vibe Coding",
    category: "分类 A",
    title: "",
    subtitle: "",
    description: "",
    coreSkills: [],
    evidence: [],
    suggestedMetrics: [],
    deliverables: [],
    tags: ["机器学习", "Whisper", "推理", "流程"],
    status: "Ready"
  },
  {
    id: "P2",
    module: "Vibe Coding",
    category: "分类 B",
    title: "",
    subtitle: "",
    description: "",
    coreSkills: [],
    evidence: [],
    suggestedMetrics: [],
    deliverables: [],
    tags: ["OCR", "PaddleOCR", "CUDA", "排障"],
    status: "Ready"
  },
  {
    id: "P3",
    module: "Vibe Coding",
    category: "研究工具 · 参数化建模",
    title: "AIDC 计算器 - 集群功率与有效算力估算器",
    subtitle: "GPU/效率/功耗/PUE -> 训练与推理指标 + CSV 复算与敏感性分析",
    description:
      "这是一个单文件（HTML）的参数化计算器，把 GPU 侧假设（架构、精度、MFU 或降额 x 并行效率）与数据中心约束（节点功率、PUE）连接起来。它能同时输出训练与服务场景下可横向比较的工程指标：IT/总功率（MW）、有效算力（EFLOP/s）、训练时长、吞吐（tokens/s、QPS）以及每 100 万 tokens 的能耗。工具支持 CSV 导入导出，使场景分析可复算、可对比、可沉淀。",
    coreSkills: [
      "参数 schema 设计：把模糊行业假设拆成显式、可调的参数字段",
      "数值建模与单位一致性：统一 MW / EFLOP/s / tokens/s / MWh 口径",
      "可审计计算链路：页面内提供公式推导，便于面试逐项讲解",
      "可复算工作流：CSV 行级导入导出，持续沉淀场景台账"
    ],
    suggestedMetrics: [
      "复算一致性：同一 CSV 行重复回填时输出一致",
      "场景覆盖度：可维护场景行数与参数维度数量",
      "迭代成本：新增 GPU/精度/效率假设所需改动量"
    ],
    deliverables: [
      "单文件计算器（本地打开或静态托管即可）",
      "场景台账 CSV（输入与输出同一行）",
      "在 MW 约束下校验算力宣称可行性的示例场景"
    ],
    evidence: [
      { label: "GitHub 仓库", href: "https://github.com/Haibo114Luo/AIDC-calculator" },
      {
        label: "主 HTML",
        href: "https://github.com/Haibo114Luo/AIDC-calculator/blob/main/%E7%AE%97%E5%8A%9B%E8%AE%A1%E7%AE%97v6_fixed.html"
      },
      {
        label: "场景台账（CSV）",
        href: "https://github.com/Haibo114Luo/AIDC-calculator/blob/main/%E7%BB%93%E6%9E%9C%E8%AE%B0%E5%BD%95.csv"
      }
    ],
    tags: ["AIDC", "功耗", "PUE", "MFU", "EFLOPS", "敏感性分析", "HTML", "CSV"],
    status: "Ready",
    proofPoints: [
      "同时覆盖训练与推理指标输出（MW / EFLOP/s / 时长 / TPS/QPS / 每 100 万 tokens 能耗）",
      "CSV 导入导出让每个场景可复算、可比较",
      "页面内公式推导支持面试中的可审计讲解"
    ],
    sections: {
      goal:
        "把 AIDC 产能讨论转成可复算的参数模型，将硬件与效率假设映射为训练和推理两类场景下的功率与有效算力结果。",
      pipeline: [
        "定义严格参数 schema（GPU 数量/型号、精度、MFU 或 降额 x 并行效率、节点功率、PUE、模型规模、tokens 系数、FLOPs 系数）。",
        "按优先级规则计算节点数与 IT/总功率（powerPerNode 覆盖 overhead；MFU 覆盖 降额 x 并行效率）。",
        "训练链路：有效 FLOPs -> 总 Ops -> 墙钟时间（含停机系数）。",
        "推理链路：FLOPs/token -> TPS/QPS -> 每 100 万 tokens 能耗（含在线时长系数）。",
        "CSV IO：导入行用于回填参数；导出表头+行用于维护场景台账。",
        "在页面展示推导过程，确保每个输出可解释、可审计。"
      ],
      hardProblems: [
        "避免峰值算力与有效算力混用，强制显式 MFU/效率假设。",
        "为部分缺失输入设计稳健的优先级处理逻辑。",
        "保证单位一致，支持跨架构/精度横向对比。",
        "通过稳定 CSV schema 同时记录输入与输出，保障场景可复算。"
      ],
      outcomes: [
        "单文件工具：本地可开、静态可托管，无需构建步骤。",
        "标准化场景台账支持快速敏感性分析与研究记录。",
        "CSV 示例场景展示如何用 MW 约束校验营销口径。"
      ],
      repro: [
        "在浏览器打开 HTML（或作为静态页面托管）。",
        "调整参数并点击 Calculate。",
        "将 CSV 场景行粘贴到参数输入框，执行计算复现结果。",
        "把导出的表头+行回写到 CSV 台账，做长期对比。"
      ],
      evidence: [
        { label: "README（raw）", href: "https://raw.githubusercontent.com/Haibo114Luo/AIDC-calculator/main/README.md" },
        {
          label: "HTML（raw）",
          href: "https://raw.githubusercontent.com/Haibo114Luo/AIDC-calculator/main/%E7%AE%97%E5%8A%9B%E8%AE%A1%E7%AE%97v6_fixed.html"
        },
        {
          label: "CSV（raw）",
          href: "https://raw.githubusercontent.com/Haibo114Luo/AIDC-calculator/main/%E7%BB%93%E6%9E%9C%E8%AE%B0%E5%BD%95.csv"
        }
      ]
    }
  },
  {
    id: "P4",
    module: "Vibe Coding",
    category: "全栈 · 复杂状态/规则",
    title: "德州扑克局域网筹码管理器",
    subtitle: "局域网一键启动：静态前端 + Flask API + SQLite 持久化 + 代理转发",
    description:
      "这是一个可替代实体筹码的轻量局域网筹码系统。玩家在同一 Wi-Fi 下即可用手机或电脑浏览器加入。系统由静态 Web 前端、Flask 后端与 SQLite 持久化组成，并通过轻量代理转发请求以规避跨域问题。Windows 批处理脚本会自动检测本机 IPv4、生成 config.json 并一键拉起全部服务，适配真实牌局中的非技术用户使用场景。",
    coreSkills: [
      "端到端架构：静态前端 + Flask 后端 + SQLite 数据层 + 代理服务",
      "状态与规则建模：余额/下注/底池等核心状态以正确性优先",
      "可用性工程：一键启动脚本自动生成 IP 配置与访问入口",
      "局域网部署与排障：0.0.0.0 绑定、端口拆分、防火墙问题处理"
    ],
    suggestedMetrics: [
      "端到端启动时间：从双击脚本到手机可访问 URL",
      "并发体验：在线玩家数与 p95 操作延迟",
      "正确性：结算/下注/重置关键流程用例通过率"
    ],
    deliverables: [
      "一键启动脚本（自动探测 IP + 拉起三类服务）",
      "后端 API（注册/下注/底池/余额/清空）+ SQLite 持久化",
      "可跨设备访问的浏览器前端"
    ],
    evidence: [
      { label: "GitHub 仓库", href: "https://github.com/Haibo114Luo/chips" },
      { label: "README", href: "https://github.com/Haibo114Luo/chips/blob/main/README.md" },
      { label: "启动脚本（PC_launch.bat）", href: "https://github.com/Haibo114Luo/chips/blob/main/PC_launch.bat" },
      { label: "后端（data.py）", href: "https://github.com/Haibo114Luo/chips/blob/main/data.py" },
      { label: "代理（proxy.py）", href: "https://github.com/Haibo114Luo/chips/blob/main/proxy.py" }
    ],
    tags: ["全栈", "Flask", "SQLite", "局域网", "批处理", "代理", "CORS"],
    status: "Ready",
    proofPoints: [
      "本地一键部署：自动识别 IPv4 + 生成配置 + 启动多服务",
      "职责清晰拆分：静态 UI / 后端 API / 代理转发",
      "SQLite 持久化支持牌局重置与数据留存"
    ],
    sections: {
      goal:
        "构建一个零门槛的局域网 Web 应用，在真实牌局中无需实体筹码也能跟踪余额、下注与底池，并让非技术用户也能直接上手。",
      pipeline: [
        "通过 python -m http.server 提供静态前端（8000 端口）。",
        "Flask + SQLAlchemy 后端（5000 端口）将玩家、余额、current_bet 写入 SQLite（game_data.db）。",
        "代理服务（8001 端口）负责前端到后端请求转发，简化网络/CORS 处理。",
        "PC_launch.bat：检测 IPv4 -> 写入 config.json -> 启动三组终端（Web/Backend/Proxy）-> 输出加入地址。",
        "前端通过代理调用 register、update_bet、pot、players、clear 等接口。"
      ],
      hardProblems: [
        "把部署压缩到“一键启动”（无需手配 IP、无需手敲服务命令）。",
        "保持核心记账状态一致（pot = sum(current_bet)、结算更新、重置行为）。",
        "局域网可达性与稳定性（0.0.0.0 绑定、防火墙陷阱）。",
        "重置与持久化设计（clear 接口 / 删除 DB）。"
      ],
      outcomes: [
        "同一 Wi-Fi 下玩家可通过输出 URL 加入，并在任意浏览器设备操作。",
        "支持核心流程：注册 -> 下注增量 -> 底池聚合 -> 输赢结算 -> 余额查看。",
        "SQLite 持久化存储，且通过 clear 接口/UI 可显式重置。"
      ],
      repro: [
        "安装 Python（确保 PATH 可用）。",
        "首次执行 pip_install.bat 安装依赖。",
        "双击 PC_launch.bat，在同一 Wi-Fi 的手机/电脑打开 http://<ip>:8000。",
        "注册玩家后执行下注/输赢/重置，观察底池与余额变化。"
      ],
      evidence: [
        { label: "README（raw）", href: "https://raw.githubusercontent.com/Haibo114Luo/chips/main/README.md" },
        { label: "PC_launch.bat（raw）", href: "https://raw.githubusercontent.com/Haibo114Luo/chips/main/PC_launch.bat" },
        { label: "data.py（raw）", href: "https://raw.githubusercontent.com/Haibo114Luo/chips/main/data.py" },
        { label: "proxy.py（raw）", href: "https://raw.githubusercontent.com/Haibo114Luo/chips/main/proxy.py" },
        { label: "pip_install.bat（raw）", href: "https://raw.githubusercontent.com/Haibo114Luo/chips/main/pip_install.bat" }
      ]
    }
  },
  {
    id: "P5",
    module: "AI Workflow",
    category: "分类 E",
    title: "",
    subtitle: "",
    description: "",
    coreSkills: [],
    evidence: [],
    suggestedMetrics: [],
    deliverables: [],
    tags: ["提示词", "检索", "工作流", "评估"],
    status: "Ready"
  },
  {
    id: "P6",
    module: "AI Workflow",
    category: "分类 F",
    title: "",
    subtitle: "",
    description: "",
    coreSkills: [],
    evidence: [],
    suggestedMetrics: [],
    deliverables: [],
    tags: ["Schema", "抽取", "质检", "笔记"],
    status: "Ready"
  }
];

export const tagUniverse: string[] = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

export const moduleUniverse: Array<Project["module"]> = ["Vibe Coding", "AI Workflow"];
