import type { Project } from "../projects";

export const sportsee: Project = {
    id: "sportsee",
    year: 2024,
    category: "dashboard",
    status: "completed",

    hero: {
        title: "SportSee – Dashboard",
        description: "React dashboard application with data visualization.",
        image: "src/assets/sportsee/main.png",
        demoLink: "https://sportsee-dashboard.vercel.app",
        githubLink: "https://p12-sportsee-one.vercel.app/",
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