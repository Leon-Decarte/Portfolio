import type { Project } from "../projects";

export const learnhome: Project = {
    id: "project-2",
    year: 2024,
    category: "dashboard",
    status: "completed",

    hero: {
        title: "Learn@home",
        description: "Architected the functional scoping and agile framework for an educational platform using Figma and Notion. Delivered responsive wireframes, user stories with acceptance criteria, and a macro Kanban backlog to structure the development lifecycle.",
        image: "learnhome/main.png",
        demoLink: "https://www.figma.com/proto/fb5AU3xMcPrfG3rx8r1S0A/Untitled?node-id=0-1&t=3E8eYguevwcwqgfw-1",
        githubLink: "https://github.com/username/project2",
    },

    context: "Context and background of the project.",

    stack: ["React", "TypeScript", "Tailwind CSS"],

    features: [
        {
            title: "Feature 1",
            description: "Description of feature 1.",
            image: "/images/project2/feature1.png",
        },
        {
            title: "Feature 2",
            description: "Description of feature 2.",
            image: "/images/project2/feature2.png",
        },
    ],

    responsive: {
        desktop: "/images/project2/desktop.png",
        mobile: "/images/project2/mobile.png",
    },

    highlights: [
        "Highlight 1",
        "Highlight 2",
        "Highlight 3",
    ],
};