import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private messageService:MessageService,
    public matDailog:MatDialogRef<LoginComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data :String

    ) { }
  public username:string =""
  name:String = "jeevan"
  ngOnInit(): void {
  }
  connect(){
this.messageService.connect(this.username)
this.matDailog.close({data:this.username})
  }

}
