export interface Movie {
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: Array<string>;
  runtime: number;
  genre: string;
  released: number;
  id: number;
  isFavorite: boolean;
  videoLink: string;
  previewVideoLink: string;
}

export interface MovieBackend {
  name: string;
  [`poster_image`]: string;
  [`preview_image`]: string;
  [`background_image`]: string;
  [`background_color`]: string;
  description: string;
  rating: number;
  [`scores_count`]: number;
  director: string;
  starring: Array<string>;
  [`run_time`]: number;
  genre: string;
  released: number;
  id: number;
  [`is_favorite`]: boolean;
  [`video_link`]: string;
  [`preview_video_link`]: string;
}

export interface Review extends ReviewPure {
  id: number;
  user: User;
  date: string;
}

export interface ReviewPure {
  comment: string;
  rating: number;
}

export interface User {
  id: number;
  name: string;
}

export interface UserLogged extends User {
  email: string;
  avatar: string;
}

export interface LoginData {
  email: string;
  password: string;
}
