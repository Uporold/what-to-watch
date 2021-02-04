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
  avatar: string;
}

export interface UserLogged extends User {
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}
