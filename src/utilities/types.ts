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
