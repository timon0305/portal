import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {PortalDashboardComponent} from "./portal-dashboard.component";



@NgModule({
  declarations: [PortalDashboardComponent],
  imports: [
    CommonModule,
	  RouterModule.forChild([
		  {
			  path: '',
			  component: PortalDashboardComponent
		  }
	  ])
  ]
})
export class PortalDashboardModule { }
