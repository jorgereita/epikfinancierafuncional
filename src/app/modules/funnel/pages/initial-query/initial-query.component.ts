import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {blackListedUsers, cleanData, whiteListedUsers} from '../../../../utils/utils';
import { screens } from 'src/app/utils/screens';

@Component({
  selector: 'app-initial-query',
  templateUrl: './initial-query.component.html',
  styleUrls: ['./initial-query.component.scss']
})
export class InitialQueryComponent implements OnInit {

  basicDataForm: FormGroup;
  personalInfoForm: FormGroup;
  documentTypes: Array<any> = [
    {
      Id: '1',
      Descripcion: 'Cédula de ciudadanía',
    },
    {
      Id: '2',
      Descripcion: 'Cédula de extranjería',
    },
    {
      Id: '3',
      Descripcion: 'NIT',
    }
  ];
  loading = false;
  firstPart = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.personalInfoForm = this.formBuilder.group({
      // IdTipoIdentificacion: ['1', [Validators.required]],
      NumeroIdentificacion: ['', [Validators.required]],
      // Autorizacion: [true, [Validators.required]],
      // AutorizacionOtras: [true, [Validators.required]]
      // Telefono: ['', [Validators.required]],
      // Direccion: ['', [Validators.required]],
      // Correo: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    });

    this.basicDataForm = this.formBuilder.group({
      PrimerNombre: ['', [Validators.required]],
      SegundoNombre: ['', []],
      PrimerApellido: ['', [Validators.required]],
      SegundoApellido: ['', []],
    });
  }

  ngOnInit(): void {
    // cleanData();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  sendBasicData(): void {
    this.firstPart = false;
  }

  async sendData(): Promise<void> {
    this.loading = true;
    // Do stuff here
    const formData = {
      IdTipoIdentificacion: '1',
      ...this.personalInfoForm.value,
    };

    localStorage.setItem('NumeroIdentificacion', this.personalInfoForm.value.NumeroIdentificacion);

    // if (this.isValidUser()) {
    //   const whiteUsers = whiteListedUsers.filter(u => u.NumeroIdentificacion === formData.NumeroIdentificacion);
    //   if (whiteUsers.length > 0) {
    //     localStorage.setItem('userData', JSON.stringify(whiteUsers[0]));
    //     await this.router.navigateByUrl('/funnel/query-loan-success');
    //   } else {
    //     await this.router.navigateByUrl('/funnel/auth-data');
    //   }
    // } else {
    //   await this.router.navigate(['/funnel/finish-flow'], { queryParams: { message: 'El usuario no es sujeto de crédito' }, state: { data: { isOk: false, } } });
    // }

    // Crete new user
    this.dataService.financialGetUserInfo(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        localStorage.setItem('userData', JSON.stringify(response));
        localStorage.setItem('IdConsulta', response.IdConsulta);
        localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);

        this.loading = false;
        // set IdConsulta
        if(response.PermiteCotizar){
          await this.router.navigateByUrl('simulation');
          // await this.router.navigateByUrl('finish-flow');
          
        }else{
          const url = screens[response.IdPantalla];
          await this.router.navigateByUrl(url);
        }
       
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }

  private isValidUser(): boolean {

    const dni = localStorage.getItem('NumeroIdentificacion');

    if (blackListedUsers.includes(dni)) {
      return false;
    }

    return true;
  }
}
