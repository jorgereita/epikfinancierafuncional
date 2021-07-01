import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-birth',
  templateUrl: './birth.component.html',
  styleUrls: ['./birth.component.scss']
})
export class BirthComponent implements OnInit {
  loading = false;
  dataForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.dataForm = this.formBuilder.group({
      Ciudad: ['', [Validators.required]],
      FechaNacimiento: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  async sendData(): Promise<void> {
    this.loading = true;
    // Do stuff here
    const formData = this.dataForm.value;

    console.log(formData);

    setTimeout(() => this.loading = false, 1500);

    await this.router.navigateByUrl('/funnel/occupation');

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

}
