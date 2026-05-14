import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
    const navRef = useRef<HTMLElement>(null);

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleScrollToSection = (
        sectionId: string,
        event: React.MouseEvent
    ) => {
        event.preventDefault();

        setMobileOpen(false);

        if (window.location.pathname === "/") {
            const section = document.getElementById(sectionId);

            if (section) {
                const navHeight = navRef.current?.offsetHeight ?? 64;

                window.scrollTo({
                    top: section.offsetTop - navHeight,
                    behavior: "smooth"
                });
            }
        } else {
            navigate("/", { state: { scrollTo: sectionId } });
        }
    };

    const links = [
        { label: "Home", id: "hero" },
        { label: "About", id: "about" },
        { label: "Skills", id: "skills" },
        { label: "Projects", id: "projects-preview" },
        { label: "Contact", id: "contact" }
    ];

    return (
        <nav
            className={`nav${scrolled ? " scrolled" : ""}`}
            ref={navRef}
        >
            <span className="nav-logo">Leon</span>

            <button
                className={`nav-burger ${mobileOpen ? "active" : ""}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
            >
                <span />
                <span />
            </button>

            <ul className={`nav-links ${mobileOpen ? "open" : ""}`}>
                {links.map(({ label, id }) => (
                    <li key={id}>
                        <a
                            href={`#${id}`}
                            className="nav-link"
                            onClick={(e) =>
                                handleScrollToSection(id, e)
                            }
                        >
                            <span className="nav-link-roll">
                                <span>{label}</span>
                                <span>{label}</span>
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Nav;