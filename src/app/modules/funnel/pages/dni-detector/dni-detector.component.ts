import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {screens} from '../../../../utils/screens';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dni-detector',
  templateUrl: './dni-detector.component.html',
  styleUrls: ['./dni-detector.component.scss']
})
export class DniDetectorComponent implements OnInit {

  public currentStream: any;
  public videoDimensions: any;
  side: any;
  loading = false;
  imageBack = 'assets/images/funnel/id-picture-overlay.png'; 
  screenOn1: boolean;
  screenOn2: boolean;
  screenOn3: boolean;
  public webcamImage1: string = null;
  public webcamImage2: string = null;
  public webcamImage3: string = null;
  imageSrc1 = 'assets/images/funnel/user-id.png';
  imageSrc2 = 'assets/images/funnel/user-id.png';
  imageSrc3 = 'assets/images/funnel/user-id.png';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    this.side = this.route.snapshot.queryParams.side;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(routeParams => {
      this.side = routeParams.side;
    });
    // this.checkMediaSources();
    // this.getSizeCam();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  toggleCamera2() {
    this.webcamImage2 = null;
    this.screenOn2 = true;
  }
  toggleCamera3() {
    this.webcamImage3 = null;
    this.screenOn3 = true;
  }
  handleImage1(webcamImage: any) {
    this.webcamImage1 = webcamImage.imageAsDataUrl;
  }
  handleImage2(webcamImage: any) {
    this.webcamImage2 = webcamImage.imageAsDataUrl;
    this.takePhoto(this.webcamImage2);
  }
  handleImage3(webcamImage: any) {
    this.webcamImage3 = webcamImage.imageAsDataUrl;
    this.takePhoto(this.webcamImage3);
  }
  cancelarCamera1() {
    this.webcamImage1 = null;
    this.screenOn1 = false;
  }
  cancelarCamera2() {
    this.webcamImage2 = null;
    this.screenOn2 = false;
  }
  cancelarCamera3() {
    this.webcamImage3 = null;
    this.screenOn3 = false;
  }
  cancelCamera1() {
    this.router.navigateByUrl("/funnel/dni-detector-presentation");
  }  
  cancelCamera2() {
    this.router.navigateByUrl("/funnel/dni-detector?side=placeholder");
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

  async takePhoto(image): Promise<void> {
    // console.log( );
    if (this.side === 'placeholder') {
      localStorage.setItem('dni-placeholder',  image);
      window.open('/funnel/dni-detector?side=placeholder-inverse', '_self');
    } else {
      localStorage.setItem('dni-reverse', image);
      this.loading = true;

      const formData = {
        IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
        FotoDocAdverso: localStorage.getItem('dni-placeholder'),
        FotoDocReverso: image,
      };

      this.dataService.financialSaveDni(formData).subscribe(async (response: any) => {
        if (response.IdError === 0) {
          localStorage.setItem('IdConsulta', response.IdConsulta);
          localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);

          this.loading = false;
          // set IdConsulta
          const url = screens[response.IdPantalla];
          // await this.router.navigateByUrl(url);
          window.open(url, '_self');
        } else {
          this.openSnackBar(response.Mensaje, 'Cerrar');
          this.loading = false;
        }
      });
    }
  }

}
