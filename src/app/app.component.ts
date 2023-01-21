import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public sanitier:DomSanitizer){

  }
  urlforCheck:any
  ngOnInit(): void {
    console.log(Object.values);
    
    this.urlforCheck = this.sanitier.bypassSecurityTrustResourceUrl("https://www.google.com")
  }
  title = 'MessagingApplication';



}
