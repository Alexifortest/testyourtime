import { cn } from "@/lib/utils";

interface StartLightsProps {
  activeCount: number;
  allOff: boolean;
}

const StartLights = ({ activeCount, allOff }: StartLightsProps) => {
  return (
    <div className="flex gap-6 justify-center mb-12">
      {[1, 2, 3, 4, 5].map((light) => (
        <div
          key={light}
          className={cn(
            "w-20 h-28 rounded-xl transition-all duration-200 relative overflow-hidden",
            "backdrop-blur-md bg-white/5 border-2 shadow-2xl",
            allOff
              ? "border-white/20 bg-black/40"
              : light <= activeCount
              ? "border-racing-red bg-racing-red animate-light-on"
              : "border-white/20 bg-black/40"
          )}
          style={{
            boxShadow: allOff
              ? "0 4px 20px rgba(0, 0, 0, 0.5)"
              : light <= activeCount
              ? "0 0 40px hsl(var(--racing-red) / 0.8), 0 0 80px hsl(var(--racing-red) / 0.5), inset 0 0 30px hsl(var(--racing-red) / 0.6)"
              : "0 4px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Inner glow for active lights */}
          {light <= activeCount && !allOff && (
            <div className="absolute inset-2 rounded-lg bg-gradient-to-br from-racing-red via-racing-red-dark to-racing-red opacity-90 animate-glow-pulse" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StartLights;
