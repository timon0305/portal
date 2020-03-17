import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomersComponent} from './customers.component';
import {
	MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
	MatFormFieldModule, MatIconModule,
	MatInputModule,
	MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule,
	MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { EditCustomersComponent } from './edit-customers/edit-customers.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
  	CustomersComponent,
  	AddCustomersComponent,
  	EditCustomersComponent,
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
	  MatCardModule,
	  MatTabsModule,
	  MatDatepickerModule,
	  RouterModule.forChild([
		  {
		  	path: '',
			  component: CustomersComponent
		  }
	  ])
  ],
	exports: [
		MatButtonModule,
		MatFormFieldModule,
	],
	entryComponents: [AddCustomersComponent, EditCustomersComponent]
})
export class CustomersModule { }
