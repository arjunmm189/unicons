import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileForm: FormGroup;
  Loader: boolean;
  Message: any;
  Message1: string;
  Userid: any;
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
          
          localStorage.setItem('userid',response['data'].data[0][1])
        this.getSuppliertype(response['data'].data[0][1])
         if(response['data'].data[0][0]=='Buyer'){
           localStorage.setItem('us_type','B')
           this.router.navigate(['/customerhome'])
         }
         if(response['data'].data[0][0]=='supplier'){
          localStorage.setItem('us_type','S')
          this.router.navigate(['/supplierhome'])
        }
        }
        if(response['response']=='Error'){
          this.Message=response['message']
          
         }
         if(response['response']=='Error occured'){
          this.Userid=localStorage.getItem('userid')
          this.Message1="Please Wait the Admin to Accept Your Login"
          
         }
         
       
      })
      
  
    },3000);

    
  

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
  Close1(){
    
    this.Message1='';
  }
}
