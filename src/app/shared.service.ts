import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from './core/item';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  subject : Subject<Item> = new Subject<Item>();

  public shareItem(item : Item): void{
    this.subject.next(item); 
  }

  public getSubject(): Subject<Item>{
    return this.subject;
  }
}
