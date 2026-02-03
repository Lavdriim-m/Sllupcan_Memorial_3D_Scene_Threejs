export function createSizes() {
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        update() {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;
        },
    };
    return sizes;
}
