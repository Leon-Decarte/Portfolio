export interface Project {
    id: string;
    year: number;
    category: string;
    status: "completed" | "in-progress";

    hero: {
        title: string;
        description: string;
        image: string;
        demoLink?: string;
        githubLink?: string;
    };

    context: string;

    stack: string[];

    features: {
        title: string;
        description: string;
        image: string;
    }[];

    responsive?: {
        desktop: string;
        mobile: string;
    };

    highlights?: string[];
}

import { kasaProject } from "./projects/kasa";
import { project2 } from "./projects/project2";
import { sportsee } from "./projects/sportsee";
import { lespetitplat } from "./projects/lespetitplat";

export const projectsData: Project[] = [
    kasaProject,
    project2,
    sportsee,
    lespetitplat,
];