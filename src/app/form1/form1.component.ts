import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {
  profileForm: FormGroup;
  Loader: boolean;
  submitted = false;
  User_id: string;
  
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router,private toastr: ToastrService) { }

  
  ngOnInit(): void {
    this.User_id=localStorage.getItem('userid');
    // localStorage.setItem('category_type','US')
    this.profileForm = this.formBuilder.group({
      email:['',[  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
      this.emailDomainValidator]],
      phone_number: ['', [Validators.required,Validators.minLength(10)]],
      password:['', [Validators.required,Validators.minLength(6)]],
      customer_name: ['',Validators.required],
      organization_name: ['', Validators.required],
      designation:[''],
      place: ['', Validators.required],
      // type:['',Validators.required],
      terms:['',Validators.required],
      model_type:['',Validators.required],     
      state: ['', Validators.required],
      districtl:['', Validators.required],
      pincode:['', [ Validators.required,Validators.maxLength(6), Validators.pattern("^[1-9][0-9]{5}$")]],
      user_type:[localStorage.getItem('user_type')],
      sub_type:[localStorage.getItem('sub_type')],
      category_type:[localStorage.getItem('category_type')],
      alternative_number: ['']
     
  
     });
  }
  get fval() {
    return this.profileForm.controls;
    }
    //this.user.fullName='';
    signup(){
    this.submitted = true;
    if (this.profileForm.invalid) {
    return;
    }
   
    }
  selectChange(value){
this.profileForm.get('model_type').setValue(value)
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
  CustomerSave(){
   
    this.submitted = true;
   if (this.profileForm.invalid) {
      return;
      }
      

    this.Loader=true;
    setTimeout(()=>{ 
     
      
     
    
    this.http.post(environment.apiUrl + '/sign_up',(this.profileForm.value)).subscribe(response => {
      if(response['response']=='Data saved success fully'){
      localStorage.setItem('userid',response['product_dtls_list'][0].user_id)
 
      localStorage.setItem('us_type','B')
      
      this.Loader=false;
      this.router.navigate(['/otp'])   
      // Swal.fire({

      //   title: response['product_dtls_list'][0].user_id + '        is your User Id for Uniconform',
  
      //   text: 'Please Not down your User Id!',
  
      //   icon: 'success',
  
      //   showCancelButton: true,
  
      //   confirmButtonText: 'Ok',
  
      //   //cancelButtonText: 'Cancel'
  
      // }).then((result) => {
  
      
  
      // })
     
      
       
      }
      else{
        this.toastr.error('Something Went Wrong', 'Sorry!')
      }
      
     
    })
    },3000);
    
  }
  LogOut(){
    localStorage.removeItem('userid');

    window.location.reload();
  }
  emailDomainValidator(control: FormControl) {
    let email = control.value;
    if (email && email.indexOf("@") != -1) {
    let [_, domain] = email.split("@");
    if (domain !== "gmail.com") {
    return {
    emailDomain: {
    parsedDomain: domain
    }
    }
    }
    }
    return null;
    }
  
}
