import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.css'],
})
export class VideoDialogComponent {
  public url: SafeResourceUrl;

  constructor(
    private dialogRef: MatDialogRef<VideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public sanitizer: DomSanitizer
  ) {
    this.url = sanitizer.bypassSecurityTrustResourceUrl(data);
  }

  public close(): void {
    this.dialogRef.close();
  }
}
