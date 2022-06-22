import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FacadeService } from 'src/app/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  public searchbarForm: FormGroup;

  constructor(private facadeService: FacadeService) {}

  public ngOnInit(): void {
    this.searchbarForm = new FormGroup({
      searchPhrase: new FormControl(''),
    });
  }

  public onSubmit(form: FormGroup): void {
    this.facadeService.getVideo(form.value.searchPhrase);
  }
}
