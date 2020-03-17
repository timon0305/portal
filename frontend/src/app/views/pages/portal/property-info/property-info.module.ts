import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {PropertyInfoComponent} from "./property-info.component";
import {
	MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
	MatFormFieldModule, MatIconModule,
	MatInputModule,
	MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule,
	MatTableModule, MatTabsModule, MatTooltipModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
	  PropertyInfoComponent
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
			  component: PropertyInfoComponent,
		  }
	  ]),
  ]
})
export class PropertyInfoModule { }
