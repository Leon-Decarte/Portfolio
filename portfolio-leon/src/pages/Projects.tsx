import { useState } from "react";
import { projectsData } from "../data/projects";
import type { Project } from "../data/projects";

function FeaturedCard({ project }: { project: Project }) {
    return (
        <a
            href={project.hero.demoLink ?? project.hero.githubLink ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="project-featured reveal-up"
            data-delay="2"
        >
            <img
                src={project.hero.image}
                alt={project.hero.title}
                className="project-featured-img"
            />
            <div className="project-featured-info">
                <div className="project-featured-meta">
                    <span className="pcard-category">{project.category}</span>
                    <span className="pcard-year">{project.year}</span>
                </div>
                <h3 className="project-featured-title">{project.hero.title}</h3>
                <p className="project-featured-desc">{project.hero.description}</p>
                <div className="pcard-tags">
                    {project.stack.map((tech) => (
                        <span key={tech} className="pcard-tag">{tech}</span>
                    ))}
                </div>
            </div>
        </a>
    );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
    return (
        <a
            href={project.hero.demoLink ?? project.hero.githubLink ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card reveal-up"
            data-delay={String(delay)}
        >
            <img
                src={project.hero.image}
                alt={project.hero.title}
                className="project-card-img"
            />
            <div className="project-card-info">
                <div className="pcard-meta">
                    <span className="pcard-category">{project.category}</span>
                    <span className="pcard-year">{project.year}</span>
                </div>
                <h3 className="project-card-title">{project.hero.title}</h3>
                <p className="project-card-desc">{project.hero.description}</p>
                <div className="pcard-tags">
                    {project.stack.map((tech) => (
                        <span key={tech} className="pcard-tag">{tech}</span>
                    ))}
                </div>
            </div>
        </a>
    );
}

function Projects() {
    const [showAll, setShowAll] = useState(false);
    const [featured, ...rest] = projectsData;
    const visible = showAll ? rest : rest.slice(0, 2);
    const hiddenCount = rest.length - 2;

    return (
        <div className="projects-section">
            <div className="reveal-up" data-delay="1">
                <span className="section-eyebrow">Selected work</span>
                <h2 className="section-heading">Projects that<br />ship and scale.</h2>
            </div>

            {featured && <FeaturedCard project={featured} />}

            <div className="project-grid">
                {visible.map((project, i) => (
                    <ProjectCard key={project.id} project={project} delay={i + 3} />
                ))}
            </div>

            {hiddenCount > 0 && (
                <div className="project-more reveal-up" data-delay="4">
                    <button
                        className="project-more-btn"
                        onClick={() => setShowAll((s) => !s)}
                    >
                        {showAll
                            ? "Show less"
                            : `Show ${hiddenCount} more project${hiddenCount > 1 ? "s" : ""}`}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Projects;