export const getRatingLevel = (rating) => {
  let test = null;
  if (rating >= 0 && rating < 3) {
    test = `Bad`;
  }
  if (rating >= 3 && rating < 5) {
    test = `Normal`;
  }
  if (rating >= 5 && rating < 8) {
    test = `Good`;
  }
  if (rating >= 8 && rating < 10) {
    test = `Very good`;
  }
  if (rating === 10) {
    test = `Awesome`;
  }
  return test;
};

export const getSlicedReviews = (reviews) => {
  const sliceBorderIndex = Math.ceil(reviews.length / 2);
  const firstColumn = reviews.slice(0, sliceBorderIndex);
  const secondColumn = reviews.slice(sliceBorderIndex, reviews.length);

  return [firstColumn, secondColumn];
};

export const movieNavs = [`overview`, `details`, `reviews`];
