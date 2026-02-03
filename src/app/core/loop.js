export function startLoop(fn) {
    let rafId = null;

    const tick = () => {
        fn();
        rafId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
        if (rafId) cancelAnimationFrame(rafId);
    };
}