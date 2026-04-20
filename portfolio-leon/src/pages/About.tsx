function About() {
    return (
        <div className="about">
            <div className="reveal-up" data-delay="1">
                <span className="section-eyebrow">About me</span>
                <h2 className="section-heading">Design roots,<br />engineering mindset.</h2>
            </div>

            <div className="about-layout">
                <div className="about-body reveal-up" data-delay="2">
                    <p>
                        I started in graphic design and UX/UI before pivoting to engineering —
                        which means I care equally about how something works and how it feels.
                        After training in frontend React development I'm now pursuing full-stack,
                        working toward owning the entire lifecycle of a web application.
                    </p>
                    <p style={{ marginTop: "1.25rem" }}>
                        Curious, detail-oriented, and genuinely passionate about clean interfaces.
                        I'm looking for a work-study opportunity where I can learn on real projects
                        and grow as a long-term part of a team.
                    </p>
                    <div className="hero-actions" style={{ marginTop: "2rem" }}>
                        <a href="#contact" className="btn primary">Let's talk</a>
                        <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn secondary">
                            Download CV
                        </a>
                    </div>
                </div>

                <div className="about-picture reveal-right" data-delay="3">
                    <img src="/profile.png" alt="Leon Decarte" />
                </div>
            </div>
        </div>
    );
}

export default About;