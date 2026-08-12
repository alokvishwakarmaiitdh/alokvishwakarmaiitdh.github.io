import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

// Deterministic hash so pulse paths / attention weights are stable per frame
const hash = (n: number) => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
};

type Palette = {
    line: (a: number) => string;
    pulse: (a: number) => string;
    text: (a: number) => string;
};

/* Layered MLP: nodes, dense edges, pulses traveling input -> output */
function drawMLP(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, C: Palette) {
    const layers = [4, 6, 5, 3];
    const lw = 64 * s;
    const vh = 26 * s;
    const pos = layers.map((n, li) =>
        Array.from({ length: n }, (_, i) => ({
            x: x + li * lw,
            y: y + (i - (n - 1) / 2) * vh,
        }))
    );

    ctx.lineWidth = 1;
    ctx.strokeStyle = C.line(0.16);
    ctx.beginPath();
    for (let li = 0; li < layers.length - 1; li++)
        for (const a of pos[li])
            for (const b of pos[li + 1]) {
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
            }
    ctx.stroke();

    ctx.fillStyle = C.line(0.55);
    for (const layer of pos)
        for (const p of layer) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3 * s, 0, TAU);
            ctx.fill();
        }

    // Pulses: each picks a node path through the net per cycle
    const nSeg = layers.length - 1;
    for (let k = 0; k < 5; k++) {
        const tt = t / 3.2 + k / 5;
        const cycle = Math.floor(tt);
        const segF = (tt - cycle) * nSeg;
        const seg = Math.min(nSeg - 1, Math.floor(segF));
        const f = segF - seg;
        const a = pos[seg][Math.floor(hash(k * 101 + cycle * 7 + seg * 3) * layers[seg])];
        const b = pos[seg + 1][Math.floor(hash(k * 173 + cycle * 11 + seg * 5) * layers[seg + 1])];
        ctx.fillStyle = C.pulse(0.9);
        ctx.beginPath();
        ctx.arc(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, 2.4 * s, 0, TAU);
        ctx.fill();
        if (f > 0.75) {
            ctx.strokeStyle = C.pulse(0.6 * (f - 0.75) * 4);
            ctx.beginPath();
            ctx.arc(b.x, b.y, 5 * s, 0, TAU);
            ctx.stroke();
        }
    }

    ctx.fillStyle = C.text(0.4);
    ctx.font = `${11 * s}px "JetBrains Mono", monospace`;
    ctx.fillText("mlp", x, y + (Math.max(...layers) / 2) * vh + 24 * s);
}

function arrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, s: number) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const ah = 5 * s;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - ah * Math.cos(ang - 0.4), y2 - ah * Math.sin(ang - 0.4));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - ah * Math.cos(ang + 0.4), y2 - ah * Math.sin(ang + 0.4));
    ctx.stroke();
}

/* CNN: input grid + scanning 3x3 kernel -> stacked feature maps -> dense nodes */
function drawCNN(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, C: Palette) {
    const n = 6;
    const cell = 11 * s;
    const gw = n * cell;

    ctx.lineWidth = 1;
    ctx.strokeStyle = C.line(0.28);
    for (let i = 0; i <= n; i++) {
        ctx.beginPath();
        ctx.moveTo(x + i * cell, y);
        ctx.lineTo(x + i * cell, y + gw);
        ctx.moveTo(x, y + i * cell);
        ctx.lineTo(x + gw, y + i * cell);
        ctx.stroke();
    }

    // Scanning kernel
    const steps = (n - 2) * (n - 2);
    const idx = Math.floor(t * 3) % steps;
    const kx = idx % (n - 2);
    const ky = Math.floor(idx / (n - 2));
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = C.pulse(0.85);
    ctx.strokeRect(x + kx * cell, y + ky * cell, 3 * cell, 3 * cell);

    // Feature maps (stacked planes)
    const fx = x + gw + 30 * s;
    const fy = y + 10 * s;
    const ms = 3.2 * cell;
    ctx.lineWidth = 1;
    for (let j = 2; j >= 0; j--) {
        ctx.strokeStyle = C.line(0.32 - j * 0.08);
        ctx.strokeRect(fx + j * 6 * s, fy - j * 6 * s + 12 * s, ms, ms);
    }
    // Activated cell on the front map, mirroring the kernel position
    const fcell = ms / (n - 2);
    ctx.fillStyle = C.pulse(0.7);
    ctx.fillRect(fx + kx * fcell + 1, fy + 12 * s + ky * fcell + 1, fcell - 2, fcell - 2);

    ctx.strokeStyle = C.line(0.4);
    arrow(ctx, x + gw + 4 * s, y + gw / 2, fx - 6 * s, y + gw / 2, s);

    // Dense head
    const dx = fx + ms + 12 * s + 26 * s;
    ctx.strokeStyle = C.line(0.4);
    arrow(ctx, fx + ms + 16 * s, y + gw / 2, dx - 10 * s, y + gw / 2, s);
    ctx.fillStyle = C.line(0.55);
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(dx, y + gw / 2 + (i - 1) * 18 * s, 3 * s, 0, TAU);
        ctx.fill();
    }

    ctx.fillStyle = C.text(0.4);
    ctx.font = `${11 * s}px "JetBrains Mono", monospace`;
    ctx.fillText("conv2d", x, y + gw + 22 * s);
}

