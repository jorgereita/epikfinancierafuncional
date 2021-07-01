import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  data: any;
  showSender = false;
  loading = false;
  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit(): void {
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  sendMatDoc(){
    let formData = {
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion,
    }
    this.loading = true;
    this.dataService.generarDocs(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        this.loading = false;
        if (response.IdEstado == 8) {
         
          await this.router.navigateByUrl('/funnel/documents');
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
