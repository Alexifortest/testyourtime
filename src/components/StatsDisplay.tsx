interface StatsDisplayProps {
  bestTime: number | null;
  averageTime: number | null;
  attempts: number;
}

const StatsDisplay = ({ bestTime, averageTime, attempts }: StatsDisplayProps) => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* User Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300">
          <div className="text-muted-foreground text-sm uppercase tracking-wider mb-3 font-f1-body font-semibold">
            Best Time
          </div>
          <div className="text-4xl font-f1-display font-black text-racing-gold">
            {bestTime !== null ? `${bestTime}ms` : '---'}
          </div>
        </div>
        
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300">
          <div className="text-muted-foreground text-sm uppercase tracking-wider mb-3 font-f1-body font-semibold">
            Average
          </div>
          <div className="text-4xl font-f1-display font-black text-foreground">
            {averageTime !== null ? `${averageTime}ms` : '---'}
          </div>
        </div>
        
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300">
          <div className="text-muted-foreground text-sm uppercase tracking-wider mb-3 font-f1-body font-semibold">
            Attempts
          </div>
          <div className="text-4xl font-f1-display font-black text-foreground">
            {attempts}
          </div>
        </div>
      </div>

      {/* World Records */}
      <div className="grid grid-cols-2 gap-6">
        <div className="backdrop-blur-2xl bg-gradient-to-br from-racing-gold/10 to-racing-red/10 border border-racing-gold/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div className="text-racing-gold text-xs uppercase tracking-widest mb-2 font-f1-body font-bold">
            🏆 World Record
          </div>
          <div className="text-5xl font-f1-display font-black text-racing-gold mb-1">
            40ms
          </div>
          <div className="text-xs font-f1-body text-muted-foreground">
            Human Reaction Time Record
          </div>
        </div>
        
        <div className="backdrop-blur-2xl bg-gradient-to-br from-primary/10 to-racing-red/10 border border-primary/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div className="text-primary text-xs uppercase tracking-widest mb-2 font-f1-body font-bold">
            🏁 F1 Driver Average
          </div>
          <div className="text-5xl font-f1-display font-black text-primary mb-1">
            200ms
          </div>
          <div className="text-xs font-f1-body text-muted-foreground">
            Professional F1 Driver Average
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
