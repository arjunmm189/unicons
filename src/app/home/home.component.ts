import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  Loader: boolean;
  ProdList: any=[];
  SupplierList: any=[];
  Readymades: any=[];
  Machines: any=[];
  Accesories: any=[];
  User_id: string;
  ProfileId: any;
  ProfilePhone: any;
  Banners: any;
 

  constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private http:HttpClient,
        private router:Router) { }

  ngOnInit(): void {
    this.getbannerimages();
    this.Loader=true;
    setTimeout(()=>{                         
      
      this.Loader=false;
 }, 6000);
 this.getProduct();
   

    
    this.User_id=localStorage.getItem('userid');
    if(this.User_id){
      this.getProfile();
    
      if(localStorage.getItem('us_type')=='S'){
        this.router.navigate(['/supplierhome'])
      }
      if(localStorage.getItem('us_type')=='B'){
        this.router.navigate(['/customerhome'])
      }
    }



    
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

  gotoList(path,type){
 
    this.Loader=true;
   
    setTimeout(()=>{                         
      this.router.navigate([path,type]);
      this.Loader=false;
 }, 3000);

  }
  gotoLaboursList(path){

    this.Loader=true;
   
    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);

  }
  getbannerimages(){
    
    this.http.post(`${environment.apiUrl}/getbannerimages`,{type:'User banner'}).subscribe(response => {

      this.Banners=response['product_dtls_list'];
    
      
    })
  }

  LogOut(){
    localStorage.removeItem('userid');

    window.location.reload();
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
  getComapnyState(user_id){
  
    this.SupplierList.filter(obj=>{
      if(obj.user_id==user_id){
        
      }

    })

  }
  getComapnyDistrict(user_id){
    this.SupplierList.filter(obj=>{
      if(obj.user_id==user_id){
        return obj.district;
      }

    })

  }
  getComapnyPlace(user_id){
    this.SupplierList.filter(obj=>{
      if(obj.user_id==user_id){
        return obj.place;
      }

    })

  }
  getComapnyName(user_id){

    this.SupplierList.filter(obj=>{
      if(obj.user_id==user_id){
        return obj.organization_name;
      }

    })

  }

  getProfile(){
    this.http.post(environment.apiUrl + '/getProfile',{user_id:this.User_id}).subscribe(response => {

      this.ProfileId=response['user_id'];
      this.ProfilePhone=response['phone_no'];
    })
    
  }

}
