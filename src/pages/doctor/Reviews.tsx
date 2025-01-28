import React from 'react';
import { Star, ThumbsUp, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Review } from '../../types';

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    doctorId: '1',
    patientId: '2',
    patientName: 'Jane Smith',
    rating: 5,
    comment: 'Dr. Johnson was very thorough and professional. Highly recommend!',
    date: '2024-03-01'
  },
  {
    id: '2',
    doctorId: '1',
    patientId: '3',
    patientName: 'Mike Wilson',
    rating: 4,
    comment: 'Good experience overall. Clear explanation of treatment.',
    date: '2024-02-28'
  }
];

export function Reviews() {
  const { user } = useAuth();
  const reviews = MOCK_REVIEWS.filter(review => review.doctorId === user?.id);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Patient Reviews</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">{review.patientName}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {review.date}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <button className="mt-4 flex items-center text-sm text-gray-500 hover:text-gray-700">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Thank patient
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Rating Summary</h2>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">Based on {reviews.length} reviews</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Rating Distribution</h2>
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter(r => r.rating === rating).length;
              const percentage = (count / reviews.length) * 100;
              return (
                <div key={rating} className="flex items-center mb-2">
                  <span className="w-12 text-sm text-gray-600">{rating} stars</span>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-yellow-400 rounded"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="w-12 text-sm text-gray-600">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}