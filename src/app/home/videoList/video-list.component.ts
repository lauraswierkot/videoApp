import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { Video } from 'src/app/core/model/video';
import { FacadeService } from 'src/app/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

@UntilDestroy()
@Component({
  selector: 'app-videoList',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  public videoList: Video[] = [];
  public unfilteredVideoList: Video[] = [];
  public length: number = 0;
  public pageSize: number = 3;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [3, 6, 9];

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
    this.unfilteredVideoList.sort(
      (a, b) =>
        new Date(b.createdAt).getDate() - new Date(a.createdAt).getTime()
    );
    this.paginateUnfilteredList();
  }

  public sortDesc(): void {
    this.unfilteredVideoList.sort(
      (a, b) =>
        new Date(a.createdAt).getDate() - new Date(b.createdAt).getTime()
    );
   this.paginateUnfilteredList();
  }

  public filterFavorites(): void {
    this.unfilteredVideoList = this.videoList.filter(
      (value) => value.isFavorite !== false
    );
    this.paginateUnfilteredList();
  }

  public showAll(): void {
    this.getVideos();
  }

  public paginate(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getVideos();
  }

  private getVideos(): void {
    this.facadeService.videoList$
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.unfilteredVideoList = value;
        this.length = value.length;
        this.videoList = value.slice(
          Number(this.pageIndex * this.pageSize),
          (this.pageIndex + Number(1)) * this.pageSize
        );
      });
  }

  private paginateUnfilteredList(): Video[] {
    this.videoList = this.unfilteredVideoList.slice(
      Number(this.pageIndex * this.pageSize),
      (this.pageIndex + Number(1)) * this.pageSize
    );
    return this.videoList;
  }
}
