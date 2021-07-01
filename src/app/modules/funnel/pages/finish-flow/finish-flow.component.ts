import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { cleanData } from '../../../../utils/utils';

@Component({
  selector: 'app-finish-flow',
  templateUrl: './finish-flow.component.html',
  styleUrls: ['./finish-flow.component.scss']
})
export class FinishFlowComponent implements OnInit {

  message: string;
  isOk: boolean;
  title: string;
  loading: boolean;
  userData;
  ccType
  cupo
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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.message = this.route.snapshot.queryParams.message;
    this.title = this.route.snapshot.queryParams.title;
    this.isOk = history?.state?.data?.isOk || false;
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.ccType = this.documentTypes.find(key => key.Id == this.userData.IdTipoIdentificacion).Descripcion;
    this.cupo = parseInt(this.userData.Cupo);
  }

  async goHome(): Promise<void> {
    this.cleanData();
    await this.router.navigate(['/funnel/agent-home']);
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  private cleanData(): void {
    cleanData();
  }
  sendOkCompra(): void {
    let formData =  {
      "IdConsulta": this.userData.IdConsulta,
      "AceptaComprar": 1
  }
  this.loading = true;
    this.dataService.okCompra(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        localStorage.setItem('userData', JSON.stringify(response));
        this.loading = false;
        await this.router.navigateByUrl('simulation');
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
}
