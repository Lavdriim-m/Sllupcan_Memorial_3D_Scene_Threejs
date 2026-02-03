export function createUI(container) {
    const panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.style.left = "16px";
    panel.style.bottom = "16px";
    panel.style.maxWidth = "360px";
    panel.style.padding = "12px 14px";
    panel.style.borderRadius = "12px";
    panel.style.background = "rgba(0,0,0,0.65)";
    panel.style.color = "white";
    panel.style.fontSize = "14px";
    panel.style.lineHeight = "1.35";
    panel.style.display = "none";
    panel.style.backdropFilter = "blur(6px)";
    panel.style.userSelect = "none";
    container.appendChild(panel);

    return {
        show(text) {
            panel.textContent = text;
            panel.style.display = "block";
        },
        hide() {
            panel.style.display = "none";
        },
    };
}
