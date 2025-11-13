import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import StartLights from "./StartLights";
import StatsDisplay from "./StatsDisplay";
import { toast } from "sonner";
import f1Logo from "@/assets/f1-logo.png";
import f1Background from "@/assets/f1-background.jpg";

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${f1Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
        }}
      />
      
      {/* Glassmorphism Overlay */}
      <div className="fixed inset-0 z-0 bg-background/40 backdrop-blur-xl" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <header className="text-center mb-12 animate-float">
            <img 
              src={f1Logo} 
              alt="Formula 1 Logo" 
              className="w-64 md:w-96 mx-auto mb-6 drop-shadow-2xl"
            />
            <h2 className="text-2xl md:text-3xl font-f1-body font-bold mb-2 text-foreground tracking-wider">
              REACTION TEST
            </h2>
            <p className="text-muted-foreground text-lg font-f1-body">
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
            <div 
              className="relative rounded-3xl p-12 text-center min-h-[300px] flex flex-col items-center justify-center overflow-hidden
                         backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl
                         hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]
                         before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            >
              {gameState === "idle" && (
                <div className="relative z-10 animate-in fade-in duration-500">
                  <div className="text-3xl font-f1-display font-bold mb-6 text-foreground">Ready to race?</div>
                  <Button size="lg" className="text-xl px-10 py-7 font-f1-body bg-racing-red hover:bg-racing-red-dark shadow-glow animate-glow-pulse">
                    START TEST
                  </Button>
                </div>
              )}
              
              {gameState === "waiting" && (
                <div className="text-3xl font-f1-display font-bold text-muted-foreground animate-pulse relative z-10">
                  Get ready...
                </div>
              )}
              
              {gameState === "lights" && (
                <div className="text-3xl font-f1-display font-bold text-primary animate-pulse relative z-10">
                  Wait for it...
                </div>
              )}
              
              {gameState === "go" && (
                <div className="text-5xl font-f1-display font-black text-racing-gold animate-glow-pulse relative z-10">
                  GO! CLICK NOW!
                </div>
              )}
              
              {gameState === "result" && (
                <div className="relative z-10 animate-in fade-in duration-500">
                  <div className="text-7xl font-f1-display font-black text-racing-gold mb-4 animate-in zoom-in duration-300">
                    {reactionTime}ms
                  </div>
                  <div className="text-xl font-f1-body text-muted-foreground mb-8">
                    {reactionTime && reactionTime < 200 ? "Lightning fast! 🔥" :
                     reactionTime && reactionTime < 250 ? "Excellent reflexes! 👏" :
                     reactionTime && reactionTime < 300 ? "Good job! 👍" :
                     "Keep practicing! 💪"}
                  </div>
                  <Button size="lg" className="text-xl px-10 py-7 font-f1-body bg-racing-red hover:bg-racing-red-dark shadow-glow">
                    TRY AGAIN
                  </Button>
                </div>
              )}
              
              {gameState === "false-start" && (
                <div className="relative z-10 animate-in fade-in duration-500">
                  <div className="text-5xl font-f1-display font-black text-destructive mb-6">
                    FALSE START!
                  </div>
                  <div className="text-xl font-f1-body text-muted-foreground mb-8">
                    Wait for all lights to go out
                  </div>
                  <Button size="lg" className="text-xl px-10 py-7 font-f1-body bg-racing-red hover:bg-racing-red-dark">
                    TRY AGAIN
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

          {/* Footer */}
          <footer className="mt-16 text-center space-y-4 pb-8">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-sm font-f1-body text-muted-foreground mb-3">
                Created by <span className="text-racing-gold font-semibold">Chinmay Gurav</span>
              </p>
              <img 
                src={f1Logo} 
                alt="Formula 1 Logo" 
                className="w-24 mx-auto mb-3 opacity-50"
              />
              <p className="text-xs font-f1-body text-muted-foreground/80 leading-relaxed">
                The F1 logo and name belong to the Formula 1 Companies.
                <br />
                Their use here is not meant for advertising or promotion.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ReactionTest;
