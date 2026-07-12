/**
 * Ambient hero backdrop: a few large, heavily blurred light orbs drifting
 * very slowly — the quiet, modern replacement for the old particle
 * constellation. Pure CSS (no canvas, no hooks), rendered on the server;
 * the global reduced-motion rule freezes the drift automatically.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="animate-drift-1 absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-emerald-500/[0.13] blur-3xl" />
      <div className="animate-drift-2 absolute right-[6%] top-[30%] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="animate-drift-3 absolute bottom-[8%] left-[28%] h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
      <div className="animate-drift-2 absolute -top-16 left-[45%] h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
    </div>
  );
}
