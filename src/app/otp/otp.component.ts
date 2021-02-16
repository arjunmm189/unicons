import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  Loader: boolean;
  User_id: string;
  id: string;
  User_Type: string;
  recentOtp: boolean;




  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router,private toastr: ToastrService) { 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if(this.id){
       
      }

    
    });
  }
 
 
  profileForm: FormGroup;
  ngOnInit(): void {


    setTimeout(()=>{                         
     this.recentOtp=true;
    
 }, 60000);

    this.User_id=localStorage.getItem('userid');
    this.User_Type=localStorage.getItem('us_type');
    
    // localStorage.setItem('category_type','US')
    this.profileForm = this.formBuilder.group({
   
      otp_val:[''],
      user_id: [this.User_id]
     
  
     });
  }
   rouerter(path,user_type,sub_type){
    this.Loader=true;

    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
}
Resend(){

  this.http.post(environment.apiUrl + '/ResendOtp',(this.profileForm.value)).subscribe(response => {
    if(response['response']=='success'){
     this.recentOtp=false;

    }})

}

CustomerSave(){
   


    

  this.Loader=true;
  setTimeout(()=>{ 
   
    this.Loader=false;
   
  
  this.http.post(environment.apiUrl + '/verifyOTP',(this.profileForm.value)).subscribe(response => {
    if(response['response']=='success'){

      if(this.id=='sup'){
        this.router.navigate(['/payment']) 
      }
      
   
   

      


      else{
   
    Swal.fire({

      title: this.User_id + '        is your User Id for Uniconform',

      text: 'Please Remember your User Id and Password!',

      icon: 'success',

      showCancelButton: true,

      confirmButtonText: 'Ok',

      //cancelButtonText: 'Cancel'

    }).then((result) => {

    

    })
    if(this.User_Type=='B'){
    this.router.navigate(['/customerhome']) 
    }
    if(this.id=='la'){
      this.router.navigate(['/home']) 
      }  
    
     
    }
  }
    else if(response['response']=='failed'){
      this.toastr.error('Invalid OTP', 'Sorry!')
    }
    else{
      this.toastr.error('Invalid Otp', 'Sorry!')
    }
  
   
  })
  },3000);
  
}

}
