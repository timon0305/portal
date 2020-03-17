import { Component, OnInit } from '@angular/core';
import {AuthService, FileService} from "../../../../core/auth/_services";

@Component({
  selector: 'kt-property-info',
  templateUrl: './property-info.component.html',
  styleUrls: ['./property-info.component.scss']
})
export class PropertyInfoComponent implements OnInit {


	id: string;
	username: string;
	role: string;
	property: Property[] = [];
  constructor(
	  private getUserService: AuthService,
	  private fileService: FileService,

  ) { }

  ngOnInit() {
	  this.username = localStorage.getItem('username');
	  this.role = localStorage.getItem('role');
	  this.id = localStorage.getItem('id');
	  this.getUserService.get_Costomer_Property(this.id).subscribe( result => {
	  	console.log('result-------', result);
	  	let temp = [];
	  	let mode_temp = {};

		  Object.keys(result).forEach(function (key) {
			  mode_temp['contract_date'] = result[key]['contract_date'];
			  mode_temp['pea_file'] = result[key]['pea_file'];
			  mode_temp['keys'] = result[key]['keys'];
			  temp.push(mode_temp);
			  mode_temp = {};
		  });
		  this.property = temp;
		  console.log("property________", this.property);
	  });
  }

}

export interface Property {
	contract_date: string;
	pea_file: string;
	keys: string;

}
