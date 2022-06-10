import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from '../item';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  public searchbarForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.searchbarForm = new FormGroup({
      link: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form); 
  }

}
