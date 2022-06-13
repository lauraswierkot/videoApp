export class Item {
  id: string;
  title: string;
  description: string;
  thumbnail: string;

  constructor(id: string, title: string, description: string, thumbnail: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
  } 
}
