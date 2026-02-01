// filepath: c:\Users\radim\Documents\Mansour\Personal site\portfolio-leon\src\pages\Hero.tsx
function Hero() {
    return (
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
    );
}

export default Hero;