import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qoutations',
  templateUrl: './qoutations.component.html',
  styleUrls: ['./qoutations.component.css']
})
export class QoutationsComponent implements OnInit {

  Loader: boolean;
  ProdList: any=[];
  searchword:any
  TempOrdeList: any=[];
  id: string;
  type: string;
  quoteid: string;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.type = params.get('prod_type');
      this.quoteid=params.get('quote_id');
    
    });
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
  rouerter1(path,id,prod_type,quote_id){

    this.router.navigate([path,id,prod_type,quote_id])

  }

  searchThis() {
  
    
    this.ProdList = this.TempOrdeList.filter(element=>{
      
  
      return element.user_id.toLowerCase()==this.searchword.toLowerCase()||element.user_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1||element.order_id.toLowerCase()==this.searchword.toLowerCase()||element.order_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
      || element.product_type.toLowerCase()==this.searchword.toLowerCase() ||element.product_type.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1|| element.prod_sub_type.toLowerCase()==this.searchword.toLowerCase() ||element.prod_sub_type.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1

 
   }); 
   
  }
  getProduct(){

    this.http.post(environment.apiUrl + '/quotationlist',{prod_type:'uii'}).subscribe(response => {
      if(response['response']=='success'){
        this.ProdList=response['product_dtls_list'];
        this.TempOrdeList=response['product_dtls_list'];
        
       
      }
      
     
    })

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