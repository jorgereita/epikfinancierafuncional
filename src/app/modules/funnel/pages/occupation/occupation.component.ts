import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss']
})
export class OccupationComponent implements OnInit {
  loading = false;
  selected: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async sendData(): Promise<void> {
    this.loading = true;
    // Do stuff here
    const formData = {
      selected: this.selected,
    };

    console.log(formData);

    setTimeout(async () => {
      this.loading = false;
      await this.router.navigateByUrl('/funnel/choose-amount');
    }, 1500);

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
