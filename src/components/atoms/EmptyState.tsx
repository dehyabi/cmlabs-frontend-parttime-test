interface EmptyStateProps {
  message: string;
  icon?: string;
}

export default function EmptyState({ message, icon = '🍽️' }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">{icon}</div>
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
}
