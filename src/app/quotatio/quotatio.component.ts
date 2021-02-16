import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quotatio',
  templateUrl: './quotatio.component.html',
  styleUrls: ['./quotatio.component.css']
})
export class QuotatioComponent implements OnInit {

  ProductList: any=[];
  QuoteList: any=[];
  Loader: boolean;
  TempList: any;
  searchword:any;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.getQuotes();
  }

  rouerter(path,id,prod_type,quote_id){
   
    this.router.navigate([path,id,prod_type,quote_id])

  }
  searchThis() {
    this.ProductList=this.TempList.filter(element=>{
      
  
      return element.supplier_id.toLowerCase()==this.searchword.toLowerCase()||element.supplier_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1||element.quatation_form_id.toLowerCase()==this.searchword.toLowerCase()||element.quatation_form_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
      || element.order_form_id.toLowerCase()==this.searchword.toLowerCase() ||element.order_form_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1|| element.is_order_accepted.toLowerCase()==this.searchword.toLowerCase() ||element.is_order_accepted.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1

 
   }); 
  }
 


  getQuotes(){ 
  this.http.post(environment.apiUrl + '/quote_list',{user_id:localStorage.getItem('userid')}).subscribe(response => {
    if(response['response']=='success'){
      console.log("=======11333")
      this.ProductList=response['exp_product_dtls_list'];
      this.TempList=response['exp_product_dtls_list'];
    
     
    }})
  }
  roueter(path,user_type,sub_type){
    this.Loader=true;
    localStorage.setItem('user_type',user_type);
    localStorage.setItem('sub_type',sub_type);
    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
   
  }
}
