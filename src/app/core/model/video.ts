export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  viewCount?: number;
  likeCount?: number;
  isFavorite?: boolean;
}
