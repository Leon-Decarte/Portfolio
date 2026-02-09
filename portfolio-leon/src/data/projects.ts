export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link?: string; // Optional: link to project demo or repo
}

export const projectsData: Project[] = [
    {
        id: 1,
        title: "Project 1",
        description: "A brief description of your first project. Explain what it does and the technologies used.",
        image: "/images/project1.png",
        tags: ["React", "TypeScript", "CSS"],
        link: "https://example.com/project1",
    },
    {
        id: 2,
        title: "Project 2",
        description: "A brief description of your second project. Explain what it does and the technologies used.",
        image: "/images/project2.png",
        tags: ["React", "Node.js", "MongoDB"],
        link: "https://example.com/project2",
    },
    {
        id: 3,
        title: "Project 3",
        description: "A brief description of your third project. Explain what it does and the technologies used.",
        image: "/images/project3.png",
        tags: ["JavaScript", "HTML", "CSS"],
        link: "https://example.com/project3",
    },
    {
        id: 4,
        title: "Project 4",
        description: "Add more projects as needed.",
        image: "/images/project4.png",
        tags: ["Vue", "Firebase"],
        link: "https://example.com/project4",
    },
];