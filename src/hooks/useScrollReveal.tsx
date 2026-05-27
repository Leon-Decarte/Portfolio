import { useEffect } from "react";

const SELECTORS = ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-clip";

function observeAll(observer: IntersectionObserver) {
    document.querySelectorAll(SELECTORS).forEach((el) => {
        if (!el.classList.contains("visible")) observer.observe(el);
    });
}

export function useScrollReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        const d = el.dataset.delay;
                        el.style.transitionDelay = d ? `${Number(d) * 0.08}s` : "0s";
                        el.classList.add("visible");
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
        );

        observeAll(observer);

        const mutation = new MutationObserver(() => observeAll(observer));
        mutation.observe(document.body, { childList: true, subtree: true });

        return () => { observer.disconnect(); mutation.disconnect(); };
    }, []);
}