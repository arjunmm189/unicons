import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adminquotation',
  templateUrl: './adminquotation.component.html',
  styleUrls: ['./adminquotation.component.css']
})
export class AdminquotationComponent implements OnInit {
  Loader: boolean;
  id: string;
  type: string;
  ProdcutList: any=[];
  ProdcutDetailList: any=[];

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router,private toastr:ToastrService) { 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.type = params.get('type');
    

    
    });
  }

  ngOnInit(): void {
    this.getOrderdetails()
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
getOrderdetails(){
  this.http.post(environment.apiUrl + '/getOrderdetials',{order_id:this.id,type:this.type}).subscribe(response => {
    if(response['response']=="success"){
      this.ProdcutList=response['product_dtls_list']
      console.log( this.ProdcutList)
      this.ProdcutDetailList=response['add_product_dtls_dtls']
    }
     
     
  })

}

}
