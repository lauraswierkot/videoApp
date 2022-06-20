import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { VideoService
 } from 'src/app/core';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  public searchbarForm: FormGroup;

  constructor(private videoService: VideoService) {}

  public ngOnInit(): void {
    this.searchbarForm = new FormGroup({
      searchPhrase: new FormControl(''),
    });
  }

  public onSubmit(form: FormGroup): void {
    this.videoService.getVideo(form.value.searchPhrase);
  }
}
