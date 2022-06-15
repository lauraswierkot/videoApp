import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/search.service';
import { Item } from 'src/app/core/item';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  public searchbarForm : FormGroup;
  public item :  Item;

  constructor(private searchService : SearchService, private sharedService : SharedService) {}

  ngOnInit(): void {
    this.searchbarForm = new FormGroup({
      link: new FormControl('')
    });
  }

  public onSubmit(form: FormGroup): void {
    const observable = this.searchService.getVideos(form.value.link);
    observable.subscribe(value => { 
      this.item = new Item(form.value.link, value.items[0].snippet.title, value.items[0].snippet.title, value.items[0].snippet.title);
      this.sharedService.shareItem(this.item);
    });
  }
}
