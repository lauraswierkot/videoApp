import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { Video } from 'src/app/core/model/video';
import { FacadeService } from 'src/app/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-videoList',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  public videoList: Video[] = [];
  public length: number = 0;
  public pageSize: number = 3;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [3,6,9];

  constructor(private facadeService: FacadeService) {}

  public ngOnInit(): void {
    this.getVideos();
  }

  public ngOnDestroy(): void {
    this.facadeService.videoList$.unsubscribe();
  }

  public delete(id: string): void {
    this.facadeService.deleteVideo(id);
  }

  public setAsFavorite(id: string): void {
    this.facadeService.setAsFavorite(id);
  }

  public deleteAll(): void {
    this.facadeService.deleteAll();
  }

  public getDemoVideos(): void {
    this.facadeService.getDemoVideos();
  }

  public sortAsc(): void {
    console.log(typeof this.videoList[0].createdAt)
    this.videoList.sort((a, b) => new Date(b.createdAt).getDate() - new Date(a.createdAt).getTime());
  }

  public sortDesc(): void {
    this.videoList.sort((a, b) => new Date(a.createdAt).getDate() - new Date(b.createdAt).getTime());
  }

  public filterFavorites(): void {
    this.videoList = this.videoList.filter((value) => value.isFavorite !== false);
  }

  public showAll(): void {
    this.getVideos();
  }

  private getVideos(): void {
    this.facadeService.videoList$
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.length = value.length;
        this.videoList = value.slice(Number(this.pageIndex * this.pageSize), ((this.pageIndex + Number(1)) * this.pageSize));
      });   
  }
  
  public paginate(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getVideos();
  }
}
