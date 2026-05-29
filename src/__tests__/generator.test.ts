import { ProjectGenerator } from "../generator";
import { ProjectConfig } from "../types";
import fs from "fs-extra";
import path from "path";

describe("ProjectGenerator", () => {
  const testDir = path.join(__dirname, "../../test-output");

  beforeEach(async () => {
    if (fs.existsSync(testDir)) {
      await fs.remove(testDir);
    }
    await fs.ensureDir(testDir);
  });

  afterEach(async () => {
    if (fs.existsSync(testDir)) {
      await fs.remove(testDir);
    }
  });

  test("should create a Go Basic CLI project", async () => {
    const config: ProjectConfig = {
      framework: "Go",
      projectName: "test-go-app",
      projectPath: testDir,
      options: { template: "Basic CLI" },
    };

    const generator = new ProjectGenerator(config);
    await generator.generate();

    const projectPath = path.join(testDir, "test-go-app");
    expect(fs.existsSync(projectPath)).toBe(true);
    expect(fs.existsSync(path.join(projectPath, "main.go"))).toBe(true);
    expect(fs.existsSync(path.join(projectPath, "go.mod"))).toBe(true);
    expect(fs.existsSync(path.join(projectPath, "README.md"))).toBe(true);
    expect(fs.existsSync(path.join(projectPath, ".cursorrules"))).toBe(true);
    const cursorRules = await fs.readFile(path.join(projectPath, ".cursorrules"), "utf-8");
    expect(cursorRules).toContain("🤖 AI Agent Scaffolding Guidelines");
    expect(cursorRules).toContain("🐹 Go Guidelines");

    expect(fs.existsSync(path.join(projectPath, "docs/AGENTS.md"))).toBe(true);
    expect(fs.existsSync(path.join(projectPath, "docs/instructions.md"))).toBe(true);
    const docsAgents = await fs.readFile(path.join(projectPath, "docs/AGENTS.md"), "utf-8");
    expect(docsAgents).toContain("🤖 AI Agent Project Guidelines");
    expect(docsAgents).toContain("Welcome, AI Agent!");
  });

  test("should create a Node.js Express API project", async () => {
    const config: ProjectConfig = {
      framework: "Node.js",
      projectName: "test-express-app",
      projectPath: testDir,
      options: { template: "Express API" },
    };

    const generator = new ProjectGenerator(config);
    await generator.generate();

    const projectPath = path.join(testDir, "test-express-app");
    expect(fs.existsSync(projectPath)).toBe(true);
    expect(fs.existsSync(path.join(projectPath, "package.json"))).toBe(true);
    expect(fs.existsSync(path.join(projectPath, "src/index.ts"))).toBe(true);
    expect(fs.existsSync(path.join(projectPath, "tsconfig.json"))).toBe(true);
    expect(fs.existsSync(path.join(projectPath, ".cursorrules"))).toBe(true);
    const cursorRules = await fs.readFile(path.join(projectPath, ".cursorrules"), "utf-8");
    expect(cursorRules).toContain("🟢 Node.js & TypeScript Guidelines");

    expect(fs.existsSync(path.join(projectPath, "docs/AGENTS.md"))).toBe(true);
    expect(fs.existsSync(path.join(projectPath, "docs/instructions.md"))).toBe(true);
    const docsInstructions = await fs.readFile(path.join(projectPath, "docs/instructions.md"), "utf-8");
    expect(docsInstructions).toContain("Developer Setup & Playbook");
    expect(docsInstructions).toContain("Node.js");
  });

  test("should create a Python FastAPI project", async () => {
    const config: ProjectConfig = {
      framework: "Python",
      projectName: "test-fastapi-app",
      projectPath: testDir,
      options: { template: "FastAPI" },
    };

    const generator = new ProjectGenerator(config);
    await generator.generate();

    const projectPath = path.join(testDir, "test-fastapi-app");
    expect(fs.existsSync(projectPath)).toBe(true);
    expect(fs.existsSync(path.join(projectPath, "main.py"))).toBe(true);
    expect(fs.existsSync(path.join(projectPath, "requirements.txt"))).toBe(
      true
    );
    expect(fs.existsSync(path.join(projectPath, ".cursorrules"))).toBe(true);
    const cursorRules = await fs.readFile(path.join(projectPath, ".cursorrules"), "utf-8");
    expect(cursorRules).toContain("🐍 Python & PEP 8 Guidelines");

    expect(fs.existsSync(path.join(projectPath, "docs/AGENTS.md"))).toBe(true);
    expect(fs.existsSync(path.join(projectPath, "docs/instructions.md"))).toBe(true);
    const docsAgents = await fs.readFile(path.join(projectPath, "docs/AGENTS.md"), "utf-8");
    expect(docsAgents).toContain("AI Agent Project Guidelines");
  });

  test("should throw error if directory already exists", async () => {
    const config: ProjectConfig = {
      framework: "Go",
      projectName: "test-go-app",
      projectPath: testDir,
      options: { template: "Basic CLI" },
    };

    const generator = new ProjectGenerator(config);
    await generator.generate();

    const generator2 = new ProjectGenerator(config);
    await expect(generator2.generate()).rejects.toThrow(
      'Directory "test-go-app" already exists'
    );
  });

  test("should create project with valid file contents", async () => {
    const config: ProjectConfig = {
      framework: "Go",
      projectName: "test-go-web",
      projectPath: testDir,
      options: { template: "Web API" },
    };

    const generator = new ProjectGenerator(config);
    await generator.generate();

    const projectPath = path.join(testDir, "test-go-web");
    const mainGoPath = path.join(projectPath, "main.go");
    const mainGoContent = await fs.readFile(mainGoPath, "utf-8");

    expect(mainGoContent).toContain("package main");
    expect(mainGoContent).toContain("github.com/gin-gonic/gin");
    expect(mainGoContent).toContain("router.Run");
  });
});
