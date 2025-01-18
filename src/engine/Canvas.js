export const canvas = {
    foreground: document.getElementById('foreground-canvas'),
    background: document.getElementById('background-canvas'),
    background3D: document.getElementById('background-3d-canvas'),
}

export const ctx = {
    foreground: canvas.foreground.getContext("2d"),
    background: canvas.background.getContext("2d"),
    background3D: canvas.background3D.getContext("2d"),
}