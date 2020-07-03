import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'primeng/chart';

import { SharedModule } from '../shared/shared.module'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    
    ChartModule,

    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
