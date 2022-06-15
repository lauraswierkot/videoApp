import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/core/item';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-videoList',
  templateUrl: './videoList.component.html',
  styleUrls: ['./videoList.component.css']
})
export class VideoListComponent {

  constructor(private sharedService : SharedService) { }

  ngOnInit(): void {
    this.sharedService.getSubject().subscribe(value => this.itemList.push(value));
  }

  public itemList : Item[] = [];

  public removeItem(index:number): void
  {
    if(index > -1)
    {
      this.itemList.splice(index, 1);
    }
  }
}
