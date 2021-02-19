import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-supplierlist',
  templateUrl: './supplierlist.component.html',
  styleUrls: ['./supplierlist.component.css']
})
export class SupplierlistComponent implements OnInit {

  Loader: boolean;
  ProdList: any=[];
  TempList: any;
  searchword:any;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
  
  }

  ngOnInit(): void {
    this.getProduct();
  }

  searchThis(){
    this.ProdList = this.TempList.filter(element=>{
      return element.user_id.toLowerCase()==this.searchword.toLowerCase()||element.user_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1||element.district.toLowerCase()==this.searchword.toLowerCase()||element.district.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
      || element.state.toLowerCase()==this.searchword.toLowerCase() ||element.state.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1|| element.place.toLowerCase()==this.searchword.toLowerCase() ||element.place.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
      || element.phone_number.toLowerCase()==this.searchword.toLowerCase() ||element.phone_number.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1 || element.supplier_name.toLowerCase()==this.searchword.toLowerCase() ||element.supplier_name.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
 
   }); 
  }

  rouerter(path,id){
    this.Loader=true;

    setTimeout(()=>{                         
      this.router.navigate([path,id]);
      this.Loader=false;
 }, 3000);
   
  }
  getProduct(){

    this.http.post(environment.apiUrl + '/users_list',{prod_type:'uii'}).subscribe(response => {
      if(response['response']=='success'){
        this.ProdList=response['product_dtls_list'];
        this.TempList=response['product_dtls_list'];
        
       
      }
      
     
    })

  }
  CatChnge(value,data){
    if(value=='All'){
      this.ProdList=this.TempList;
    }
    else{
      this.ProdList=this.TempList.filter((a) => a.prod_sub_type==value);
    }


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



deleteID(id,path){
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
    this.deleteconform(id,path);
    }
    
  })


}
deleteconform(id,path){
  this.http.post(environment.apiUrl + '/DeleteSupplier',{sid:id}).subscribe(response => {
    if(response['response']=='success'){
      this.ProdList.splice(path,1)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
     
    }
    
   
  })

}

}