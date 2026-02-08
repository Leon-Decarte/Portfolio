function Hero() {
    return (
        <div className="hero-content">
            <h1>
                I listen. I design. I build.
            </h1>

            <p className="hero-subtitle">
                Fullstack-oriented developer with a strong UX/UI background, focused on creating clean, intuitive React applications with
                <span> Java & JavaScript</span>
            </p>

            <p className="hero-subtitle muted">
                Looking for an apprenticeship to deepen my skills and contribute to meaningful projects.
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
    );
}

export default Hero;