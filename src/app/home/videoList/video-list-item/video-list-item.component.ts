import { Component, Input } from '@angular/core';
import { Video } from 'src/app/core/model/video';
import { VideoService } from 'src/app/core';

@Component({
  selector: 'app-video-list-item',
  templateUrl: './video-list-item.component.html',
  styleUrls: ['./video-list-item.component.css'],
})
export class VideoListItemComponent {
  @Input() video: Video;

  constructor(private videoService: VideoService) {}

  public delete(id: string): void {
    this.videoService.deleteVideo(id);
  }

  public setAsFavorite(): void {
    this.video.isFavorite = true;
  }
}
