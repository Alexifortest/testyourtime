import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import StartLights from "./StartLights";
import StatsDisplay from "./StatsDisplay";
import { toast } from "sonner";

type GameState = "idle" | "waiting" | "lights" | "go" | "result" | "false-start";

const ReactionTest = () => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [lightCount, setLightCount] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startSequence = () => {
    setGameState("waiting");
    setLightCount(0);
    setReactionTime(null);
    
    // Random delay before lights start (1-3 seconds)
    const initialDelay = 1000 + Math.random() * 2000;
    
    timeoutRef.current = window.setTimeout(() => {
      startLights();
    }, initialDelay);
  };

  const startLights = () => {
    setGameState("lights");
    let count = 0;
    
    const lightInterval = setInterval(() => {
      count++;
      setLightCount(count);
      
      if (count === 5) {
        clearInterval(lightInterval);
        // Random delay before lights out (0.5-2 seconds)
        const goDelay = 500 + Math.random() * 1500;
        
        timeoutRef.current = window.setTimeout(() => {
          setGameState("go");
          startTimeRef.current = performance.now();
        }, goDelay);
      }
    }, 600); // Each light turns on every 600ms
  };

  const handleClick = () => {
    if (gameState === "idle" || gameState === "result" || gameState === "false-start") {
      startSequence();
      return;
    }

    if (gameState === "waiting" || gameState === "lights") {
      // False start
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setGameState("false-start");
      toast.error("False Start! Wait for the lights to go out!");
      return;
    }

    if (gameState === "go") {
      // Calculate reaction time
      const endTime = performance.now();
      const time = Math.round(endTime - startTimeRef.current!);
      
      setReactionTime(time);
      setGameState("result");
      setAttempts((prev) => prev + 1);
      setTotalTime((prev) => prev + time);
      
      if (bestTime === null || time < bestTime) {
        setBestTime(time);
        toast.success(`New best time: ${time}ms! 🏁`);
      } else {
        toast.success(`Reaction time: ${time}ms`);
      }
    }
  };

  const averageTime = attempts > 0 ? Math.round(totalTime / attempts) : null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            F1 REACTION TEST
          </h1>
          <p className="text-muted-foreground text-lg">
            Click when all lights go out
          </p>
        </header>

        <div className="mb-12">
          <StartLights 
            activeCount={lightCount} 
            allOff={gameState === "go" || gameState === "result"} 
          />
        </div>

        <div 
          onClick={handleClick}
          className="cursor-pointer mb-12 max-w-2xl mx-auto"
        >
          <div className="bg-card border-2 border-border rounded-2xl p-12 text-center hover:border-primary transition-all duration-300 min-h-[300px] flex flex-col items-center justify-center">
            {gameState === "idle" && (
              <div>
                <div className="text-2xl font-semibold mb-4">Ready to race?</div>
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Test
                </Button>
              </div>
            )}
            
            {gameState === "waiting" && (
              <div className="text-2xl font-semibold text-muted-foreground animate-pulse">
                Get ready...
              </div>
            )}
            
            {gameState === "lights" && (
              <div className="text-2xl font-semibold text-primary animate-pulse">
                Wait for it...
              </div>
            )}
            
            {gameState === "go" && (
              <div className="text-4xl font-bold text-accent animate-pulse">
                GO! CLICK NOW!
              </div>
            )}
            
            {gameState === "result" && (
              <div>
                <div className="text-6xl font-bold text-accent mb-4">
                  {reactionTime}ms
                </div>
                <div className="text-muted-foreground mb-6">
                  {reactionTime && reactionTime < 200 ? "Lightning fast! 🔥" :
                   reactionTime && reactionTime < 250 ? "Excellent reflexes! 👏" :
                   reactionTime && reactionTime < 300 ? "Good job! 👍" :
                   "Keep practicing! 💪"}
                </div>
                <Button size="lg" className="text-lg px-8 py-6">
                  Try Again
                </Button>
              </div>
            )}
            
            {gameState === "false-start" && (
              <div>
                <div className="text-4xl font-bold text-destructive mb-4">
                  FALSE START!
                </div>
                <div className="text-muted-foreground mb-6">
                  Wait for all lights to go out
                </div>
                <Button size="lg" className="text-lg px-8 py-6">
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>

        <StatsDisplay 
          bestTime={bestTime}
          averageTime={averageTime}
          attempts={attempts}
        />
      </div>
    </div>
  );
};

export default ReactionTest;
