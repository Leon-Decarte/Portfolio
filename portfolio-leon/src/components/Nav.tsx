import { HashLink } from "react-router-hash-link";
import { useEffect, useState } from "react";

function Nav() {
    const [activeSection, setActiveSection] = useState("home");

    // Scrollspy logic using scroll event (more reliable)
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section[id]");
            let current = "home"; // Default to home
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                // Check if section is in the middle of the viewport
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    current = section.id;
                }
            });
            setActiveSection(current);
        };

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);
        // Run once on mount to set initial active section
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check if we're on Home page (for active class)
    const isHomePage = window.location.pathname === "/";

    return (
        <nav className="nav">
            <div className="nav-logo">Leon</div>
            <ul className="nav-links">
                <li>
                    <HashLink
                        to="/#home"
                        className={isHomePage && activeSection === "home" ? "nav-link active" : "nav-link"}
                        smooth
                    >
                        Home
                    </HashLink>
                </li>
                <li>
                    <HashLink
                        to="/#about"
                        className={isHomePage && activeSection === "about" ? "nav-link active" : "nav-link"}
                        smooth
                    >
                        About
                    </HashLink>
                </li>
                <li>
                    <HashLink
                        to="/#skills"
                        className={isHomePage && activeSection === "skills" ? "nav-link active" : "nav-link"}
                        smooth
                    >
                        Skills
                    </HashLink>
                </li>
                <li>
                    <HashLink
                        to="/#projects-preview"
                        className={isHomePage && activeSection === "projects-preview" ? "nav-link active" : "nav-link"}
                        smooth
                    >
                        Projects
                    </HashLink>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;