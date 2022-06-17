export class Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;

  constructor(id: string, title = "", description = "", thumbnail = "") {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
  } 
}
