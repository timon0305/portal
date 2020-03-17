import {Component, OnInit} from '@angular/core';
import {AuthService, FileService} from "../../../../core/auth/_services";
import {saveAs} from "file-saver";
import {Property} from "../property-info/property-info.component";

@Component({
	selector: 'kt-legal-info',
	templateUrl: './legal-info.component.html',
	styleUrls: ['./legal-info.component.scss']
})
export class LegalInfoComponent implements OnInit {
	id: string;
	username: string;
	role: string;

	legal: Legal[] = [];
	pre_contract: string;
	pre_contract_date: string;

	constructor(
		private getUserService: AuthService,
		private fileService: FileService,
	) {

	}

	ngOnInit() {

		this.username = localStorage.getItem('username');
		this.role = localStorage.getItem('role');
		this.id = localStorage.getItem('id');
		let temp = [];
		let mode_temp = {};
		this.getUserService.getLegalInfo(this.id).subscribe(response => {
			console.log('legal_response--', response);
			if (response['success'] !== false) {
				this.pre_contract = response['legal'][0]['pre_contract'];
				this.pre_contract_date = response['legal'][0]['pre_contract_date'];
			}
			else {
				this.pre_contract = '';
				this.pre_contract_date = '';
			}
			temp.push(mode_temp);
			mode_temp = {};
		});
		this.legal = temp;
	}

	legal_fileDownload(index) {
		// console.log(index);
		this.fileService.legal_FileDownload(index).subscribe((resp: any) => {
			console.log(resp);
			if (resp)
				saveAs(resp, this.pre_contract);
			else
				console.log("File not existed!");
		});
	}
}

export interface Legal {
	pre_contract: string;
	pre_contract_date: string
}
