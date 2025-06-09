const Moon = () => {
  return (
    <div className="fixed top-10 right-20 pointer-events-none animate-moon-glow">
      <div className="w-32 h-32 bg-[#ffd700] rounded-full opacity-90"></div>
      <div className="w-28 h-28 bg-[#1a237e] rounded-full relative -top-32 -right-3"></div>
    </div>
  );
};