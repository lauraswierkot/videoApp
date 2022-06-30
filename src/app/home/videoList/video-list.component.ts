import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Video } from 'src/app/core/model/video';
import { FacadeService, VideoType } from 'src/app/core';
import { SortType } from 'src/app/core/utils/sort-type';
import { VideoDialogComponent } from './video-list-item/video-dialog/video-dialog.component';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-videoList',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  public subscription: Subscription;

  public videoList: Video[] = [];
  private fullVideoList: Video[] = [];

  public length: number = 0;
  public pageSize: number = 3;
  public pageSizeOptions: number[] = [3, 6, 9];
  private pageIndex: number = 0;

  public displayType: string = 'list';

  public sortOptions = SortType;
  public showOnlyFavorites: boolean = false;
  private sortType: SortType = SortType.DESC;

  constructor(
    private facadeService: FacadeService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.getVideos();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  public toVideoPage(id: string): void {
    this.router.navigateByUrl(`video/${id}`);
  }

  public toggleFavorites(): void {
    this.showOnlyFavorites = !this.showOnlyFavorites;
    this.pageIndex = 0;
    this.filter();
    this.length = this.videoList.length;
    this.paginateList();
  }

  public setSortType(sortType: SortType): void {
    this.sortType = sortType;
    this.getFullList();
  }

  public setPaginator(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getFullList();
  }

  private getVideos(): void {
    this.subscription = this.facadeService.videoList$
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.fullVideoList = value;
        this.getFullList();
      });
  }

  private getFullList(): void {
    this.videoList = cloneDeep(this.fullVideoList);
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
      this.videoList = this.fullVideoList.sort(
        (a, b) =>
          +new Date(b.createdAt).getTime() - +new Date(a.createdAt).getTime()
      );
    } else {
      this.videoList = this.fullVideoList.sort(
        (a, b) =>
          +new Date(a.createdAt).getTime() - +new Date(b.createdAt).getTime()
      );
    }
  }

  private filter(): Video[] {
    if (this.showOnlyFavorites) {
      return (this.videoList = this.fullVideoList.filter(
        (value) => value.isFavorite
      ));
    }
    return (this.videoList = this.fullVideoList);
  }
}
