import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { FacadeService, Video } from 'src/app/core';
import { getVideoEmbedUrl } from 'src/app/core/utils/video-helper';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css'],
})
export class VideoPageComponent implements OnInit, OnDestroy {
  public routeParamsSubscription: Subscription;
  public video: Video;
  public safeUrl: SafeResourceUrl;
  public url: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public facadeService: FacadeService
  ) {}

  public ngOnInit(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      (value) => {
        this.url = value['id'];
      }
    );
    this.video = this.facadeService.getVideoById(this.url);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      getVideoEmbedUrl(this.url)
    );
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  public back(): void {
    this.router.navigateByUrl('');
  }
}
