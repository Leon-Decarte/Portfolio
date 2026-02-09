import { projectsData } from "../data/projects";
import Card from "../components/Card";

function Projects() {
    return (
        <div className="projects-page">
            <h2>All Projects</h2>
            <div className="project-cards">
                {projectsData.map((project) => (
                    <Card key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}

export default Projects;