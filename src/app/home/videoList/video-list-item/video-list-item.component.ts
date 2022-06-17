import { Component, Input } from '@angular/core';
import { Video } from 'src/app/core/model/video';
import { HttpService } from 'src/app/core/model/http.service';

@Component({
  selector: 'app-video-list-item',
  templateUrl: './video-list-item.component.html',
  styleUrls: ['./video-list-item.component.css']
})
export class VideoListItemComponent { 

  constructor(private httpService: HttpService) {}
  
  @Input() video: Video;

  public delete(id: string): void {
    this.httpService.deleteVideo(id);
  }
}
