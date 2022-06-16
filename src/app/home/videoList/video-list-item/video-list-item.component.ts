import { Component, Input } from '@angular/core';
import { Video } from 'src/app/core/video';

@Component({
  selector: 'app-video-list-item',
  templateUrl: './video-list-item.component.html',
  styleUrls: ['./video-list-item.component.css']
})
export class VideoListItemComponent {
  @Input() video: Video;
}
