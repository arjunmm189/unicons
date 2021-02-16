import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-supplierhome',
  templateUrl: './supplierhome.component.html',
  styleUrls: ['./supplierhome.component.css']
})
export class SupplierhomeComponent implements OnInit {
  Loader: boolean;
  User_id: string;
  ProfileId: any;
  ProfilePhone: any;
  ProdList: any;
  SupplierList: any;
  Readymades: any;
  Machines: any;
  Accesories: any;
  Banners: any;
  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.User_id=localStorage.getItem('userid')
    this.getProfile();
    this.getProduct();
    this.getbannerimages();
    this.Loader=true;
    setTimeout(()=>{                         
      
      this.Loader=false;
    }, 6000);
  }
  
 
  rouerter(path){
    this.Loader=true;
  
    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
}
LogOut(){
  localStorage.clear()
  this.router.navigate(['/home'])
  
}
Customerouerter(path,id){
  this.Loader=true;
  setTimeout(()=>{                         
    this.router.navigate([path,id]);
    this.Loader=false;
}, 3000);
}
CustomerSave(){
  // console.log("========")
  this.Loader=true;
  setTimeout(()=>{ 
    this.Loader=false;
    //this.router.navigate(['/customerhome'])   
  // console.log(this.profileForm.value)
  // this.http.post(environment.apiUrl + '/sign_up',(this.profileForm.value)).subscribe(response => {
  //   if(response['response']=='success'){
     
    //}
    
   
  //})
  },3000);
  
}
getProduct(){

  this.http.post(environment.apiUrl + '/prod_list_cat',{prod_type:''}).subscribe(response => {
    if(response['response']=='Success'){


      
    
      this.ProdList=response['cart_list'];
     
      
      this.SupplierList=response['supplier_details_list'];
      this.Readymades = response['cart_list'].filter(obj => {


        return obj.prod_type == 'Ready mades';
     });

     
     this.Machines= response['cart_list'].filter(obj => {
        return obj.prod_type == 'machines';
     });
     this.Accesories = response['cart_list'].filter(obj => {
        return obj.prod_type == 'Accesories';
     });

      
      
     
     
    }
    
   
  })


}
gotoList(path,type){
 
  this.Loader=true;
 
  setTimeout(()=>{                         
    this.router.navigate([path,type]);
    this.Loader=false;
}, 3000);
}

getProfile(){
    this.http.post(environment.apiUrl + '/getProfile',{user_id:this.User_id}).subscribe(response => {

      this.ProfileId=response['user_id'];
      this.ProfilePhone=response['phone_no'];
    })
    
  }
  getbannerimages(){
    this.http.post(environment.apiUrl + '/getbannerimages',{type:'Supplier banner'}).subscribe(response => {

      this.Banners=response['product_dtls_list'];
    
      
    })
  }

}
