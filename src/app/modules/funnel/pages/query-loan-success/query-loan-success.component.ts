import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { availableAmount } from 'src/app/utils/utils';
import {screens} from '../../../../utils/screens';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
@Component({
  selector: 'app-query-loan-success',
  templateUrl: './query-loan-success.component.html',
  styleUrls: ['./query-loan-success.component.scss']
})
export class QueryLoanSuccessComponent implements OnInit {
  loading: any;
  data: any;
  availableAmount = availableAmount;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit(): void {
    registerLocaleData(es);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  async finishFlow(): Promise<void> {
    await this.router.navigate(['/funnel/finish-flow'], { queryParams: { message: 'El usuario rechazó la solicitud' }, state: { data: { isOk: false, } } });
  }

  async continue(): Promise<void> {
    const formData = {
      IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
      Acepta: true,
    };
    this.dataService.financialUserAgreement(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        localStorage.setItem('IdConsulta', response.IdConsulta);
        localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);

        this.loading = false;
        const url = screens[response.IdPantalla];
        await this.router.navigateByUrl(url);
        // set IdConsulta
        // if(response.PermiteCotizar){
        //   await this.router.navigateByUrl('simulation');
        //   // await this.router.navigateByUrl('finish-flow');
          
        // }else{
     
        // }
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
    // await this.router.navigateByUrl('/funnel/auth-data');
  }
}
