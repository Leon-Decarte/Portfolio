function Hero() {
    return (
        <div className="hero-content">
            <h1 data-text="I LISTEN. I DESIGN. I BUILD.">
                I LISTEN. <br /> I DESIGN.<br />  I BUILD.
            </h1>

            <p className="hero-subtitle">
                Fullstack-oriented developer with a strong UX/UI background, focused on creating clean, intuitive React applications with
                <span> Java & JavaScript</span>
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