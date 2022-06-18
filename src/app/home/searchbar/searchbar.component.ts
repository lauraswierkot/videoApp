import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { HttpService } from 'src/app/core';
import { Video } from 'src/app/core/model/video';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor(private httpService : HttpService) {}

  public searchbarForm: FormGroup;
  public item: Video;

  public ngOnInit(): void {
    this.searchbarForm = new FormGroup({
      link: new FormControl('')
    });
  }

  public onSubmit(form: FormGroup): void { 
    this.httpService.getVideo(form.value.link).subscribe(value => { 
      this.item = new Video (
        form.value.link, 
        value.items[0].snippet.title, 
        value.items[0].snippet.description, 
        value.items[0].snippet.thumbnails.medium.url
      );
      this.httpService.saveVideo(this.item);  
      });
  }
}
