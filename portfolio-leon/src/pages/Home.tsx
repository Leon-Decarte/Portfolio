import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import About from "./About";
import Skills from "./Skills";
import Hero from "./Hero";
import Contact from "./Contact";
import Projects from "./Projects";
import ScrollFigure from "../components/ScrollFigure"; // adjust path if needed

function Home() {
    const location = useLocation();
    useScrollReveal();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (location.state?.scrollTo) {
            const section = document.getElementById(location.state.scrollTo);
            if (section) {
                setTimeout(() => {
                    window.scrollTo({ top: section.offsetTop - 64, behavior: "smooth" });
                }, 50);
            }
            window.history.replaceState({}, document.title);
        }
    }, [location.key]);

    return (
        <main className="home">


            <div id="intro" className="intro-layout">
                <div className="intro-text">
                    <section id="home" data-theme="odd">
                        <Hero />
                    </section>

                    <section id="about" data-theme="even">
                        <About />
                    </section>
                </div>

                <div className="intro-visual">
                    <ScrollFigure />
                </div>
            </div>

            <section id="skills" data-theme="odd">
                <Skills />
            </section>

            <section id="projects-preview" data-theme="even">
                <Projects />
            </section>

            {/* Full-bleed contact — lives outside section so no max-width clips it */}
            <div id="contact" style={{ width: "100%" }}>
                <Contact />
            </div>
        </main>
    );
}

export default Home;
