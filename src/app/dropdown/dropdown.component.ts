import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() list:any[]; 
    
  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();
  
  
  checkedList : any[];
  currentSelected : {};
  showDropDown:boolean;
  
  constructor(){
      this.checkedList = [];
  }
  ngOnInit(){

  }
  getSelectedValue(status:Boolean,value:String){
      if(status){
        this.checkedList.push(value);  
      }else{
          var index = this.checkedList.indexOf(value);
          this.checkedList.splice(index,1);
      }
      
      this.currentSelected = {checked : status,name:value};

      //share checked list
      this.shareCheckedlist();
      
      //share individual selected item
      this.shareIndividualStatus();
  }
  shareCheckedlist(){
       this.shareCheckedList.emit(this.checkedList);
  }
  shareIndividualStatus(){
      this.shareIndividualCheckedList.emit(this.currentSelected);
  }
}