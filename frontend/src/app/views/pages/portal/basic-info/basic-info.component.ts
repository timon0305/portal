import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../core/auth/_services";
import { saveAs } from 'file-saver';
import { FileService} from '../../../../core/auth/_services';
@Component({
  selector: 'kt-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

	id: string;
	username: string;
	role: string;
	customer_no: string;
	customer_name: string;
	email: string;
	customer_type: string;
	pre_contract: string;
	pre_contract_date: string;
	purchase_contract: string;

	constructor(
	  private getUserService: AuthService,
	  private fileService: FileService,
  ) { }

  ngOnInit() {
		this.username = localStorage.getItem('username');
	  this.role = localStorage.getItem('role');
	  this.id = localStorage.getItem('id');
	  // @ts-ignore
	  this.getUserService.getBasicUser(this.id).subscribe( result => {
		console.log(result);
		this.customer_no = result['customer'][0]['customer_no'];
		this.customer_name = result['customer'][0]['name'];
		this.email = result['customer'][0]['email'];
		this.customer_type = result['customer'][0]['customer_type'];
		this.pre_contract = result['customer'][0]['pre_contract'];
		this.pre_contract_date = result['customer'][0]['pre_contract_date'];
		this.purchase_contract = result['customer'][0]['purchase_contract'];
	  })
	}
	fileDownload(index) {
		this.fileService.fileDownload(index).subscribe((resp: any) => {
			if(resp)
				saveAs(resp, this.pre_contract);
			else
				console.log("file is not existed");


		});
	}
}

