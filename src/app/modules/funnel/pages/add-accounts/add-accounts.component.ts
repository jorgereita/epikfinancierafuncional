import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-accounts',
  templateUrl: './add-accounts.component.html',
  styleUrls: ['./add-accounts.component.scss']
})
export class AddAccountsComponent implements OnInit {

  loading = false;
  selected: string;
  addAccountForm: FormGroup;
  terms = [
    {
      Id: 1,
      Descripcion: 'El día 5 de cada mes',
    },
    {
      Id: 2,
      Descripcion: 'El día 10 de cada mes',
    },
    {
      Id: 3,
      Descripcion: 'El día 15 de cada mes',
    },
    {
      Id: 4,
      Descripcion: 'El día 20 de cada mes',
    },
    {
      Id: 5,
      Descripcion: 'El día 25 de cada mes',
    },
    {
      Id: 6,
      Descripcion: 'El día 30 de cada mes',
    }
  ];
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
    this.addAccountForm = this.formBuilder.group({
      Fecha: ['5', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  async sendData(): Promise<void> {
    // this.loading = true;
    // // Do stuff here
    // const formData = {
    //   selected: this.selected,
    //   // ...this.addAccountForm.value,
    // };

    // console.log(formData);

    // setTimeout(async () => {
    //   this.loading = false;
    //   // await this.router.navigateByUrl('/funnel/discounted-accounts');
    //   await this.router.navigateByUrl('/funnel/simulation');
    // }, 1500);

    // this.dataService.newUser(formData).subscribe(async (response: any) => {
    //   if (response.IdError === 0) {
    //     localStorage.setItem('userDataTemp', JSON.stringify(formData));
    //     await this.router.navigateByUrl('/funnel/biometric');
    //     this.loading = false;
    //   } else {
    //     this.openSnackBar(response.Mensaje, 'Cerrar');
    //     this.loading = false;
    //   }
    // });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  async skip(): Promise<void> {
 

    let formData = {
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion,
      "IdDatoCuenta":0,
      "ClientePasa": true
    }
    this.loading = true;
    this.dataService.guardarInfoRecaudo(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        this.loading = false;
        if (response.IdEstado == 7) {
          localStorage.setItem('userData', JSON.stringify(response));
          await this.router.navigateByUrl('/funnel/status');
        } else {
          this.openSnackBar(response.Mensaje, 'Cerrar');
        }

      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
}
