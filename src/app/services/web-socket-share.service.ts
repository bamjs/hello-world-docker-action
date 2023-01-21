import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class WebSocketShareService implements OnDestroy {


  constructor() { }
  ngOnDestroy(): void {
    this.messageSubject.unsubscribe()
  }
  private messageSubject = new BehaviorSubject<Message[]>([]);


  addnewValue(msg: Message) {
    this.messageSubject.next([...this.messageSubject.value,msg])
  }
  getvalue(): Observable<Message[]> {
    return this.messageSubject.asObservable()
  }
}
