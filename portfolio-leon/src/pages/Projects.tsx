function Projects() {
    return <div>
            <h2>Projects</h2>
                <div className="project-cards">
                    <div className="card">Project 1</div>
                    <div className="card">Project 2</div>
                    <div className="card">Project 3</div>
                </div>
                <button onClick={() => window.location.href = '/projects'} className="btn primary">
                    Show More
                </button>
    </div>
};

export default Projects