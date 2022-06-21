import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Video } from 'src/app/core/model/video';

@Component({
  selector: 'app-video-list-item',
  templateUrl: './video-list-item.component.html',
  styleUrls: ['./video-list-item.component.css'],
})
export class VideoListItemComponent {
  @Input() video: Video;
  @Output() videoDeleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() videoFavourite: EventEmitter<string> = new EventEmitter<string>();

  public delete(id: string): void {
    this.videoDeleted.emit(id);
  }

  public setAsFavorite(id: string): void {
    this.videoFavourite.emit(id);
  }
}
