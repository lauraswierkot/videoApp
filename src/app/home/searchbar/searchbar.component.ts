import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  public searchbarForm: FormGroup;

  public ngOnInit(): void {
    this.searchbarForm = new FormGroup({
      link: new FormControl('')
    });
  }

  public onSubmit(form: FormGroup): FormGroup {
    return form.value.link; 
  }
}
