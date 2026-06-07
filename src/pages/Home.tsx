import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import About from "./About";
import Skills from "./Skills";
import Hero from "./Hero";
import Contact from "./Contact";
import Projects from "./Projects";
import ScrollFigure from "../components/ScrollFigure"; // adjust path if needed
import { useWheelSnap } from "../hooks/useWheelSnap"; // ← AJOUTE CETTE LIGNE

function Home() {
    const location = useLocation();
    useScrollReveal();
    useWheelSnap(); // ← AJOUTE CETTE LIGNE

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


            {/*
                #intro is position:relative — the figure column is
                position:absolute inside it. No fixed positioning anywhere.
            */}
            <section id="intro" data-theme="even">
                {/* Left: hero + about. Right padding reserves space for the figure */}
                <div className="intro-text">
                    <section id="hero" >
                        <Hero />
                    </section>
                    <section id="about" >
                        <About />
                    </section>
                </div>

                {/* Figure: absolute column on the right, sticky frame inside */}
                <ScrollFigure />
            </section>

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
