import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService, FileService} from "../../../../../core/auth/_services";

@Component({
  selector: 'kt-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.scss']
})
export class EditCustomersComponent implements OnInit {

	id: string;
	name: string;
	fromPage: any;
	constructor(
		public dialogRef: MatDialogRef<EditCustomersComponent>,
		private formBuilder: FormBuilder,
		private userService: AuthService,
		private fileUploadService: FileService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.fromPage = this.data.detail_data;
	}
	legal_file_name: File;
	customer_file_name: File;
	custom_editForm: FormGroup;
	submitted = false;
	user_file: File;
	legal_file: File;

	ngOnInit() {
		this.legal_file_name = this.fromPage.legal_info ? this.fromPage.legal_info['pre_contract'] : '';
		this.customer_file_name = this.fromPage['pre_contract'];
		this.custom_editForm = this.formBuilder.group({
			customer_no: [this.fromPage.customer_no, Validators.required],
			name: [this.fromPage.name, Validators.required],
			email: [this.fromPage.email, [Validators.required, Validators.email]],
			password: [''],
			customer_type: [this.fromPage.customer_type, Validators.required],
			pre_contract: [this.fromPage.pre_contract, [Validators.required]],
			pre_contract_date: [this.fromPage.pre_contract_date, [Validators.required]],
			purchase_contract: [this.fromPage.purchase_contract, Validators.required],
			pre_contract_legal: [this.fromPage.pre_contract_legal],
			pre_contract_date_legal: [this.fromPage.legal_info ? this.fromPage.legal_info.pre_contract_date:''],
			acceptTerms: [false, Validators.requiredTrue]
		});
	}



	get f() { return this.custom_editForm.controls; }

	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.custom_editForm.invalid) {
			return;
		}

		// display form values on success
		this.custom_editForm.value['original_id'] = this.fromPage['original_id'];
		console.log('original Id--',this.custom_editForm.value);
		this.userService.customer_edit(this.custom_editForm.value)
			.subscribe(result => {

				this.id = result['success'];
				if(this.user_file)
				{
					this.fileUploadService.postFile(this.user_file, this.custom_editForm.value['original_id']).subscribe(data => {
						if(!this.legal_file) {
							alert('success');
							window.history.go(0);
						}
						else {
							this.fileUploadService.getLegalFile(this.legal_file, this.custom_editForm.value['original_id']).subscribe(data => {
								 alert('success');
								// console.log(data)
								 window.history.go(0);
								// this.fileUploadService.legal_FileUpload(this.files, this.id)
							}, error => {
								console.log(error);
							});
						}
					}, error => {
						console.log(error);
					});
				}
				else
				{
					if(!this.legal_file) {
						alert('success');
						window.history.go(0);
					}
					else {
						this.fileUploadService.getLegalFile(this.legal_file, this.custom_editForm.value['original_id']).subscribe(data => {
							alert('success');
							// console.log(data)
							window.history.go(0);
							// this.fileUploadService.legal_FileUpload(this.files, this.id)
						}, error => {
							console.log(error);
						});
					}
				}
			});

	}

	uploadFileToActivity(ev) {
		console.log(ev.target.files[0]);
		this.user_file = ev.target.files[0];
	}

	uploadFileLegalActivity(event) {
		console.log(event.target.files[0]);
		this.legal_file = event.target.files[0];
	}
	onReset() {
		this.submitted = false;
		this.custom_editForm.reset();
	}
}
export class NgbdTabsetJustify {
	currentJustify = 'start';
}
