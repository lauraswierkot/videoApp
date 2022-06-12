import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private sharedService : SharedService) { }

  ngOnInit(): void {
    this.sharedService.getSubject().subscribe(value => console.log(value));
  }

  public itemList : Item[] = [];

  removeItem(index:number)
  {
    if(index > -1)
    {
      this.itemList.splice(index, 1);
    }
  }

}
