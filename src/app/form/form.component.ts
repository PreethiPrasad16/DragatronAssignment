import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import fileUpload from 'fuctbase64';
import {FormsModule} from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    inputForm: any;
    base64Url: any;
    itemList = [];
    currentDate:any;
    searchText :string;
    dataToSave: any;
    constructor(private ngZone: NgZone) {
      this.dataToSave = {
        "itemName": "",
        "itemImage": "",
        "itemPrice": "",
        "itemDescription": "",
        "itemAdditionDate": ""
      }
      this.inputForm = new FormGroup({
        itemName: new FormControl('',Validators.required),
        itemImage: new FormControl('',Validators.required),
        itemPrice: new FormControl('',Validators.required),
        itemDescription: new FormControl('',Validators.required),
        itemAdditionDate: new FormControl((new Date()).toISOString().substring(0,10)),
      });
    }

    ngOnInit(): void {
    }

    onFileChange(event) {
      fileUpload(event).then((img)=>{
        this.base64Url = "data:image/png;base64,"+img.base64;
      });
    }

    onSubmit() {
      this.inputForm.value.itemImage = this.base64Url;
      this.itemList.push(this.inputForm.value);
      this.sortAll();
      this.inputForm.reset();
      this.inputForm.controls["itemAdditionDate"].setValue((new Date()).toISOString().substring(0,10));
    }

    deleteRow(item) {
      const index = this.itemList.indexOf(item);
      this.itemList.splice(index,1);
    }

    deleteAll() {
      this.itemList=[];
    }

    get inputFormControl() {
      return this.inputForm.controls;
    }

    sortAll(){
      this.itemList.sort((a, b) => new Date(b.itemAdditionDate).getTime() - new Date(a.itemAdditionDate).getTime());
    }

    editItem(data) {
      this.inputForm.controls["itemName"].setValue(data.itemName);
      this.inputForm.controls["itemPrice"].setValue(data.itemPrice);
      this.inputForm.controls["itemDescription"].setValue(data.itemDescription);
      this.inputForm.controls["itemAdditionDate"].setValue(data.itemAdditionDate);
      this.deleteRow(data);
    }  
}

