import type { Project } from "../projects";

export const sportsee: Project = {
    id: "sportsee",
    year: 2024,
    category: "dashboard",
    status: "completed",

    hero: {
        title: "SportSee – Dashboard",
        description: "Developed a data-driven fitness analytics dashboard with React and Recharts, building complex data visualizations for desktop views. Standardized raw API responses using a decoupled service layer (Axios) and integrated a mock/live data switch for seamless testing.",
        image: "sportsee/main.png",
        demoLink: "https://p12-sportsee-one.vercel.app/",
        githubLink: "https://github.com/Leon-Decarte/P12_Sportsee",
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