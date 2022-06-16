import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { HttpService } from 'src/app/http.service';
import { Video } from 'src/app/core/video';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  public searchbarForm: FormGroup;
  public item: Video;

  constructor(private httpService : HttpService, private sharedService : SharedService) {}

  public ngOnInit(): void {
    this.searchbarForm = new FormGroup({
      link: new FormControl('')
    });
  }

  public onSubmit(form: FormGroup): void { 
    this.httpService.getVideos(form.value.link).subscribe(value => { 
      this.item = new Video(form.value.link, value.items[0].snippet.title, value.items[0].snippet.title, value.items[0].snippet.thumbnails.medium.url);
      this.sharedService.shareItem(this.item);
      });
  }
}
