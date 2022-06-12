import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable, Subject } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  subject : BehaviorSubject<Item> = new BehaviorSubject<Item>(new Item("","",""));

  shareItem(item : Item){
    this.subject.next(item); 
  }

  getSubject(){
    return this.subject;
  }


}

