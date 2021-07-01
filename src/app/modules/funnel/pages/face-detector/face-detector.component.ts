import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {screens} from '../../../../utils/screens';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-face-detector',
  templateUrl: './face-detector.component.html',
  styleUrls: ['./face-detector.component.scss']
})
export class FaceDetectorComponent implements OnInit {

  public currentStream: any;
  public videoDimensions: any;
  loading = false;
  screenOn1: boolean;
  public webcamImage1: string = null;
  imageBack = 'assets/images/funnel/take-picture-overlay.png';
  imageSrc1 = 'assets/images/funnel/face-detection.png';
  waitSend= false;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // this.checkMediaSources();
    this.getSizeCam();
    // console.log('initialize');
    this.toggleCamera1();
  }
  sendFacePhoto() {debugger
    console.log(this.webcamImage1)
    // let data = {

    //   "IdConsulta": this.responseForm1.IdConsulta,
    //   "FotoPerfil": this.webcamImage1
    // }

    // this.waitSend = true;
    // this.dataService.setProfilePhoto(data).subscribe(response => {

    //   this.waitSend = false;
    //   if (response.IdError == 0) {
    //     // this.responseForm1 = response;
    //     this.demo1TabIndex = this.demo1TabIndex + 1;
    //   }
    //   this.openSnackBar(response.Mensaje, 'Cerrar');
    // });
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  toggleCamera1() {
    this.webcamImage1 = null;
    this.screenOn1 = true;
  }
  handleImage1(webcamImage: any) {
    this.webcamImage1 = webcamImage.imageAsDataUrl;
    this.takePhoto();
  }
  checkMediaSources = (): void => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      }).then(stream => {
        this.currentStream = stream;
      }).catch(e => console.log('The user has been denied permission'));
    } else {
      alert('Este dispositivo no es compatible');
    }
  }

  getSizeCam = (): void => {
    // const elementCam: HTMLElement = document.querySelector('.face-match');
    // const { width, height } = elementCam.getBoundingClientRect();
    // this.videoDimensions = { width, height: height > 0 ? height : null };
  }

  async takePhoto( ): Promise<void> {
    this.loading = true;

    const formData = {
      IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
      FotoPerfil: this.webcamImage1,
    };

    this.dataService.financialSaveSelfie(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        localStorage.setItem('IdConsulta', response.IdConsulta);
        localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);

        this.loading = false;
        // set IdConsulta
        const url = screens[response.IdPantalla];
        await this.router.navigateByUrl(url);
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });

    // await this.router.navigateByUrl('/funnel/fingerprint-detector');
  }
}
