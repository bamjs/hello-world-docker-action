import * as Stomp from 'stompjs'
import * as SockJS from 'sockjs-client';
import { WebSocketShareService } from './web-socket-share.service'
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class MessageService {
  public stompClient!: any;
  public msg: any[] = []
  constructor(private websocketshare: WebSocketShareService) { }
  websocketEndPoint: string = "http://localhost:8080/message-applicaton"
  topic: string = "/topic/chat"
  username: string = "jeevansai"
  connect(username:string="") {
    this.username = username
    console.log("intializing web socket");
    let ws = new SockJS(this.websocketEndPoint);
    this.stompClient = Stomp.over(ws)
    this.stompClient.connect({}, (frame: any) => {
      console.log("contected" + frame);
      this.stompClient.send("/app/chat-register", {}, JSON.stringify({
        sender: username,
        type: "JOIN"
      }))
      this.stompClient.subscribe(this.topic, (sdkEvent: any) => {
        console.log("data from" + JSON.stringify(sdkEvent))
        this.onMessageRecevied(sdkEvent)
      });
    }, this.errorCallBack)


  }
  disconnect() {
    if (this.stompClient !== null) {

      this.stompClient.disconnect();
    }
    this.stompClient.send("/app/chat-send", {}, JSON.stringify({
      type: "LEFT",
      sender: this.username
    }))
    console.log("Disconnected");
  }
  errorCallBack(error: any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connect(this.username);
    }, 5000);
  }
  onMessageRecevied(message: any) {
    let jsonBody = JSON.parse(message.body)
    this.msg.push(jsonBody)
    this.websocketshare.addnewValue(jsonBody)
  }
  send(msg: any) {
    this.stompClient.send("/app/chat-send", {}, JSON.stringify({
      content: msg,
      sender: this.username,
      type: "CHAT"
    }))
  }
  messageobsrveable() {
    return this.websocketshare.getvalue()
  }
  updateuser(user: string) {
    this.username = user
  }
}
