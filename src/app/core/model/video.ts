export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  likeCount?: string;
  viewCount?: any;
  createdAt: Date;
  isFavorite?: boolean;
}
