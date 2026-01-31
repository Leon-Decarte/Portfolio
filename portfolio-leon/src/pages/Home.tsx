import About from "./About";
import Skills from "./Skills";

function Home() {
    return (
        <main className="home">
            <section className="hero" id="home">
                <div className="hero-content">
                    <h1>
                        Développeur Front-End
                        <span> React & TypeScript</span>
                    </h1>

                    <p className="hero-subtitle">
                        Je conçois des interfaces modernes, orientées utilisateur,
                        avec une approche produit et UX.
                    </p>

                    <p className="hero-subtitle muted">
                        Actuellement en recherche d’une alternance en développement web.
                    </p>

                    <div className="hero-actions">
                        <a href="#projects-preview" className="btn primary">
                            Voir mes projets
                        </a>

                        <a href="/contact" className="btn secondary">
                            Me contacter
                        </a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="gradient-orb" />
                </div>
            </section>
            
            <section id="about">
                <About />
            </section>

            <section id="skills">
                <Skills />
            </section>

            <section id="projects-preview">
                <h2>Projects</h2>
                {/* Add 3 project cards here, e.g., <ProjectCard /> components */}
                <div className="project-cards">
                    <div className="card">Project 1</div>
                    <div className="card">Project 2</div>
                    <div className="card">Project 3</div>
                </div>
                <button onClick={() => window.location.href = '/projects'} className="btn primary">
                    Show More
                </button>
            </section>
        </main>
    );
}

export default Home;