import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  Loader: boolean;
  ProdList: any=[];
  searchword:any
  TempOrdeList: any=[];

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
  
  }

  ngOnInit(): void {
    this.getProduct();
  }
  rouerter(path,id){
    this.Loader=true;

    setTimeout(()=>{                         
      this.router.navigate([path,id]);
      this.Loader=false;
 }, 3000);
   
  }

  searchThis(data) {
  
    
    this.ProdList = this.TempOrdeList.filter(element=>{
      
  
      return element.user_id.toLowerCase()==this.searchword.toLowerCase()||element.user_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1||element.order_id.toLowerCase()==this.searchword.toLowerCase()||element.order_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
      || element.product_type.toLowerCase()==this.searchword.toLowerCase() ||element.product_type.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1|| element.prod_sub_type.toLowerCase()==this.searchword.toLowerCase() ||element.prod_sub_type.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1

 
   }); 
   
  }
  getProduct(){

    this.http.post(environment.apiUrl + '/order_details',{prod_type:'uii'}).subscribe(response => {
      if(response['response']=='success'){
        this.ProdList=response['product_dtls_list'];
        this.TempOrdeList=response['product_dtls_list'];
        
       
      }
      
     
    })

  }
  CatChnge(type,data){
    this.ProdList=this.TempOrdeList.filter((a) => a.prod_sub_type ==type);

  }
  rouerterwithtype(path,id,type){
    this.Loader=true;
    setTimeout(()=>{                         
      this.router.navigate([path,id,type]);
      this.Loader=false;
 }, 3000);


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
}
