import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Video } from 'src/app/core/model/video';
import { FacadeService, VideoType } from 'src/app/core';
import { SortType } from 'src/app/core/utils/sort-type';
import { VideoDialogComponent } from './video-list-item/video-dialog/video-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-videoList',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  public videoList: Video[] = [];
  private fullVideoList: Video[] = [];
  public favoritesList: Video[] = [];

  public length: number = 0;
  public pageSize: number = 3;
  public pageSizeOptions: number[] = [3, 6, 9];
  private pageIndex: number = 0;

  public displayType: string = 'list';

  public sortOptions = SortType;
  private showOnlyFavorites: boolean = false;
  private sortType: SortType = SortType.DESC;

  constructor(
    private facadeService: FacadeService,
    private dialog: MatDialog
  ) {}

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
    this.filter();
    this.paginateList();
  }

  public deleteAll(): void {
    this.facadeService.deleteAll();
  }

  public getDemoVideos(): void {
    this.facadeService.getDemoVideos();
  }

  public toggleDisplay(): void {
    if (this.displayType === 'list') {
      this.displayType = 'grid';
    } else {
      this.displayType = 'list';
    }
  }

  public playVideo(url: string): void {
    let playerUrl = '';
    const videoData = this.facadeService.getVideoIdForPlayer(url);
    if (videoData.videoType === VideoType.YOUTUBE) {
      playerUrl = `https://www.youtube.com/embed/${videoData.id}`;
    }
    if (videoData.videoType === VideoType.VIMEO) {
      playerUrl = `https://player.vimeo.com/video/${videoData.id}`;
    }
    this.openDialog(playerUrl);
  }

  public openDialog(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    dialogConfig.disableClose = false;
    this.dialog.open(VideoDialogComponent, dialogConfig);
  }

  public setFilter(showOnlyFavorites: boolean): void {
    this.showOnlyFavorites = showOnlyFavorites;
    this.pageIndex = 0;
    this.filter();
    this.length = this.videoList.length;
    this.paginateList();
  }

  public setSortType(sortType: SortType): void {
    this.sortType = sortType;
    this.getFullList();
  }

  public setPaginator(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getFullList();
  }

  private getVideos(): void {
    this.facadeService.videoList$
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.videoList = value;
        this.fullVideoList = value;
        this.getFullList();
      });
  }

  private getFullList(): void {
    this.videoList = this.fullVideoList;
    this.sortList();
    this.filter();
    this.length = this.videoList.length;
    this.paginateList();
  }

  private paginateList(): void {
    this.videoList = this.videoList.slice(
      Number(this.pageIndex * this.pageSize),
      (this.pageIndex + Number(1)) * this.pageSize
    );
  }

  private sortList(): void {
    if (this.sortType === SortType.DESC) {
      this.videoList = this.videoList.sort(
        (a, b) =>
          +new Date(b.createdAt).getTime() - +new Date(a.createdAt).getTime()
      );
    } else {
      this.videoList = this.videoList.sort(
        (a, b) =>
          +new Date(a.createdAt).getTime() - +new Date(b.createdAt).getTime()
      );
    }
  }

  private filter(): void {
    if (this.showOnlyFavorites === true) {
      this.videoList = this.fullVideoList.filter(
        (value) => value.isFavorite === true
      );
    } else this.videoList = this.fullVideoList;
  }
}
