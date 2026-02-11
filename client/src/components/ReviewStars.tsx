// Design: Harajuku Confectionery — star rating display
import { Star } from "lucide-react";

interface ReviewStarsProps {
  rating: number;
  size?: number;
  showCount?: boolean;
  count?: number;
}

export default function ReviewStars({ rating, size = 16, showCount = false, count }: ReviewStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
      {showCount && count !== undefined && (
        <span className="text-sm text-muted-foreground ml-1">({count})</span>
      )}
    </div>
  );
}
