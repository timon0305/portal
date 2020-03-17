import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
	MatFormFieldModule, MatIconModule,
	MatInputModule,
	MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule,
	MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {PropertyComponent} from './property.component';
import {AddPropertyComponent} from './add-property/add-property.component';
import {EditPropertyComponent} from './edit-property/edit-property.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MultiSelectModule} from '@syncfusion/ej2-angular-dropdowns';
import {ButtonModule} from '@syncfusion/ej2-angular-buttons';


@NgModule({
	declarations: [
		PropertyComponent,
		AddPropertyComponent,
		EditPropertyComponent,
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
		Ng2SearchPipeModule,
		NgbModule,
		MultiSelectModule, ButtonModule,
		RouterModule.forChild([
			{
				path: '',
				component: PropertyComponent,
			}
		])
	],
	exports: [
		MatButtonModule,
		MatFormFieldModule,
	],
	entryComponents: [AddPropertyComponent, EditPropertyComponent],
	bootstrap: [PropertyComponent]
})
export class PropertyModule {
}
