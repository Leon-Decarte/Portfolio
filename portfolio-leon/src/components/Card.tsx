

import type { Project } from "../data/projects";

interface CardProps {
    project: Project;
}

function Card({ project }: CardProps) {
    return (
        <div className="card">
            <img src={project.image} alt={project.title} className="card-image" />
            <div className="card-content">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.description}</p>
                <div className="card-tags">
                    {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
                {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn primary">
                        View Project
                    </a>
                )}
            </div>
        </div>
    );
}

export default Card;