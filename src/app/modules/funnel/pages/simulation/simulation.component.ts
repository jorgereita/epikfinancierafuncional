import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { availableAmount, getQuote } from 'src/app/utils/utils';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import * as _ from 'lodash';
@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  amountForm: FormGroup;
  calcform: FormGroup;
  terms: Array<any> = [
    {
      Id: 1,
      Descripcion: '6 meses',
    },
    {
      Id: 2,
      Descripcion: '12 meses',
    },
    {
      Id: 3,
      Descripcion: '18 meses',
    },
    {
      Id: 4,
      Descripcion: '24 meses',
    },
    {
      Id: 5,
      Descripcion: '36 meses',
    },
    {
      Id: 6,
      Descripcion: '48 meses',
    },
    {
      Id: 7,
      Descripcion: '60 meses',
    },
  ];
  ciclosFac = [{ FechaFacturacion: '', IdCicloFacturacion: '' }];
  RespuestaSimulaciones = [{ IdSimulador: '', SimuladortTexto: '' }]
  loading = false;
  data: any;
  panelOpenState = false;
  seePlan = false;
  quotes: Array<any>;
  payout: any;
  income: any;
  availableAmount;
  showDetails = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dataService: DataService,
  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
    this.payout = this.route.snapshot.queryParams.payout || null;
    this.income = this.route.snapshot.queryParams.income || null;
    this.availableAmount = parseInt(this.data.Cupo) || availableAmount;

    this.calcform = this.formBuilder.group({
      Cuotas: ['', [Validators.required,]],
      Tiempo: ['', [Validators.required,]],
    });
    this.amountForm = this.formBuilder.group({
      Monto: [this.availableAmount, [Validators.required, Validators.min(400000), Validators.max(this.availableAmount)]],
    });
  }

  ngOnInit(): void {
    registerLocaleData( es );
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  async calcCouta(): Promise<void> {
    this.loading = true;
    let formData = {
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion,
      "CupoSolicitado": this.amountForm.value.Monto
    };

    this.dataService.cotizador(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        this.showDetails = true;
        localStorage.setItem('userData', JSON.stringify(response));
        this.ciclosFac =_.orderBy(response.CiclosFacturacion, ['IdCicloFacturacion'], ['desc']);
        this.RespuestaSimulaciones = response.RespuestaSimulaciones;
        this.loading = false;
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
        this.showDetails = false;
      }
    });

  }
  async sendCouta(): Promise<void> {
    let formData = {
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion,
      "IdSimulador": this.calcform.value.Cuotas,
      "IdCicloFacturacion": this.calcform.value.Tiempo
  }

    this.dataService.guardarSimulacion(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        if(response.IdEstado==4){
          await this.router.navigateByUrl('/funnel/whatsappquote');
        }else{
          this.openSnackBar(response.Mensaje, 'Cerrar');
        }
        
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }

  async sendViaWapp(): Promise<void> {
    this.loading = true;

    localStorage.setItem('requestMoney', this.amountForm.value.Monto);
    await this.router.navigateByUrl('/funnel/choose-amount');

    this.loading = false;
  }

  async finish(): Promise<void> {
    await this.router.navigate(['/funnel/finish-flow'], { queryParams: { message: 'Proceso finalizado por el cliente' }, state: { data: { isOk: false, } } });
  }
}
