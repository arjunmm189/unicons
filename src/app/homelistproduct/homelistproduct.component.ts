import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-homelistproduct',
  templateUrl: './homelistproduct.component.html',
  styleUrls: ['./homelistproduct.component.css']
})
export class HomelistproductComponent implements OnInit {
  Loader: boolean;
  type: string;
  ProdList: any=[];
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
    this.route.paramMap.subscribe(params => {
      this.type=params.get('type');

  
    
    });
   }

  ngOnInit(): void {
    this.getProduct()
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

  getProduct(){

    this.http.post(environment.apiUrl + '/prod_list_cat',{prod_type:''}).subscribe(response => {
      if(response['response']=='Success'){
        this.ProdList=response['cart_list'].filter(obj => {
     
          return obj.prod_type ==this.type;
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

}
