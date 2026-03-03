import type { Project } from "../projects";

export const lespetitplat: Project = {
    id: "lespetitplat",
    year: 2024,
    category: "restaurant",
    status: "completed",

    hero: {
        title: "Les Petits Plats – Restaurant",
        description: "React application for a restaurant with menu and reservation features.",
        image: "src/assets/lespetitplat/main.png",
        demoLink: "https://lespetitplat.vercel.app",
        githubLink: "https://github.com/Leon-Decarte/P13_LesPetitsPlats",
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