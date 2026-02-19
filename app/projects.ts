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
  category: "本地ML部署 · 语音转文字",
  title: "Whisper 本地转写：批量 ASR + 提示词/主题确认",
  subtitle: "GPU/CPU 自动切换；目录批处理；prompt.txt 约束术语与上下文",
  description:
    "把 Whisper 落地为本地稳定跑的批量转写工具：输入为一个音频目录（m4a/wav/mp3/flac/ogg），输出为同名 txt 文件落盘。脚本会先检查 CUDA 可用性并选择设备（cuda/cpu），模型只加载一次然后批量处理所有文件；同时支持从 prompt.txt 读取‘主题/术语/人名’等上下文提示，保证转写更贴近会议/研究场景，并在每次批处理前显式确认 prompt 是否加载成功（便于面试时解释“如何用提示词把模型对齐到具体业务主题”）。",
  coreSkills: [
    "本地可用性：GPU 可用则 fp16 加速，否则自动回退 CPU（无需改代码）",
    "批处理工程化：目录扫描 + 统一输出目录 + 单次加载模型，减少重复开销",
    "提示词/主题对齐：prompt.txt 外置，批处理前确认加载状态，约束领域词汇与语境",
    "可观测性：每文件进度、耗时、失败捕获与落盘路径打印，便于排障与复盘"
  ],
  evidence: [
    { label: "完整代码GitHub链接", href: "https://github.com/Haibo114Luo/whisper_landing/blob/main/code/test.ipynb" },
    { label: "Whisper 开源实现（所用库）", href: "https://github.com/openai/whisper" }
  ],
  suggestedMetrics: [
    "主题一致性：经过多次检验，转写文本与录音文本的内容相当一致",
    "稳定性：即便在录音质量不佳时，也能成功转写并输出（失败率低）",
    "效率：单条音频转写耗时较短，多个音频批处理并无性能退化"
  ],
  deliverables: [
    "批量转写脚本（目录→txt 落盘）",
    "prompt.txt 主题/术语模板（可复用到不同项目/会议）",
    "一套可面试演示的本地运行流程（GPU/CPU 双路径）"
  ],
  tags: ["Whisper", "ASR", "本地部署", "批处理", "Prompt", "GPU/CPU"],
  status: "Ready"
},
{
  id: "P2",
  module: "Vibe Coding",
  category: "本地ML部署 · OCR工程",
  title: "PaddleOCR 本地 OCR：PDF→文本（GPU）与环境排障",
  subtitle: "版本锁定 + VSCode/CMD 环境一致性 + CUDA/cuDNN 路径治理",
  description:
    "把 PaddleOCR GPU 版在 Windows 本地跑通并稳定化，用于 PDF 批量转文字/结构化提取。项目核心不在‘调用一次 OCR API’，而在工程侧把不可控因素收敛：处理过 VSCode Notebook 内核崩溃（cuDNN DLL 缺失/路径问题）与同一机器 CMD 可跑但 VSCode 不可跑的环境不一致问题；通过明确的版本组合锁定与依赖重装顺序，把 CUDA/cuDNN/NumPy/OpenCV 等冲突点压平，并按需关闭不需要的初始化模块、静音 warning/debug，最终形成可复现的本地 OCR 环境与排障清单（可用于面试展示“如何把一个不稳定的本地AI工具变成可交付系统”）。",
  coreSkills: [
    "系统化排障：从报错（DLL 缺失/Kernel died）反推依赖链与加载路径，定位根因而非试错",
    "环境治理：锁定稳定版本组合（Python/pp-gpu/paddleocr/numpy/opencv/imgaug）并按顺序重装",
    "一致性问题处理：解决 VSCode 与 CMD 运行差异（解释器/Kernel/Path/依赖来源）",
    "工程可控性：关闭非必要组件初始化、静音 warning/debug，保证流水线输出可读可用"
  ],
  evidence: [
    { label: "环境与排障记录（根据记忆生成）", href: "https://github.com/Haibo114Luo/Report_note_generation/blob/main/record.md" },
    { label: "PaddleOCR 开源实现（所用框架）", href: "https://github.com/PaddlePaddle/PaddleOCR" }
  ],
  suggestedMetrics: [
    "基础知识：在后续接触同类任务时，具有环境和版本检查的意识",
    "稳定性：长文档可以一次性处理几百、上千页不出错"
  ],
  deliverables: [
    "稳定版本组合与重装步骤",
    "本地环境和path配置与debug相关经验"
  ],
  tags: ["PaddleOCR", "OCR", "GPU", "CUDA/cuDNN", "环境排障", "可复现"],
  status: "Ready"
}
,
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
      "迭代成本：新增 GPU/精度/效率假设只要进行简单添加"
    ],
    deliverables: [
      "单文件计算器（本地打开或静态托管即可）",
      "场景台账 CSV（输入与输出同一行）",
      "实际的案例分析：阿里张北园区"
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
    category: "需求迭代 · 全栈 · 端口对接",
    title: "德州扑克记牌器：局域网筹码与底池管理",
    subtitle: "静态前端 + Flask API + SQLite + 代理转发：多端口编排，一键启动",
    description:
      "这是一个替代实体筹码的轻量局域网记账系统：同一 Wi‑Fi 下，玩家用手机/电脑浏览器加入即可记录余额、下注与底池。项目从真实牌局反馈出发迭代需求（交互更少、流程更硬约束、重置更明确），最终落成“静态 Web 前端 + Flask 后端 + SQLite 持久化 + 代理转发”的端到端架构。Windows 批处理脚本会自动检测本机 IPv4、生成 config.json 并拉起多个服务/端口，解决跨设备访问、CORS 与网络可达性问题。",
    coreSkills: [
      "需求拆解与快速迭代：围绕真实使用场景调整交互与规则（正确性优先）",
      "全栈逻辑与接口契约：前端状态/后端 API/数据库模型一体化设计",
      "端口对接与网络工程：多服务端口编排（Web/API/Proxy），代理转发规避跨域",
      "可用性工程：一键启动脚本自动生成 IP 配置与访问入口，常见网络问题可定位"
    ],
    suggestedMetrics: [
      "本地迅速启动：从双击脚本到手机可访问 URL",
      "数据全程同步：在线玩家每次下注/结算后余额与底池正确更新",
      "可扩展性：新增下注类型/结算规则的开发成本低"
    ],
    deliverables: [
      "一键启动脚本（自动探测 IP + 拉起多服务/端口）",
      "后端 API（注册/下注/底池/余额/清空）+ SQLite ",
      "可跨设备访问的浏览器前端"
    ],
    evidence: [
      { label: "GitHub 仓库", href: "https://github.com/Haibo114Luo/chips" },
      { label: "README", href: "https://github.com/Haibo114Luo/chips/blob/main/README.md" },
      { label: "启动脚本（PC_launch.bat）", href: "https://github.com/Haibo114Luo/chips/blob/main/PC_launch.bat" },
      { label: "后端（data.py）", href: "https://github.com/Haibo114Luo/chips/blob/main/data.py" },
      { label: "代理（proxy.py）", href: "https://github.com/Haibo114Luo/chips/blob/main/proxy.py" }
    ],
    tags: ["全栈", "Flask", "SQLite", "局域网", "批处理", "代理", "CORS", "Ports", "API"],
    status: "Ready",
    featuredRank: 2,
    proofPoints: [
      "需求迭代驱动落地：根据真实牌局需求最小化交互动作，形成稳定可靠的实现",
      "强健可用：多端口服务编排 + 代理转发 + 局域网自动ip识别",
      "正确性优先：下注/底池/结算/重置等关键状态可测试、可复盘"
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
    category: "Prompt系统 · 新闻检索",
    title: "News Collecting GPT：新闻搜集→结构化输出→知识库",
    subtitle: "指令集 + 重要性量表 + 格式校正：稳定日更、可审计可迭代",
    description:
      "把“每天跨地区搜集 AIDC/风电新闻”固化为可复用流程：先用可执行的‘重要性’规则做筛选与排序，再用固定 schema 强制输出（日期/地区/类别/事件/影响/来源URL），并设置停止条件避免硬凑。附带 hindsight 标注集生成（Major/NotMajor/Unlabeled + hard negative），以及 md→txt 合并脚本，把日更内容沉淀为可检索的单文件上下文（保留 SOURCE/FILE 便于回溯）。",
    coreSkills: [
      "把业务‘重要性’定义成可执行规则（AIDC 专用量表/升级门槛）",
      "Prompt/Schema 设计：锁定层级与字段，降低结构漂移与幻觉空间",
      "可评测迭代：hindsight 标注集（Major/NotMajor/Unlabeled）与 hard negative",
      "知识沉淀：日更 markdown 自动合并为单文件知识库（可追溯边界）"
    ],
    evidence: [
      { label: "GitHub Repo", href: "https://github.com/Haibo114Luo/News_collecting_GPT" },
      { label: "专用GPT《新闻》", href: "https://chatgpt.com/g/g-691bc3ebeb80819190eab1dc2158751d-xin-wen" },
      {
        label: "总指令（hindsight+日更）",
        href: "https://raw.githubusercontent.com/Haibo114Luo/News_collecting_GPT/main/%E6%8C%87%E4%BB%A4/%E6%8C%87%E4%BB%A4.md"
      },
      {
        label: "AIDC重要性量表",
        href: "https://raw.githubusercontent.com/Haibo114Luo/News_collecting_GPT/main/%E6%8C%87%E4%BB%A4/AIDC%E9%87%8D%E8%A6%81%E6%80%A7.md"
      },
      {
        label: "输出Schema（格式校正器）",
        href: "https://raw.githubusercontent.com/Haibo114Luo/News_collecting_GPT/main/%E6%8C%87%E4%BB%A4/%E6%A0%BC%E5%BC%8F.txt"
      },
      {
        label: "md→txt 知识库合并脚本",
        href: "https://github.com/Haibo114Luo/News_collecting_GPT/blob/main/md_to_txt/to_txt.ipynb"
      }
    ],
    suggestedMetrics: [
      "重要新闻知识：通过严格规定的回看，获取分辨重要新闻的行业知识",
      "结构合规：严格schema输出，缺字段/缺URL/地区顺序错误/格式漂移的错误较少发生",
      "每日工作量：只需要简单的prompt就可以自动完成每天的指定新闻收集，大大节省时间"
    ],
    deliverables: [
      "可直接复用的指令集（hindsight + 日更两套逻辑）",
      "固定输出 schema（层级 + 字段 + 类别标签）",
      "merged_context 单文件知识库（保留 SOURCE/FILE 边界）"
    ],
    tags: ["Prompt系统", "Schema输出", "新闻检索", "评测迭代", "知识库", "AIDC/风电"],
    status: "Ready"
  },
  {
    id: "P6",
    module: "AI Workflow",
    category: "研报整理 · 本地ML部署 + Prompt工程",
    title: "研报整理流水线：PDF→Markdown→结构化结论库",
    subtitle: "本地 OCR/解析 + 清洗分段 + Schema 抽取：可质检、可复现、可扩散",
    description:
      "把研报从“不可控的 PDF 版面”变成可被机器稳定处理的结构化资产：先在本地完成 OCR/解析，把 PDF/EPUB 统一转成 Markdown，并在进入 LLM 前完成去噪、分页锚点与段落切分；再用固定 Schema + Hook 续写协议做笔记/数据抽取，强制输出字段、引用来源（页码/链接）与错误记录，便于抽样质检与持续迭代。目标不是写得像人，而是把研究阅读变成一条可复制到团队的标准化工作流（AI diffusion）。",
    coreSkills: [
      "本地 ML 部署与排障：OCR/解析链路在 Windows GPU 环境跑通并稳定化（版本/依赖/驱动问题可定位）",
      "Prompt engineering：Schema 驱动输出（字段/单位/时间口径/引用来源），降低幻觉与格式漂移",
      "长文确定性处理：分段输入 + Hook 续写协议，对抗截断，进度可追踪、可回滚",
      "质量控制与可复现：输入/中间产物/输出目录化；抽样校验可回放到具体页/段"
    ],
    evidence: [
      { label: "GitHub Repo", href: "https://github.com/Haibo114Luo/Report_note_generation" },
      { label: "专用GPT《报告》", href: "https://chatgpt.com/g/g-6958c62859308191a56c55be410caad7-bao-gao" },
      {
        label: "PDF→MD（含OCR）notebook",
        href: "https://github.com/Haibo114Luo/Report_note_generation/blob/main/pdf_to_md_2.ipynb"
      },
      {
        label: "Markdown 清洗 refine notebook",
        href: "https://github.com/Haibo114Luo/Report_note_generation/blob/main/refine_md.ipynb"
      },
      {
        label: "笔记输出协议（含分段/Hook要求）",
        href: "https://raw.githubusercontent.com/Haibo114Luo/Report_note_generation/main/%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/%E6%8C%87%E4%BB%A4.md"
      },
      {
        label: "README（整体pipeline说明）",
        href: "https://github.com/Haibo114Luo/Report_note_generation/blob/main/README.md"
      }
    ],
    suggestedMetrics: [
      "知识获取效率：大大提高阅读报告获取关键信息的效率（相较于人工笔记）",
      "转换成功率：可读 Markdown 准确覆盖全文",
      "后续任务：通过RAG完成知识库构建"
    ],
    deliverables: [
      "PDF/EPUB→Markdown 转换 notebooks（OCR/解析，可复跑）",
      "Markdown 清洗与切分规则（统一层级/分页锚点）",
      "结构化输出协议（Schema + Hook 续写 + 引用规范）"
    ],
    tags: ["研报整理", "本地部署", "OCR", "Markdown", "Prompt", "Schema", "Hook续写", "AI Diffusion"],
    status: "Ready",
    featuredRank: 1,
    proofPoints: [
      "离线预处理 + 结构化抽取 + 质检回放：把研报处理做成确定性流水线",
      "Schema 强约束输出：字段/单位/时间口径/引用来源齐全，便于自动入库",
      "强调 AI diffusion：把个人效率提升扩散为可复用的团队工作流"
    ]
  },
];

export const tagUniverse: string[] = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

export const moduleUniverse: Array<Project["module"]> = ["Vibe Coding", "AI Workflow"];
