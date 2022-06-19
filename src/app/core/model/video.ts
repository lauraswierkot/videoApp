export class Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  isFavorite: boolean;

  constructor(
    id: string,
    title = '',
    description = '',
    thumbnail = '',
    isFavorite = false
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.isFavorite = isFavorite;
  }
}
