export const createMovie = (data) => {
  return {
    name: data.name,
    posterImage: data.poster_image,
    previewImage: data.preview_image,
    backgroundImage: data.background_image,
    backgroundColor: data.background_color,
    description: data.description,
    rating: data.rating,
    scoresCount: data.scores_count,
    director: data.director,
    starring: data.starring,
    runtime: data.run_time,
    genre: data.genre,
    released: data.released,
    id: data.id,
    isFavorite: data.is_favorite,
    previewVideoLink: data.preview_video_link,
    videoLink: data.video_link,
  };
};

export const createUser = (data) => {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    avatar: data.avatar_url,
  };
};
