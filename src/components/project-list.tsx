"use client";

interface Project {
    name: string;
    description: string;
    url: string;
    createdAt?: string;
}

const projects: Project[] = [
    {
        name: "在線簡歷編輯器",
        description: "極簡簡歷的在線簡歷編輯器。",
        url: "https://homura-resume-app.vercel.app",
        createdAt: "2026.09",
    },
    {
        name: "智能運維助手",
        description: "以市面上'開源'的 harness agent 的研究性項目",
        url: "",
        createdAt: "2026.02",
    },
    {
        name: "user Center (Java)",
        description: "Java Web 的练手项目。(backend)",
        url: "https://github.com/homura0x00/java-user-center",
        createdAt: "2025.11",
    },
    {
        name: "分布式蜜罐項目",
        description: "因項目小型化問題，死在半途和被遺忘在角落...",
        url: "https://github.com/homura0x00/honey-trapX",
        createdAt: "2025.09",
    },
    {
        name: "API 開放平台",
        description: "個人項目的API整合平台，用於統籌自己對外開放的服務",
        url: "https://homura.me",
        createdAt: "2023.11",
    },
];

function ProjectCard({ project, isLast }: { project: Project; isLast: boolean }) {
    const hasUrl = project.url && project.url !== "#";
    const baseClass = "group -mx-3 rounded-md px-3 py-3 transition-colors" +
        (!isLast ? " mb-4 border-b border-border" : "");

    const content = (
        <>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                    {project.name}
                </span>
                {project.createdAt && (
                    <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                        {project.createdAt}
                    </span>
                )}
            </div>
            {project.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground whitespace-pre-wrap">
                    {project.description}
                </p>
            )}
        </>
    );

    if (hasUrl) {
        return (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={baseClass + " block hover:bg-accent/5"}>
                {content}
            </a>
        );
    }

    return <div className={baseClass}>{content}</div>;
}

export default function ProjectList() {
    const half = Math.ceil(projects.length / 2);
    const leftProjects = projects.slice(0, half);
    const rightProjects = projects.slice(half);

    return (
        <div>
            <header className="mb-8 flex items-baseline gap-3">
                <span className="text-xs tracking-[2px] text-muted-foreground">
                    PROJECTS
                </span>
                <span className="text-xs text-muted-foreground">—</span>
                <a
                    href="https://github.com/homura0x00"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                    github ↗
                </a>
            </header>

            <main>
                {/* Desktop: 2 columns */}
                <div className="hidden gap-14 lg:grid lg:grid-cols-2">
                    <div className="flex flex-col">
                        {leftProjects.map((project, i) => (
                            <ProjectCard
                                key={project.name}
                                project={project}
                                isLast={i === leftProjects.length - 1}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col">
                        {rightProjects.map((project, i) => (
                            <ProjectCard
                                key={project.name}
                                project={project}
                                isLast={i === rightProjects.length - 1}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile: 1 column */}
                <div className="flex flex-col lg:hidden">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.name}
                            project={project}
                            isLast={i === projects.length - 1}
                        />
                    ))}
                </div>
            </main>

            <footer className="mt-7 border-t border-border pt-3 text-right text-xs text-muted-foreground">
                {projects.length} projects
            </footer>
        </div>
    );
}