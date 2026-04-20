import { useEffect } from "react";

const SELECTORS = ".reveal, .reveal-up, .reveal-left, .reveal-right";

function observeAll(observer: IntersectionObserver) {
    document.querySelectorAll(SELECTORS).forEach((el) => {
        // Only observe elements that haven't been revealed yet
        if (!el.classList.contains("visible")) {
            observer.observe(el);
        }
    });
}

export function useScrollReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        const delay = el.dataset.delay
                            ? Number(el.dataset.delay) * 0.08
                            : 0;
                        el.style.transitionDelay = `${delay}s`;
                        el.classList.add("visible");
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
        );

        observeAll(observer);

        // Re-scan DOM when new elements are added (e.g. "show more" reveals cards)
        const mutation = new MutationObserver(() => observeAll(observer));
        mutation.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutation.disconnect();
        };
    }, []);
}