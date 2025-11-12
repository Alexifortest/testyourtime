interface StatsDisplayProps {
  bestTime: number | null;
  averageTime: number | null;
  attempts: number;
}

const StatsDisplay = ({ bestTime, averageTime, attempts }: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <div className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
          Best Time
        </div>
        <div className="text-3xl font-bold text-accent">
          {bestTime !== null ? `${bestTime}ms` : '---'}
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <div className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
          Average
        </div>
        <div className="text-3xl font-bold text-foreground">
          {averageTime !== null ? `${averageTime}ms` : '---'}
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <div className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
          Attempts
        </div>
        <div className="text-3xl font-bold text-foreground">
          {attempts}
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
