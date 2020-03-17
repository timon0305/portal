import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from './_helpers/must-match.validator';
import {AuthService} from '../../../../../core/auth/_services';
import {FileService} from '../../../../../core/auth/_services';

@Component({
  selector: 'kt-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss']
})

export class AddCustomersComponent implements OnInit {
	animal: string;
	name: string;
	user_file: File;
	legal_file: File;
	files: File;
	id: string;
	constructor(
		public dialogRef: MatDialogRef<AddCustomersComponent>,
		private formBuilder: FormBuilder,
		private userService: AuthService,
		private fileUploadService: FileService
	) {}


	custom_registerform: FormGroup;
	submitted = false;


	ngOnInit() {
		this.custom_registerform = this.formBuilder.group({
			customer_no: ['', Validators.required],
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', Validators.required],
			customer_type: ['', Validators.required],
			pre_contract: ['', [Validators.required]],
			pre_contract_date: ['', [Validators.required]],
			purchase_contract: ['', Validators.required],
			pre_contract_legal: [''],
			pre_contract_date_legal: [''],
			acceptTerms: [false, Validators.requiredTrue]
		}, {
			validator: MustMatch('password', 'confirmPassword')
		});
	}
	get f() { return this.custom_registerform.controls; }

	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.custom_registerform.invalid) {
			return;
		}
		console.log(this.custom_registerform.value['pre']);
		this.userService.custom_register(this.custom_registerform.value)
			.subscribe(result => {
				console.log(result);
				this.id = result['success'];
				this.fileUploadService.postFile(this.user_file, this.id).subscribe(data => {
					if(!this.legal_file) {
						alert('success');
						window.history.go(0);
					}
					else {
						this.fileUploadService.getLegalFile(this.legal_file, this.id).subscribe(data => {
							alert('success');
							window.history.go(0);
							// this.fileUploadService.legal_FileUpload(this.files, this.id)
						}, error => {
							console.log(error);
						});
					}
				}, error => {
					console.log(error);
				});

			});
	}

	onReset() {
		this.submitted = false;
		this.custom_registerform.reset();
	}

	uploadFileToActivity(ev) {
		console.log(ev.target.files[0]);
		this.user_file = ev.target.files[0];
	}

	uploadFileLegalActivity(event) {
		console.log(event.target.files[0]);
		this.legal_file = event.target.files[0];
	}
}
