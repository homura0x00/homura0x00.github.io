"use client";
import { Avatar } from "@radix-ui/react-avatar";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

const projects = [
    {
        name: "项目一",
        description: "这是第一个项目的描述。",
        url: "#",
    },
    {
        name: "项目二",
        description: "这是第二个项目的描述。",
        url: "#",
    },
    {
        name: "项目3",
        description: "这是第三个项目的描述。",
        url: "#",
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

export default function ProjectList() {
    return (

        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:px-6">
            {projects.map((project, index) => (
                <Card key={index} className="@container/card">
                    <a href={project.url} key={index} target="_blank" rel="noopener noreferrer">
                        <CardHeader>
                            <img
                                src={`https://picsum.photos/seed/${index}/300/200`}
                                alt={project.name}
                                className="w-full h-32 object-cover rounded-t-md"
                            />
                        </CardHeader>
                        <CardFooter>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                        </CardFooter>
                    </a>
                </Card>
            ))}
        </div>
    );
}