export default function AnimatedBackground() {
  return (
    <>
      {/* Animated background gradient - more vibrant */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/30 via-[#ec4899]/20 to-[#f59e0b]/25 animate-pulse"></div>

      {/* Floating elements - more vibrant */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#8b5cf6]/40 to-[#ec4899]/40 rounded-full blur-3xl animate-bounce" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-[#ec4899]/40 to-[#f59e0b]/40 rounded-full blur-3xl animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-[#f59e0b]/35 to-[#ef4444]/35 rounded-full blur-2xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        />
      </div>
    </>
  );
}
