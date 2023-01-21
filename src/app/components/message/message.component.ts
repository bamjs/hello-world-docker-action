import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
message:string = ""
username:string =""
public messageHistory :string[] = []
  constructor(public messageService :MessageService,private matdailog:MatDialog) { }
  trackitem(index:number,item:Object){
    
    return index
  }

  ngOnInit(): void {
    const dailogRef=this.matdailog.open(LoginComponent,{width:'350px'})
    dailogRef.afterClosed().subscribe(result=>{
      console.log(result)
      this.username = result.data
    })
  }

  updatemessage():Observable<Message[]>{
    return this.messageService.messageobsrveable()
  }
  messageArray(){
    return this.messageService.msg
  }
  sendmessage(){
    this.messageService.send(this.message)
    this.message =""
    this.updatemessage()
  }

  connect(){
    this.messageService.updateuser(this.username)
    this.messageService.connect()
  }
  disconnect(){
    this.messageService.disconnect()
  }

}
