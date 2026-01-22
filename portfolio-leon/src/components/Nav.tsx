import { NavLink } from "react-router-dom";

type NavLinkItem = {
    label: string;
    path: string;
};

const navLinks: NavLinkItem[] = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
];

function Nav() {
    return (
        <nav className="nav">
            <div className="nav-logo">Leon</div>

            <ul className="nav-links">
                {navLinks.map((link) => (
                    <li key={link.path}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Nav;
