import { useMemo } from 'react';

const CONFETTI_COLORS = ['#a78bfa', '#60a5fa', '#fbbf24', '#34d399', '#f87171', '#f472b6'];

function Confetti() {
  // Generate 40 confetti pieces once per render, each with a random position,
  // color, delay and fall speed — this is the whole "confetti system".
  const pieces = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 0.4,
      duration: 1.8 + Math.random() * 1.2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 w-2 h-3 rounded-sm animate-confetti"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function CelebrationModal({ celebration, onClose }) {
  if (!celebration) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl px-10 py-8 text-center overflow-hidden">
        <Confetti />
        <div className="relative">
          <p className="text-5xl mb-3">{celebration.emoji}</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{celebration.title}</h2>
          <p className="text-gray-500 mb-5">{celebration.subtitle}</p>
          <button
            onClick={onClose}
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-full px-6 py-2 transition-colors"
          >
            Nice!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CelebrationModal;
