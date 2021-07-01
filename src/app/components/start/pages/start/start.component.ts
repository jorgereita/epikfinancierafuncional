import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  loginForm: FormGroup;
  authorizationForm: FormGroup;
  submitted = false;
  @Input() type: string;
  hide: boolean;
  dataImg: any;
  error: any;
  mensaje: any;
  version = environment.version;
  private loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    // private dataService: DataService,
  ) {
    // Initialize storage
    localStorage.clear();

    this.loginForm = this.formBuilder.group({
      Usuario: ['', [Validators.required]],
      Clave: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.authorizationForm = this.formBuilder.group({
      Autorizacion: [false, []],
    });
  }

  get f() { return this.loginForm.controls; }

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    const formData = this.loginForm.value;
    console.log(formData);

    if (formData.Usuario === 'administrador') {
      localStorage.setItem('path', 'latest');
    }

    if (formData.Usuario === 'asesor@epik.com.co') {
      localStorage.setItem('path', 'other');
    }

    // await this.router.navigateByUrl('/funnel/agent-home');

    this.submitted = true;
    this.loading = true;
    sessionStorage.setItem('email', this.f.Usuario.value);
    this.authService.authenticate(this.f.Usuario.value, this.f.Clave.value).subscribe(res => {
      if (res.IdError === 2) {

        this.mensaje = 'Se ha generado un error. Intente de nuevo';
        this.error = true;
        this.submitted = false;
        this.loading = false;
        return;
      }

      if (res.IdError === 1) {

        this.mensaje = 'Usuario y/o contraseña erronea';
        this.error = true;
        this.submitted = false;
        this.loading = false;
        return;
      }
      if (res.IdError !== 0 ) {

        this.mensaje = res.Mensaje;
        this.error = true;
        this.submitted = false;
        this.loading = false;
        return;
      }

      localStorage.setItem('token', res.JWT);
      localStorage.setItem('expired', res.Expiracion.toString());
      localStorage.setItem('roleId', res.IdPerfil.toString());
      // this.router.navigate(["/home"]);

      // 1 puede seguir
      // 2 no esta enrolado
      // 0 no foto hoy
      // -1 no requerido

      if (!res.CambioClave) {
        localStorage.removeItem('token');
        sessionStorage.setItem('lastPass', this.f.Clave.value);
        this.router.navigateByUrl(`/account/${res.JWT}?validate=ok`);
      } else {
        const idTokenFace = (parseInt(localStorage.getItem('expired'), 10)) * 2;
        localStorage.setItem('idTokenFace', idTokenFace.toString() );
        localStorage.setItem('datauser', JSON.stringify(res));
        this.router.navigate(['/funnel/initial-query']);
      }
      // if (res.Identificado == 1 ||res.Identificado == -1) {

      // }
      // if (res.Identificado == 2) {
      //   this.mensaje = "El Usuario no se encuentra enrolado , contactese con el area de RH.";
      //   this.error = true;
      //   this.submitted = false;
      //   this.loading = false;
      //   return;
      // }

      // if (res.Identificado == 0) {
      //   var idTokenFace=(parseInt(localStorage.getItem("expired")))*4;
      //   localStorage.setItem("idTokenFace",idTokenFace.toString() );
      //    this.router.navigate(["/facematch"]);
      // }


    }, err => {
      this.mensaje = 'Se ha generado un error. Intente de nuevo';
      this.submitted = false;
      this.loading = false;
      this.error = true;
    });
  }
}
