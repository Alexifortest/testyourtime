import { cn } from "@/lib/utils";

interface StartLightsProps {
  activeCount: number;
  allOff: boolean;
}

const StartLights = ({ activeCount, allOff }: StartLightsProps) => {
  return (
    <div className="flex gap-4 justify-center mb-12">
      {[1, 2, 3, 4, 5].map((light) => (
        <div
          key={light}
          className={cn(
            "w-16 h-24 rounded-lg transition-all duration-150",
            "border-2 border-border shadow-lg",
            allOff
              ? "bg-secondary"
              : light <= activeCount
              ? "bg-primary shadow-glow animate-pulse"
              : "bg-secondary"
          )}
          style={{
            boxShadow: allOff
              ? "none"
              : light <= activeCount
              ? "0 0 30px hsl(var(--racing-red) / 0.6), inset 0 0 20px hsl(var(--racing-red) / 0.3)"
              : "none",
          }}
        />
      ))}
    </div>
  );
};

export default StartLights;
