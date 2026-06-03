import { useState } from "react";
import { projectsData } from "../data/projects";
import type { Project } from "../data/projects";

function ProjectCard({ project, featured = false, delay = 1, reverse = false }: {
    project: Project;
    featured?: boolean;
    delay?: number;
    reverse?: boolean;
}) {
    return (
        <div className={`pcard .pcard--reverse reveal-up${featured ? " pcard--featured" : ""}${reverse ? " pcard--reverse" : ""}`} data-delay={String(delay)}>
            <div className="pcard-img-wrap">
                    <img src={project.hero.image} alt={project.hero.title} className="pcard-img" />

            </div>
            <div className="pcard-body">
                <div className="pcard-body-top">

                    <h3 className="pcard-title">{project.hero.title}</h3>
                        <span className="pcard-cat">{project.category}</span>
                        <span className="pcard-yr">{project.year}</span>
                    <p className="pcard-desc">{project.hero.description}</p>
                </div>

                <div className="pcard-body-bottom">
                    <div className="pcard-stack-row">
                        {project.stack.map((tech) => (
                            <span key={tech} className="pcard-tech">{tech}</span>
                        ))}
                    </div>

                    <div className="pcard-actions">
                        {project.hero.demoLink && (
                            <a href={project.hero.demoLink} target="_blank" rel="noopener noreferrer" className="pcard-cta">
                                View project
                            </a>
                        )}
                        {project.hero.githubLink && (
                            <a href={project.hero.githubLink} target="_blank" rel="noopener noreferrer" className="pcard-cta pcard-cta--ghost">
                                GitHub
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
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
                <h2 className="section-heading">Projects</h2>
            </div>

            {featured && <ProjectCard project={featured} featured delay={2} reverse={false} />}

            {visible.map((project, i) => (
                <ProjectCard key={project.id} project={project} featured delay={i + 3} reverse={((i + 1) % 2) === 1} />
            ))}


            {hiddenCount > 0 && (
                <div className="project-more reveal-up" data-delay="4">
                    <button className="project-more-btn" onClick={() => setShowAll((s) => !s)}>
                        {showAll ? "Show less" : `Show ${hiddenCount} more project${hiddenCount > 1 ? "s" : ""}`}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Projects;