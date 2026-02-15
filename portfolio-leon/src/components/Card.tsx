import type { Project } from "../data/projects";

interface CardProps {
    project: Project;
}

function Card({ project }: CardProps) {
    return (
        <div className="card">
            <img src={project.hero.image} alt={project.hero.title} className="card-image" />
            <div className="card-content">
                <h3 className="card-title">{project.hero.title}</h3>
                <p className="card-description">{project.hero.description}</p>
                <div className="card-tags">
                    {project.stack.map((tech) => (
                        <span key={tech} className="tag">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="card-links">
                    {project.hero.demoLink && (
                        <a href={project.hero.demoLink} target="_blank" rel="noopener noreferrer" className="btn primary">
                            View Demo
                        </a>
                    )}
                    {project.hero.githubLink && (
                        <a href={project.hero.githubLink} target="_blank" rel="noopener noreferrer" className="btn secondary">
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Card;