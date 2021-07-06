import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = environment.baseUrl;
  externalBaseUrl = environment.externalBaseUrl;

  constructor(private httpClient: HttpClient) {

  }

  list(): any {
    return this.httpClient.get<any>(this.baseUrl + '/api/values/list');
  }

  catalogos(): any {
    return this.httpClient.get<any>(this.baseUrl + '/api/catalogo/lista');
  }

  newUser(data): any {
    return this.httpClient.post<any>(this.baseUrl + 'api/consulta/registra-usuario', data);
  }

  sendConfirmEmail(data): any {
    return this.httpClient.post<any>(this.baseUrl + 'api/consulta/correo-confirmacion', data);
  }

  validateEmail(data): any {
    return this.httpClient.post<any>(this.baseUrl + 'api/consulta/validar-confirmacion', data);
  }

  sendOTP(data): any {
    return this.httpClient.post<any>(this.baseUrl + 'api/consulta/generar-otp', data);
  }

  validateOTP(data): any {
    return this.httpClient.post<any>(this.baseUrl + 'api/consulta/validar-otp', data);
  }

  validatePhoto(data): any {
    return this.httpClient.post<any>(this.baseUrl + 'api/consulta/validar-foto', data);
  }

  getOlimpiaOtp(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/demo/validar-identidad', data);
  }

  getOlimpiaBankNote(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/demo/validar-documentos', data);
  }

  sendQuoteViaWapp(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/demo/enviar-whatsapp', data);
  }

  financialGetUserInfo(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cli/registrar', data);
  }

  financialUserAgreement(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cli/acepta-megabase', data);
  }

  financialUserDataManipulationAgreement(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cli/autorizar-datos', data);
  }

  financialUpdateUserData(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cli/actualizar-datos', data);
  }

  financialSaveSelfie(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cli/guardar-foto-perfil', data);
  }

  financialSaveDni(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cli/guardar-foto-documento', data);
  }

  financialSaveFingerprint(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cli/guardar-huella', data);
  }

  financialSaveExtraVariables(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cli/guardar-variables-extra', data);
  }

  financialCentralAuthorization(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cli/autorizar-centrales', data);
  }

  financialSendWapp(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cli/whatspp-cuota-demo', data);
  }
  cotizador(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/com/cotizador', data);
  }
  okCompra(data) {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cli/cliente-compra', data);
  }
  guardarSimulacion(data) {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/com/guardar-simulacion', data);
  }
  preguntarCuotasWhastapp(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/com/validar-aceptar-simulacion', data);
  }
  guardarInfoRecaudo(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/com/guardar-informacion-recaudo', data);
  }
  generarDocs(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/com/generar-documentos', data);
  }
  enviarDocs(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/com/enviar-documentos', data);
  }
  validarDocs(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/com/validar-documentos', data);
  }
  verifyPagare(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/com/validar-firma-documentos', data);
  }
}
