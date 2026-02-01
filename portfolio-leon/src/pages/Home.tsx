import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import About from "./About";
import Skills from "./Skills";
import Hero from "./Hero";

function Home() {
    const location = useLocation();

    useEffect(() => {
  // Always start at top
  window.scrollTo(0, 0);

  if (location.state?.scrollTo) {
    const section = document.getElementById(location.state.scrollTo);

    if (section) {
      const navHeight = 60;
      const offsetTop = section.offsetTop - navHeight;

      setTimeout(() => {
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }, 50);
    }

    // 🔥 IMPORTANT: clear the state after using it
    window.history.replaceState({}, document.title);
  }
}, [location.key]);

    


    return (
        <main className="home">
            <section className="hero" id="home">
                <Hero />
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