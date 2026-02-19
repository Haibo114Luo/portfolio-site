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
    category: "Category A",
    title: "",
    subtitle: "",
    description: "",
    coreSkills: [],
    evidence: [],
    suggestedMetrics: [],
    deliverables: [],
    tags: ["ML", "Whisper", "Inference", "Pipeline"],
    status: "Ready"
  },
  {
    id: "P2",
    module: "Vibe Coding",
    category: "Category B",
    title: "",
    subtitle: "",
    description: "",
    coreSkills: [],
    evidence: [],
    suggestedMetrics: [],
    deliverables: [],
    tags: ["OCR", "PaddleOCR", "CUDA", "Debug"],
    status: "Ready"
  },
  {
    id: "P3",
    module: "Vibe Coding",
    category: "Category C",
    title: "",
    subtitle: "",
    description: "",
    coreSkills: [],
    evidence: [],
    suggestedMetrics: [],
    deliverables: [],
    tags: ["AIDC", "Modeling", "Python", "Sensitivity"],
    status: "WIP"
  },
  {
    id: "P4",
    module: "Vibe Coding",
    category: "Category D",
    title: "",
    subtitle: "",
    description: "",
    coreSkills: [],
    evidence: [],
    suggestedMetrics: [],
    deliverables: [],
    tags: ["Fullstack", "API", "Testing", "StateMachine"],
    status: "WIP"
  },
  {
    id: "P5",
    module: "AI Workflow",
    category: "Category E",
    title: "",
    subtitle: "",
    description: "",
    coreSkills: [],
    evidence: [],
    suggestedMetrics: [],
    deliverables: [],
    tags: ["Prompt", "Retrieval", "Workflow", "Evaluation"],
    status: "Ready"
  },
  {
    id: "P6",
    module: "AI Workflow",
    category: "Category F",
    title: "",
    subtitle: "",
    description: "",
    coreSkills: [],
    evidence: [],
    suggestedMetrics: [],
    deliverables: [],
    tags: ["Schema", "Extraction", "QC", "Notes"],
    status: "Ready"
  }
];

export const tagUniverse: string[] = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

export const moduleUniverse: Array<Project["module"]> = ["Vibe Coding", "AI Workflow"];
