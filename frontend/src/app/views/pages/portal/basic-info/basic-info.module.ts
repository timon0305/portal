import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasicInfoComponent} from "./basic-info.component";
import {RouterModule} from '@angular/router';
// @ts-ignore
import {
	MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
	MatFormFieldModule, MatIconModule,
	MatInputModule,
	MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule,
	MatTableModule, MatTabsModule, MatTooltipModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
  	BasicInfoComponent
  ],
  imports: [
    CommonModule,
	  MatButtonModule,
	  MatFormFieldModule,
	  MatTableModule,
	  MatInputModule,
	  MatPaginatorModule,
	  MatIconModule,
	  MatTooltipModule,
	  FormsModule,
	  ReactiveFormsModule,
	  MatRadioModule,
	  MatProgressSpinnerModule,
	  MatDialogModule,
	  MatSelectModule,
	  MatCheckboxModule,
	  MatTabsModule,
	  MatCardModule,
	  RouterModule.forChild([
		  {
			  path: '',
			  component: BasicInfoComponent,
		  }
	  ]),
  ]
})
export class BasicInfoModule { }
