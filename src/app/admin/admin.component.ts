import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  
  profileForm: FormGroup;
  Loader: boolean;
  Message: any;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
  
   }

  get f() { return this.profileForm.controls; }
  ngOnInit(): void {

    // localStorage.setItem('category_type','US')
    this.profileForm = this.formBuilder.group({
      user_id:['',Validators.required],
      password:['',Validators.required]
     });
    
  }
  Authenticate(){
    this.Loader=true;
    setTimeout(()=>{ 
      this.Loader=false;
      this.http.post(environment.apiUrl + '/auth',(this.profileForm.value)).subscribe(response => {

        if(response['response']=='success'){
          if(response['data'].data[0][0]=='admin'){
            this.router.navigate(['/adminhome'])
          }
      else{
        this.Message="You are not an Admin";
      }
        }
        if(response['response']=='Error'){
          this.Message=response['message']
          
         }
       
      })
      
  
    },3000);

    
  

  }
  getSuppliertype(userid){
    this.http.post(environment.apiUrl + '/supplier_list',{user_id:userid}).subscribe(response => {
      if(response['response']=='success'){
        localStorage.setItem('sellertype',response['product_dtls_list'][0].prod_type);
        localStorage.setItem('sellersubtype',response['product_dtls_list'][0].prod_sub_type);
      }

    })

  }
  Close(){
   
    this.Message='';
  }

}


