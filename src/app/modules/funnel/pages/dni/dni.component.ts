import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.scss']
})
export class DniComponent implements OnInit {

  public currentStream: any;
  public videoDimensions: any;

  constructor() { }

  ngOnInit(): void {
    this.checkMediaSources();
    this.getSizeCam();
  }

  checkMediaSources = (): void => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'environment',
        },
      }).then(stream => {
        this.currentStream = stream;
      }).catch(e => console.log('The user has been denied permission'));
    } else {
      console.log('No media exists');
    }
  }

  getSizeCam = (): void => {
    const elementCam: HTMLElement = document.querySelector('.dni-match');
    const { width, height } = elementCam.getBoundingClientRect();
    this.videoDimensions = { width, height: height > 0 ? height : null};
  }

}
