import { Component, OnInit } from '@angular/core';
import { Item } from '../core/item';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

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
