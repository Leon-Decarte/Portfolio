import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
    const navRef = useRef<HTMLElement>(null);
    const [navHeight, setNavHeight] = useState(0);
    const navigate = useNavigate();

    // Measure nav height on mount
    useEffect(() => {
        if (navRef.current) {
            setNavHeight(navRef.current.offsetHeight);
        }
    }, []);

    // Handle click: Scroll on Home, navigate + scroll from other pages
    const handleScrollToSection = (sectionId: string, event: React.MouseEvent) => {
        event.preventDefault(); // Prevent URL change
        if (window.location.pathname === "/") {
            // On Home: Scroll directly
            const section = document.getElementById(sectionId);
            if (section) {
                // Center the section in the viewport
                const offsetTop = section.offsetTop + (section.offsetHeight / 2) - (window.innerHeight + navHeight) / 2;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                });
            }
        } else {
            // From other pages: Navigate to Home with section in state
            navigate("/", { state: { scrollTo: sectionId } });
        }
    };

    return (
        <nav className="nav" ref={navRef}>
            <div className="nav-logo">Leon</div>
            <ul className="nav-links">
                <li>
                    <a
                        href="#home"
                        onClick={(e) => handleScrollToSection("home", e)}
                        className="nav-link"
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="#about"
                        onClick={(e) => handleScrollToSection("about", e)}
                        className="nav-link"
                    >
                        About
                    </a>
                </li>
                <li>
                    <a
                        href="#skills"
                        onClick={(e) => handleScrollToSection("skills", e)}
                        className="nav-link"
                    >
                        Skills
                    </a>
                </li>
                <li>
                    <a
                        href="#projects-preview"
                        onClick={(e) => handleScrollToSection("projects-preview", e)}
                        className="nav-link"
                    >
                        Projects
                    </a>
                </li>
                <li>
                    <a
                        href="#contact"
                        onClick={(e) => handleScrollToSection("contact", e)}
                        className="nav-link"
                    >
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;