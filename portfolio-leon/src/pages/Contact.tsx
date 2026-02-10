function Contact() {
    return (
        <div className="contact">
            <h2>Get In Touch</h2>
            <p className="contact-subtitle">Feel free to reach out to me on any of these platforms:</p>

            <div className="contact-links">
                <a href="mailto:leondecarte@gmail.com" className="contact-link">
                    <span className="contact-text">Email</span>
                </a>

                <a href="https://www.linkedin.com/in/l%C3%A9on-decarte-398bb3245/" target="_blank" rel="noopener noreferrer" className="contact-link">
                    <span className="contact-text">LinkedIn</span>
                </a>

                <a href="https://github.com/Leon-Decarte" target="_blank" rel="noopener noreferrer" className="contact-link">
                    <span className="contact-text">GitHub</span>
                </a>
            </div>
        </div>
    );
}

export default Contact;