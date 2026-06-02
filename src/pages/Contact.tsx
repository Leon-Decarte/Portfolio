function Contact() {
    return (
        <div className="contact-cta">
            <div className="contact-cta-inner reveal-up" data-delay="1">
                <h2 className="contact-cta-heading">
                    Ready to build<br />something great together?
                </h2>
                <p className="contact-cta-sub">
                    Looking forward to connecting! Feel free to reach out.
                </p>
                <div className="contact-cta-actions">
                    <a href="mailto:leondecarte@gmail.com" className="btn contact-btn-primary">
                        Send an email
                    </a>
                    <a
                        href="https://www.linkedin.com/in/l%C3%A9on-decarte-398bb3245/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn contact-btn-ghost"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/Leon-Decarte"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn contact-btn-ghost"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Contact;
