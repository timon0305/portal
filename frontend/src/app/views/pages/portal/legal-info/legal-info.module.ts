import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {LegalInfoComponent} from "./legal-info.component";



@NgModule({
  declarations: [LegalInfoComponent],
  imports: [
    CommonModule,
	  RouterModule.forChild([
		  {
			  path: '',
			  component: LegalInfoComponent
		  }
	  ])
  ]
})
export class LegalInfoModule { }
