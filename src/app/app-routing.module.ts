import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {StartComponent} from './components/start/pages/start/start.component';
import { NoAuthGuard } from './no-auth.guard';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'sign',
    loadChildren: () => import('./modules/sign/sign-routing.module').then(mod => mod.SignRoutingModule),
  },
  {
    path: 'funnel',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/funnel/funnel-routing.module').then(mod => mod.FunnelRoutingModule),
  },
  {
    path: 'fingerprint',
    loadChildren: () => import('./modules/fingerprint/fingerprint.module').then(mod => mod.FingerprintModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
