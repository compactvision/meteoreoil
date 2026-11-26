import { createInertiaApp, router } from '@inertiajs/react';

const reducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

void createInertiaApp({
    title: (title) => title || 'MÉTÉORE Lubrifiants',
    progress: {
        color: '#c23427',
    },
});

router.on('before', ({ detail }) => {
    const state = window.history.state;
    if (detail.visit.method !== 'get' || !state?.page) return;

    // Inertia batches scroll events. Save the outgoing position if a visit
    // starts before the last event has reached the history entry.
    const position = { top: window.scrollY, left: window.scrollX };
    if (
        state.documentScrollPosition?.top !== position.top ||
        state.documentScrollPosition?.left !== position.left
    ) {
        window.history.replaceState(
            { ...state, documentScrollPosition: position },
            '',
        );
    }
});

router.on('navigate', ({ detail }) => {
    if (detail.type === 'history' && location.hash) {
        // A fragment can be reached and left before Inertia saves its scroll.
        // Run after Inertia's own restoration and use the anchor as a fallback.
        const { href, hash } = location;
        requestAnimationFrame(() => {
            if (
                location.href === href &&
                !window.history.state?.documentScrollPosition
            ) {
                document
                    .getElementById(hash.slice(1))
                    ?.scrollIntoView({ behavior: 'instant' });
            }
        });
    }

    if (detail.type === 'initial' || reducedMotion()) return;

    // Animate the live page so links remain clickable during the fade.
    document
        .querySelector('.premium-site main')
        ?.animate?.([{ opacity: 0.68 }, { opacity: 1 }], {
            duration: 300,
            easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)',
        });
});
