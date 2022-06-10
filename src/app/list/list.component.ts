import { Component, OnInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
