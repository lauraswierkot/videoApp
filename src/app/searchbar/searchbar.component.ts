import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '../search.service';
import { Item } from '../item';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  public searchbarForm : FormGroup;

  public item :  Item;

  constructor(private searchService : SearchService, private sharedService : SharedService) {}

  ngOnInit() {
    this.searchbarForm = new FormGroup({
      link: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    const observable = this.searchService.getVideos(form.value.link);
    observable.subscribe(value => this.item = new Item(value.items[0].snippet.title, value.items[0].snippet.title, value.items[0].snippet.title));
    this.sharedService.shareItem(this.item);
  }


}
