import { AppType, SupportedStack } from "./types";

type DisabledChoice = {
  name: string;
  value: string;
  disabled?: string;
};

export const APP_TYPE_CHOICES: DisabledChoice[] = [
  { name: "Backend", value: "backend" },
  {
    name: "Frontend",
    value: "frontend",
  },
  {
    name: "AI / ML",
    value: "ai-ml",
  },
  {
    name: "DSA-specific",
    value: "dsa-specific",
    disabled: "Coming soon",
  },
];

export const STACK_CHOICES: Record<AppType, DisabledChoice[]> = {
  backend: [
    {
      name: "Node.js + TypeScript + Express",
      value: "node-ts-express",
    },
    {
      name: "NestJS",
      value: "nestjs",
    },
    {
      name: "Python + FastAPI",
      value: "python-fastapi",
    },
  ],
  frontend: [
    {
      name: "React + Vite",
      value: "react-vite",
    },
    {
      name: "Next.js",
      value: "nextjs",
    },
  ],
  "ai-ml": [
    {
      name: "Python + FastAPI Serving",
      value: "python-fastapi-serving",
    },
  ],
  "dsa-specific": [],
};

export function getStackChoices(appType: AppType): DisabledChoice[] {
  return STACK_CHOICES[appType];
}

export function getFrameworkForStack(stack: SupportedStack): string {
  switch (stack) {
    case "node-ts-express":
    case "nestjs":
      return "Node.js";
    case "python-fastapi":
      return "Python";
    case "react-vite":
    case "nextjs":
      return "Frontend";
    case "python-fastapi-serving":
      return "Python";
    default:
      throw new Error(`Unsupported stack "${stack}"`);
  }
}
