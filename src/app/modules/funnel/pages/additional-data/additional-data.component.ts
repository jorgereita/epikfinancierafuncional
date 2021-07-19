import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {codigoCIIUList, incomeList, laboralAntiquityList, occupationList} from 'src/app/utils/utils';
import {screens} from '../../../../utils/screens';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
@Component({
  selector: 'app-additional-data',
  templateUrl: './additional-data.component.html',
  styleUrls: ['./additional-data.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class AdditionalDataComponent implements OnInit {
  loading: any;
  additionalDataForm: FormGroup;
  incomeList: Array<any> = incomeList;
  occupationList: Array<any>;
  laborarlAntiquityList: Array<any>;
  ciiuCodeList: Array<any> = codigoCIIUList;
  MonedaExtranjera: any;
  Pep: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    this.loadData();
    this.additionalDataForm = this.formBuilder.group({
      IngresoMensual: ['', Validators.required],
      CodigoCIIU: ['', Validators.required],
      IdActividadEconomica: ['', Validators.required],
      IdAntiguedadLaboral: ['', Validators.required],
      Pep: ['', Validators.required],
      MonedaExtranjera: ['', Validators.required],
      PrimerApellido: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  forzarFecha(picker: MatDatepicker<Date>) {
    picker.open();
  }
  loadData(): void {
    this.dataService.catalogos().subscribe(data => {
      if (data.IdError == 0) {
        for (var e in data.Lista) {
          if (data.Lista[e].TipoCatalogo === "Ocupacion") {
            this.occupationList = data.Lista[e].Catalago;
          }
          if (data.Lista[e].TipoCatalogo === "Antiguedad Laboral") {
            this.laborarlAntiquityList = data.Lista[e].Catalago;
          }
          if (data.Lista[e].TipoCatalogo === "Actividades CIIU") {
            this.ciiuCodeList = data.Lista[e].Catalago;
          }
        }
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  sendData(): void {
    console.log(this.Pep, this.MonedaExtranjera);
    this.loading = true;

    const formData = {
      IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
      ...this.additionalDataForm.value,
      // PEP: this.Pep,
      // MonedaExtranjera: this.MonedaExtranjera,
    };
     
    this.dataService.financialSaveExtraVariables(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        localStorage.setItem('IdConsulta', response.IdConsulta);
        localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);
        localStorage.setItem('userData', JSON.stringify(response));
        this.loading = false;
        // set IdConsulta
        const url = screens[response.IdPantalla];
        await this.router.navigateByUrl(url);
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });

    // setTimeout(() => this.router.navigateByUrl('/funnel/authorization'), 1000);
  }
}
