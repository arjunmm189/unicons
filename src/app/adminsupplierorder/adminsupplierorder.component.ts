import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adminsupplierorder',
  templateUrl: './adminsupplierorder.component.html',
  styleUrls: ['./adminsupplierorder.component.css']
})
export class AdminsupplierorderComponent implements OnInit {
  Loader: boolean;
  ProdList: any=[];
  searchword:any
  TempOrdeList: any=[];
  id: string;
  type: string;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.type = params.get('type');
    
    });
  }

  ngOnInit(): void {
    this.getProduct();
  }
  rourter(path,id,type){
    this.Loader=true;

    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
   
  }
  rouerter(path,id){
    this.Loader=true;

    setTimeout(()=>{                         
      this.router.navigate([path,id]);
      this.Loader=false;
 }, 3000);
   
  }

 
  getProduct(){

    this.http.post(environment.apiUrl + '/production_details',{sid:this.id,type:this.type}).subscribe(response => {
      if(response['response']=='success'){
        this.ProdList=response['product_dtls_list'];
        this.TempOrdeList=response['add_product_dtls_dtls'];
        
       
      }
      
     
    })

  }
}
