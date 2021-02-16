import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-adminlabourlist',
  templateUrl: './adminlabourlist.component.html',
  styleUrls: ['./adminlabourlist.component.css']
})
export class AdminlabourlistComponent implements OnInit {
  Loader: boolean;
  ProdList: any=[];
  TempList: any;
  searchword: any;

  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.getProduct()
  }
  rourter(path,user_type,sub_type){
    this.Loader=true;
    localStorage.setItem('user_type',user_type);
    localStorage.setItem('sub_type',sub_type);
    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
}

searchThis(){
  this.ProdList = this.TempList.filter(element=>{
   
    return element.user_id!=''&& element.user_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
    || element.cutsomer_name.toLowerCase()==this.searchword.toLowerCase()||element.cutsomer_name!=''&& element.cutsomer_name.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
    ||  element.place.toLowerCase()==this.searchword.toLowerCase() || element.place.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1||  element.state.toLowerCase()==this.searchword.toLowerCase() || element.state.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
    ||  element.district.toLowerCase()==this.searchword.toLowerCase() || element.district.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1||  element.pincode.toLowerCase()==this.searchword.toLowerCase() || element.pincode.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
    ||  element.work_type.toLowerCase()==this.searchword.toLowerCase() || element.work_type.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1||  element.status.toLowerCase()==this.searchword.toLowerCase() || element.status.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
    

 }); 
}
getProduct(){

  this.http.post(environment.apiUrl + '/getlabours_technisions_list',{prod_type:'uii'}).subscribe(response => {
    if(response['response']=='success'){
      this.ProdList=response['product_dtls_list'];
     this.TempList=response['product_dtls_list'];
     
    }
    
   
  })

}
deleteID(id,index){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
    this.deleteconform(id,index);
    }
    
  })


}
deleteconform(id,index){
  this.http.post(environment.apiUrl + '/DeleteLabour',{prod_id:id,lid:id}).subscribe(response => {
    if(response['response']=='success'){
      this.ProdList.splice(index,1)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
     
    }
    
   
  })

}

}
