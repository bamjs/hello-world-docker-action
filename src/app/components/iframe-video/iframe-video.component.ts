import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe-video',
  templateUrl: './iframe-video.component.html',
  styleUrls: ['./iframe-video.component.css']
})
export class IframeVideoComponent implements OnInit,AfterViewInit {
  dangerousVideoUrl!: string;
  videoUrl: any;
  videoObj:any;
  @ViewChild('hellovideo') hellovideo!: ElementRef;
  // sockjsurl:any = "https://player.vdocipher.com/playerAssets/1.6.10/vdo.js"

  constructor(private sanitizer: DomSanitizer) {
   }
  ngAfterViewInit(): void {
    this.videoObj = new VdoPlayer({
      otp: "20160313versASE313ySHWrbkG1yQjB34gMwaeYkXffc9kTMXaxl52FrKUBDYYtF",
      playbackInfo: btoa(
        JSON.stringify({
          videoId: "1041ed58cd544f9ba60a3aa5da3f11ef"
        })
      ),
      theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
      container: this.hellovideo.nativeElement
    });
  }
  ngOnInit(): void {
    this.updateVideoUrl()

  }
  updateVideoUrl() {
    this.dangerousVideoUrl = "https://www.youtube.com/embed/A4MKFPCpRQ4";
    this.videoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
    // this.sockjsurl =this.sanitizer.bypassSecurityTrustResourceUrl(this.sockjsurl)
  }
  seek(time:any){
    this.videoObj.seek(time)
  }

}
