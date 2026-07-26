// A small, non-blocking pill notification — used for lighter moments like
// "application added". For big status-change celebrations, see CelebrationModal.
function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-green-500 text-white font-semibold rounded-full px-6 py-3 shadow-lg">
        {message}
      </div>
    </div>
  );
}

export default Toast;
