import { motion } from "framer-motion";

const CinematicOverlay = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Film Grain */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/1999/xlink" className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.65"
                            numOctaves="3"
                            stitchTiles="stitch"
                        />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Dynamic Vignette */}
            <div className="absolute inset-0 cinematic-vignette opacity-60" />

            {/* Subtle Scanlines */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                    backgroundSize: "100% 4px, 3px 100%"
                }}
            />

            {/* Post-processing noise animation */}
            <motion.div
                className="absolute inset-0 opacity-[0.015]"
                animate={{
                    x: [-1, 1, -1],
                    y: [1, -1, 1],
                }}
                transition={{
                    duration: 0.1,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
                    backgroundSize: "200px"
                }}
            />
        </div>
    );
};

export default CinematicOverlay;
