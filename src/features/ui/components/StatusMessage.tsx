interface StatusMessageProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
}

export default function StatusMessage({
  type,
  title,
  message,
}: StatusMessageProps) {
  const typeStyles = {
    success: "bg-green-500/10 border-green-500/20 text-green-400",
    error: "bg-red-500/10 border-red-500/20 text-red-400",
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
    info: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  };

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div
      className={`p-4 rounded-xl border ${typeStyles[type]} backdrop-blur-sm`}
    >
      <div className="flex items-start space-x-3">
        <span className="text-lg flex-shrink-0">{icons[type]}</span>
        <div>
          <h4 className="font-semibold mb-1">{title}</h4>
          <p className="text-sm opacity-90">{message}</p>
        </div>
      </div>
    </div>
  );
}
