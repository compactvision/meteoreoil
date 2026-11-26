import { useEffect, type RefObject } from 'react';

const revealSelector = '[data-reveal]';

export function useScrollReveal(
    site: RefObject<HTMLDivElement | null>,
    page: string,
) {
    useEffect(() => {
        if (!site.current || !('IntersectionObserver' in window)) return;
        const root = site.current;
        const motion = matchMedia('(prefers-reduced-motion: reduce)');

        const seen = new WeakSet<Element>();
        const pending = new Set<Element>();
        const observer = new IntersectionObserver((entries) => {
            for (const { target, isIntersecting } of entries) {
                if (!isIntersecting || !pending.delete(target)) continue;
                seen.add(target);
                observer.unobserve(target);
                target.setAttribute('data-reveal-state', 'visible');
            }
        });

        function observe(elements: Iterable<Element>) {
            // Leave anything already reached visible, including deep links.
            const candidates = Array.from(elements).filter(
                (element) => !seen.has(element) && !pending.has(element),
            );
            const offscreen = candidates.filter((element) => {
                if (element.getBoundingClientRect().top >= window.innerHeight)
                    return true;
                seen.add(element);
                return false;
            });
            for (const element of offscreen) {
                pending.add(element);
                element.setAttribute('data-reveal-state', 'pending');
                observer.observe(element);
            }
        }

        const changes = new MutationObserver((records) => {
            const added = new Set<Element>();
            for (const { addedNodes } of records) {
                for (const node of addedNodes) {
                    if (!(node instanceof Element) || !root.contains(node))
                        continue;
                    if (node.matches(revealSelector)) added.add(node);
                    node.querySelectorAll(revealSelector).forEach((element) =>
                        added.add(element),
                    );
                }
            }
            for (const element of pending) {
                if (root.contains(element)) continue;
                observer.unobserve(element);
                element.removeAttribute('data-reveal-state');
                pending.delete(element);
            }
            observe(added);
        });

        function stopObserving() {
            observer.disconnect();
            changes.disconnect();
            pending.clear();
            root.querySelectorAll('[data-reveal-state]').forEach((element) =>
                element.removeAttribute('data-reveal-state'),
            );
        }

        function syncMotion() {
            stopObserving();
            if (motion.matches) return;

            observe(root.querySelectorAll(revealSelector));
            changes.observe(root, { childList: true, subtree: true });
        }

        syncMotion();
        motion.addEventListener('change', syncMotion);
        return () => {
            motion.removeEventListener('change', syncMotion);
            stopObserving();
        };
    }, [site, page]);
}
