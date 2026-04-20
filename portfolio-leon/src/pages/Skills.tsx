const skillGroups = [
    {
        title: "UX / UI Design",
        skills: [
            "Figma · Photoshop · Illustrator",
            "User research & empathy mapping",
            "Wireframing & prototyping",
            "UX testing & iteration",
        ],
    },
    {
        title: "Frontend",
        skills: [
            "HTML5 · CSS3 · Sass",
            "JavaScript · TypeScript",
            "React · Angular",
            "REST APIs · Git",
        ],
    },
    {
        title: "Backend",
        skills: [
            "Java · Spring Boot",
            "SQL databases",
            "Auth & data management",
            "Docker · CI/CD · Testing",
        ],
    },
];

function Skills() {
    return (
        <div className="skills">
            <div className="reveal-up" data-delay="1">
                <span className="section-eyebrow">Expertise</span>
                <h2 className="section-heading">What I bring<br />to a project.</h2>
            </div>

            <div className="skills-grid">
                {skillGroups.map((group, i) => (
                    <div
                        key={group.title}
                        className="skill-card reveal-up"
                        data-delay={String(i + 2)}
                    >
                        <p className="skill-card-title">{group.title}</p>
                        <ul className="skill-list">
                            {group.skills.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Skills;