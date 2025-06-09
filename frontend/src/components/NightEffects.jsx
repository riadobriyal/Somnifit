const NightEffects = () => {
  return (
    <>
      {/* Aurora Borealis effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent transform -translate-y-1/2 animate-aurora"></div>
      </div>

      {/* Shooting stars */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`shooting-${i}`}
          className="absolute bg-white w-[2px] h-[2px] animate-shooting-star"
          style={{
            top: `${Math.random() * 50}%`,
            left: '100%',
            animationDelay: `${Math.random() * 10}s`,
            boxShadow: '0 0 0 1px #ffffff10, 0 0 2px #ffffff40, 0 0 10px #ffffff20',
          }}
        />
      ))}
    </>
  );
};

export default NightEffects;