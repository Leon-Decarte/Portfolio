import type { Project } from "../projects";

export const lespetitplat: Project = {
    id: "lespetitplat",
    year: 2024,
    category: "restaurant",
    status: "completed",

    hero: {
        title: "Les Petits Plats – Restaurant",
        description: "Engineered an optimized recipe search engine in native JavaScript, comparing a functional programming approach against imperative loops. Conducted performance benchmarking to minimize algorithmic complexity ",
        image: "petitplats/main.png",
        demoLink: "https://lespetitsplats-one.vercel.app/",
        githubLink: "https://github.com/Leon-Decarte/P7_les_petits_plats",
    },

    context: "Context and background of the project.",

    stack: ["React", "JavaScript", "Tailwind CSS"],

    features: [
        {
            title: "Feature 1",
            description: "Description of feature 1.",
            image: "/images/lespetitplat/feature1.png",
        },
        {
            title: "Feature 2",
            description: "Description of feature 2.",
            image: "/images/lespetitplat/feature2.png",
        },
    ],

    responsive: {
        desktop: "/images/lespetitplat/desktop.png",
        mobile: "/images/lespetitplat/mobile.png",
    },

    highlights: [
        "Highlight 1",
        "Highlight 2",
        "Highlight 3",
    ],
};