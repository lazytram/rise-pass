interface MintActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function MintActionButton({
  children,
  onClick,
  disabled = false,
  isLoading = false,
}: MintActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full px-6 py-4 bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] text-white font-semibold rounded-xl hover:from-[#7967e5]/90 hover:to-[#ffa0f2]/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <span>Minting...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
