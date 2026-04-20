function Hero() {
    return (
        <div className="hero-layout">
            {/* Left: copy */}
            <div className="hero-content">
                <span className="hero-tag reveal-up" data-delay="1">
                    Fullstack Developer · UX/UI
                </span>

                <h1 className="hero-title reveal-up" data-delay="2">
                    I listen.<br />
                    I design.<br />
                    I <em>build.</em>
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

            {/* Right: floating UI preview card */}
            <div className="hero-visual reveal-right" data-delay="3">
                <div className="hero-card">
                    {/* Card header */}
                    <div className="hcard-header">
                        <div className="hcard-avatar">LD</div>
                        <div>
                            <p className="hcard-name">Leon Decarte</p>
                            <p className="hcard-role">Fullstack · UX Engineer</p>
                        </div>
                        <span className="hcard-badge">Open to work</span>
                    </div>

                    <div className="hcard-divider" />

                    {/* Stat row */}
                    <div className="hcard-stats">
                        <div className="hcard-stat">
                            <span className="hcard-stat-value">4+</span>
                            <span className="hcard-stat-label">Projects</span>
                        </div>
                        <div className="hcard-stat">
                            <span className="hcard-stat-value">2</span>
                            <span className="hcard-stat-label">Years exp.</span>
                        </div>
                        <div className="hcard-stat">
                            <span className="hcard-stat-value">3</span>
                            <span className="hcard-stat-label">Stacks</span>
                        </div>
                    </div>

                    <div className="hcard-divider" />

                    {/* Stack pills */}
                    <div className="hcard-stack-label">Core stack</div>
                    <div className="hcard-stack">
                        {["React", "TypeScript", "Java", "Spring Boot", "Figma", "CSS"].map((s) => (
                            <span key={s} className="hcard-pill">{s}</span>
                        ))}
                    </div>

                    <div className="hcard-divider" />

                    {/* Mini activity bar */}
                    <div className="hcard-stack-label">Currently building</div>
                    <div className="hcard-activity">
                        <div className="hcard-activity-dot" />
                        <span className="hcard-activity-text">Portfolio v2 — React + Vite</span>
                    </div>
                </div>

                {/* Floating accent orb behind the card */}
                <div className="hero-orb" />
            </div>
        </div>
    );
}

export default Hero;