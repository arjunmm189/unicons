import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customerhome',
  templateUrl: './customerhome.component.html',
  styleUrls: ['./customerhome.component.css']
})
export class CustomerhomeComponent implements OnInit {
  ProfileId: any;
  ProfilePhone: any;
  User_id: string;
  Loader: boolean;
  Banners: any;
  ProdList: any;
  SupplierList: any;
  Readymades: any;
  Machines: any;
  Accesories: any;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.getbannerimages();
    this.getProduct();
    this.User_id=localStorage.getItem('userid')
    this.getProfile();
    this.Loader=true;
    setTimeout(()=>{                         
      
      this.Loader=false;
 }, 6000);
  }
  Router(path,type,sub_type){
    this.Loader=true;
    // this.router.navigate([path])
    localStorage.setItem('product_type',type)
    localStorage.setItem('sub_type',sub_type)
    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
    
  }
  rouerter(path,user_type,sub_type){
    this.Loader=true;
    localStorage.setItem('user_type',user_type);
    localStorage.setItem('sub_type',sub_type);
    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
   
  }
  LogOut(){
    localStorage.clear();
    this.router.navigate(['/home']);
    //window.location.reload();
  }
  
  getProfile(){
    this.http.post(environment.apiUrl + '/getProfile',{user_id:localStorage.getItem('userid')}).subscribe(response => {

      this.ProfileId=response['user_id'];
      this.ProfilePhone=response['phone_no'];
    })
    
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
  getbannerimages(){
    this.http.post(environment.apiUrl + '/getbannerimages',{type:'Customer banner'}).subscribe(response => {

      this.Banners=response['product_dtls_list'];
    
      
    })
  }

}


