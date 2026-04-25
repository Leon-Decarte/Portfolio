import type { Project } from "../projects";

export const kasaProject: Project = {
    id: "kasa",
    year: 2024,
    category: "rental-platform",
    status: "completed",

    hero: {
        title: "Kasa",
        description:
            "React application with dynamic routing and reusable components.",
        image: "src/assets/kasa/kasa.png",
        demoLink: "https://kasa-nine-rho.vercel.app",
        githubLink: "https://github.com/Leon-Decarte/P11_Kasa",
    },

    context:
        "Front-end refactor of a rental platform migrating from ASP.NET to React. Data is simulated using a local JSON file.",

    stack: ["React", "Vite", "React Router v6", "JavaScript", "CSS"],

    features: [
        {
            title: "Dynamic Routing",
            description:
                "Implemented dynamic property pages using React Router v6 with URL parameters and automatic 404 redirection.",
            image: "/images/kasa/routing.png",
        },
        {
            title: "Interactive Slideshow",
            description:
                "Created a circular image carousel with state management.",
            image: "/images/kasa/slideshow.png",
        },
        {
            title: "Reusable Collapse Component",
            description:
                "Built a configurable collapse component used across pages.",
            image: "/images/kasa/collapse.png",
        },
    ],

    responsive: {
        desktop: "/images/kasa/desktop.png",
        mobile: "/images/kasa/mobile.png",
    },

    highlights: [
        "SPA routing mastery",
        "Reusable component architecture",
        "State management patterns",
        "Professional deployment on Vercel",
    ],
};