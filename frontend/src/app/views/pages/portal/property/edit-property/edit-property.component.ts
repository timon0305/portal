import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService, FileService} from "../../../../../core/auth/_services";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
	selector: 'kt-edit-property',
	templateUrl: './edit-property.component.html',
	styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {

	name = [];
	file: File;
	fromPage: any;
	edit_Property: FormGroup;
	submitted = false;
	files: File[] = [];
	toppingList = [];
	original_filename:File;
	input_status = false;
	id: string;
	constructor(
		public dialogRef: MatDialogRef<EditPropertyComponent>,
		private formBuilder: FormBuilder,
		private userService: AuthService,
		private fileUploadService: FileService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.fromPage = this.data.detail_data[0];
		this.original_filename = this.data.detail_data[0]['pea_file'];
		this.edit_Property = this.formBuilder.group({
			name: [ this.fromPage.name, Validators.required],
			contract_start: [this.fromPage.contract_start, Validators.required],
			pea_file: [''],
			keys: [this.fromPage.keys, [Validators.required]],
			acceptTerms: [false, Validators.requiredTrue]
		});
	}


	ngOnInit() {
		this.userService.getOwnerName().subscribe(customer => {
			for (let i = 0; i < customer['names'].length; i++) {
				console.log(customer['names'][i]);
				this.toppingList.push(customer['names'][i]);
			}

		});

	}

	get f() {
		return this.edit_Property.controls;
	}

	onSubmit(id) {
		this.submitted = true;
		if (this.edit_Property.invalid) {
			return;
		}
		this.edit_Property.value['id'] = id;
		this.userService.update_Property(this.edit_Property.value)
			.subscribe(result => {
				console.log("updating Result", result);
				this.id = result['id'];

				if (this.file)
				{
					this.fileUploadService.property_postFile(this.file, this.id).subscribe(data => {
						alert('success');
						window.history.go(0);
					}, error => {
						console.log(error);
						alert('not file uploaded')
					});
				}
				else
				{
					alert('success');
					window.history.go(0);
				}

			});

	}

	onReset() {
		this.submitted = false;
		this.edit_Property.reset();
	}
	uploadFileToActivity(ev) {
		console.log(ev.target.files[0]);
		this.file = ev.target.files[0];
	}

	showInputbutton() {
		this.input_status = true;
	}
}

