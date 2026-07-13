"use client";

interface Project {
    name: string;
    description: string;
    url: string;
    createdAt?: string;
}

const projects: Project[] = [
    {
        name: "智能桌宠",
        description: "这是一个基于人工智能的桌面宠物应用，能够与用户进行互动，提供娱乐和陪伴。",
        url: "https://github.com/homura0x00/pet-desktop",
        createdAt: "2024.06",
    },
    {
        name: "项目二",
        description: "这是第二个项目的描述。",
        url: "#",
        createdAt: "2024.01",
    },
    {
        name: "项目3",
        description: "这是第三个项目的描述。\n第二行描述",
        url: "#",
        createdAt: "2024.02",
    },
    {
        name: "项目4",
        description: "这是第四个项目的描述。",
        url: "#",
    },
    {
        name: "项目5",
        description: "这是第五个项目的描述。",
        url: "#",
    },
    {
        name: "项目6",
        description: "这是第六个项目的描述。",
        url: "#",
    },
];

function ProjectCard({ project, isLast }: { project: Project; isLast: boolean }) {
    return (
        <div
            className={`group -mx-3 rounded-md px-3 py-3 transition-colors hover:bg-accent/5 ${
                !isLast ? "mb-4 border-b border-border" : ""
            } ${project.url ? "cursor-pointer" : ""}`}
            onClick={() => project.url && window.open(project.url, "_blank", "noopener,noreferrer")}
        >
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
        </div>
    );
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