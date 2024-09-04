export const calculateAverageRating = (
  ratings: number[] | undefined
): number => {
  if (!ratings || ratings.length === 0) return 0;
  const total = ratings.reduce((sum, rating) => sum + rating, 0);
  return total / ratings.length;
};

export const calculateStars = (
  averageRating: number
): { fullStars: number; halfStar: number; emptyStars: number } => {
  const fullStars = Math.floor(averageRating);
  const halfStar = averageRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - (fullStars + halfStar);

  return { fullStars, halfStar, emptyStars };
};
