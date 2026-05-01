function Hero() {
    return (
        <div className="hero-layout">
            {/* Left: copy */}
            <div className="hero-content">
                <h1 className="hero-title reveal-up" data-delay="2">
                    I LISTEN<br />
                    I DESIGN.<br />
                    <em>I BUILD.</em>
                </h1>

                <p className="hero-subtitle reveal-up" data-delay="3">
                    React developer with a strong UX background, building clean,
                    intuitive interfaces backed by{" "}
                    <strong>Java & Spring Boot</strong>.
                </p>

                <div className="hero-actions reveal-up" data-delay="4">
                    <a href="#projects-preview" className="btn primary">
                        See my work
                    </a>
                    <a href="#contact" className="btn secondary">
                        Get in touch
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Hero;