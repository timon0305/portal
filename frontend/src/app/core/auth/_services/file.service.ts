import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import {saveAs} from "file-saver";


const BASE_URL = 'http://localhost:81/api/';

@Injectable({
	providedIn: 'root'
})
export class FileService {


	constructor(
		private httpClient: HttpClient,
		private http: HttpClient,
	)  { }

	postFile(fileToUpload: File, id: string): Observable<Object> {
		const endpoint = BASE_URL + 'upload';
		const formData: FormData = new FormData();
		formData.append('file', fileToUpload, fileToUpload.name);
		formData.append('id', id);
		console.log(fileToUpload);
		return this.httpClient.post(endpoint, formData);
	}

	getFile(): Observable<Object> {
		return this.http.get(BASE_URL + 'getAllFile', {});
	}

	fileDownload(index): Observable<Object> {
		return this.http.post(BASE_URL + 'basic_info_download', {"customer_id": index},{responseType:'blob'});
	}

	// getPropertyFile(email: string): Observable<Object> {
	// 	const endpoint = BASE_URL + 'legal_down';
	// 	const formData: FormData = new FormData();
	// 	formData.append('file', fileToUpload, fileToUpload.name);
	// 	formData.append('email', email);
	// 	console.log(fileToUpload);
	// 	return this.httpClient.post(endpoint, formData);
	// }

	getLegalFile(fileToUpload: File, id: string): Observable<Object> {
		const endpoint = BASE_URL + 'legal_fileupload';
		const formData: FormData = new FormData();
		formData.append('file', fileToUpload, fileToUpload.name);
		formData.append('id', id);
		console.log(fileToUpload);
		return this.httpClient.post(endpoint, formData);
	}


	property_postFile(fileToUpload: File, id: string): Observable<Object> {
		const endpoint = BASE_URL + 'property_upload';
		const formData: FormData = new FormData();
		formData.append('file', fileToUpload, fileToUpload.name);
		formData.append('id', id);
		console.log(fileToUpload);
		return this.httpClient.post(endpoint, formData);
	}

	legal_FileDownload(index) {
		// console.log(index);
		return this.http.post(BASE_URL + 'legal_FileDownload', {'customer_id': index}, {responseType: 'blob'});
	}
}
