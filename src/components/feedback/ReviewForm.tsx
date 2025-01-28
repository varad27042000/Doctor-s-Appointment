import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';
import { Rating } from '../ui/Rating';

interface ReviewFormProps {
  onSubmit: (review: { rating: number; comment: string }) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <Rating value={rating} size="lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your experience..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={rating === 0}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Submit Review
        </button>
      </form>
    </Card>
  );
}