/* RNN: cell chain with recurrent loops and a signal running through */
function drawRNN(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, C: Palette) {
    const cw = 40 * s;
    const ch = 30 * s;
    const gap = 72 * s;
    const cells = [0, 1, 2].map((i) => x + i * gap);

    ctx.lineWidth = 1;
    for (const cx of cells) {
        ctx.strokeStyle = C.line(0.45);
        ctx.strokeRect(cx - cw / 2, y - ch / 2, cw, ch);

        // Recurrent loop (rotating dashes)
        ctx.save();
        ctx.setLineDash([5 * s, 5 * s]);
        ctx.lineDashOffset = -t * 22;
        ctx.strokeStyle = C.line(0.5);
        ctx.beginPath();
        ctx.arc(cx, y - ch / 2 - 11 * s, 9 * s, 0.25 * Math.PI, 2.4 * Math.PI);
        ctx.stroke();
        ctx.restore();

        // Input from below, output above (short ticks)
        ctx.strokeStyle = C.line(0.35);
        arrow(ctx, cx, y + ch / 2 + 22 * s, cx, y + ch / 2 + 4 * s, s);

        ctx.fillStyle = C.line(0.5);
        ctx.font = `${11 * s}px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.fillText("h", cx, y + 4 * s);
        ctx.textAlign = "left";
    }

    for (let i = 0; i < cells.length - 1; i++) {
        ctx.strokeStyle = C.line(0.4);
        arrow(ctx, cells[i] + cw / 2 + 2 * s, y, cells[i + 1] - cw / 2 - 4 * s, y, s);
    }

    // Signal traveling along the chain
    const phase = (t * 0.45) % 1;
    const px = cells[0] + phase * (cells[2] - cells[0]);
    ctx.fillStyle = C.pulse(0.9);
    ctx.beginPath();
    ctx.arc(px, y, 2.6 * s, 0, TAU);
    ctx.fill();

    ctx.fillStyle = C.text(0.4);
    ctx.font = `${11 * s}px "JetBrains Mono", monospace`;
    ctx.fillText("rnn", x - cw / 2, y + ch / 2 + 44 * s);
}

/* Transformer self-attention: two token rows, animated attention weights */
function drawAttention(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, t: number, C: Palette) {
    const tokens = 7;
    const size = 9 * s;
    const hgap = 25 * s;
    const rowGap = 78 * s;

    const tx = (i: number) => x + i * hgap;

    // Faint all-pairs lines
    ctx.lineWidth = 0.75;
    ctx.strokeStyle = C.line(0.08);
    ctx.beginPath();
    for (let i = 0; i < tokens; i++)
        for (let j = 0; j < tokens; j++) {
            ctx.moveTo(tx(i) + size / 2, y + size);
            ctx.lineTo(tx(j) + size / 2, y + rowGap);
        }
    ctx.stroke();

    // Active query token attends to all keys with varying weights
    const period = 1.8;
    const q = Math.floor(t / period) % tokens;
    const env = Math.sin(((t % period) / period) * Math.PI);
    for (let j = 0; j < tokens; j++) {
        const w = hash(q * 13 + j * 7);
        ctx.lineWidth = (0.5 + 2 * w) * s;
        ctx.strokeStyle = C.pulse((0.1 + 0.5 * w) * env);
        ctx.beginPath();
        ctx.moveTo(tx(q) + size / 2, y + size);
        ctx.lineTo(tx(j) + size / 2, y + rowGap);
        ctx.stroke();
    }

    ctx.lineWidth = 1;
    for (let i = 0; i < tokens; i++) {
        const active = i === q;
        ctx.strokeStyle = C.line(active ? 0.85 : 0.4);
        ctx.strokeRect(tx(i), y, size, size);
        ctx.strokeStyle = C.line(0.4);
        ctx.strokeRect(tx(i), y + rowGap, size, size);
        if (active) {
            ctx.fillStyle = C.pulse(0.35 * env);
            ctx.fillRect(tx(i), y, size, size);
        }
    }

    ctx.fillStyle = C.text(0.4);
    ctx.font = `${11 * s}px "JetBrains Mono", monospace`;
    ctx.fillText("self-attention", x, y + rowGap + size + 22 * s);
}

type Diagram = "mlp" | "cnn" | "rnn" | "att";
type Instance = { kind: Diagram; xf: number; yf: number };

// Positions live in a parallax layer that scrolls at PARALLAX x page speed.
// xf = fraction of viewport width, yf = fraction of the layer's height.
const PARALLAX = 0.3;

const DESKTOP_INSTANCES: Instance[] = [
    { kind: "rnn", xf: 0.05, yf: 0.02 },
    { kind: "cnn", xf: 0.74, yf: 0.07 },
    { kind: "mlp", xf: 0.04, yf: 0.2 },
    { kind: "att", xf: 0.74, yf: 0.3 },
    { kind: "cnn", xf: 0.05, yf: 0.44 },
    { kind: "mlp", xf: 0.76, yf: 0.54 },
    { kind: "rnn", xf: 0.72, yf: 0.68 },
    { kind: "att", xf: 0.05, yf: 0.76 },
    { kind: "mlp", xf: 0.04, yf: 0.92 },
    { kind: "cnn", xf: 0.74, yf: 0.97 },
];

const MOBILE_INSTANCES: Instance[] = [
    { kind: "cnn", xf: 0.12, yf: 0.04 },
    { kind: "att", xf: 0.14, yf: 0.3 },
    { kind: "mlp", xf: 0.15, yf: 0.56 },
    { kind: "rnn", xf: 0.2, yf: 0.82 },
];

export function NeuralBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let raf = 0;

        // Theme tokens are raw HSL triples ("266 85% 65%")
        let primary = "266 85% 65%";
        let foreground = "220 20% 95%";
        let dim = 1;

        const readTheme = () => {
            const styles = getComputedStyle(document.documentElement);
            primary = styles.getPropertyValue("--primary").trim() || primary;
            foreground = styles.getPropertyValue("--foreground").trim() || foreground;
            dim = document.documentElement.classList.contains("dark") ? 1 : 0.8;
        };
        readTheme();

        const themeObserver = new MutationObserver(readTheme);
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        const draw = (t: number) => {
            ctx.clearRect(0, 0, width, height);

            const C: Palette = {
                line: (a) => `hsl(${primary} / ${(a * dim).toFixed(3)})`,
                pulse: (a) => `hsl(${primary} / ${(a * dim).toFixed(3)})`,
                text: (a) => `hsl(${foreground} / ${(a * dim).toFixed(3)})`,
            };

            const desktop = width >= 768;
            const s = desktop ? Math.min(1.4, Math.max(0.95, width / 1150)) : 0.85;
            const instances = desktop ? DESKTOP_INSTANCES : MOBILE_INSTANCES;

            // Diagrams live in a slower-scrolling parallax layer
            const scrollY = window.scrollY;
            const docH = document.documentElement.scrollHeight;
            const maxScroll = Math.max(1, docH - height);
            const layerSpan = height + PARALLAX * maxScroll;

            instances.forEach((inst, i) => {
                const x = inst.xf * width;
                const y = 70 + inst.yf * (layerSpan - 380) - scrollY * PARALLAX;
                if (y < -300 || y > height + 150) return; // offscreen
                const tt = t + i * 1.7; // desynchronize animations
                if (inst.kind === "mlp") drawMLP(ctx, x, y + 80 * s, s, tt, C);
                else if (inst.kind === "cnn") drawCNN(ctx, x, y, s, tt, C);
                else if (inst.kind === "rnn") drawRNN(ctx, x + 30 * s, y + 30 * s, s, tt, C);
                else drawAttention(ctx, x, y, s, tt, C);
            });
        };

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const loop = (now: number) => {
            if (!document.hidden) draw(now / 1000);
            raf = requestAnimationFrame(loop);
        };

        const onResize = () => {
            resize();
            if (reducedMotion) draw(0);
        };
        window.addEventListener("resize", onResize);

        const onScroll = () => draw(0);
        if (reducedMotion) {
            // No animation loop, but parallax still follows scroll
            window.addEventListener("scroll", onScroll, { passive: true });
            draw(0);
        } else {
            raf = requestAnimationFrame(loop);
        }

        return () => {
            cancelAnimationFrame(raf);
            themeObserver.disconnect();
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 -z-10 pointer-events-none"
        />
    );
}
