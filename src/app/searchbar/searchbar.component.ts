import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '../search.service';
import { Item } from '../item';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  public searchbarForm : FormGroup;

  public item :  Item;

  constructor(private searchService : SearchService) {}

  ngOnInit() {
    this.searchbarForm = new FormGroup({
      link: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value.link); 
    this.searchService.getVideos(form.value.link).subscribe(result => {
      console.log(result.items[0].snippet.channelTitle);
      console.log(result.items[0].snippet.title);
      this.item = new Item(result.items[0].snippet.title, result.items[0].snippet.title,result.items[0].snippet.title);
    });
  }





}
