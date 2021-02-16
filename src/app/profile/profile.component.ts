import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  User_type: any;
  Loader: boolean;
  ProfileList: any=[];
  ShowOtp: boolean;
  ShowSave: boolean;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
  
  }

  ngOnInit(): void {
    this.EditProfile()
    this.profileForm = this.formBuilder.group({
      email:[''],
      phone_number: [''],
    
      user_type:[''],
      user_id:[''],
      usid:[''],
      otp_val:['']
     
  
     });
  }


  EditProfile(){
    this.http.post(environment.apiUrl + '/Edit_profile',{user_id:localStorage.getItem('userid')}).subscribe(response => {
     this.User_type=response['product_dtls_list'][0].user_type;
     this.ProfileList=response['product_dtls_list']
     this.profileForm.get('email').setValue(response['product_dtls_list'][0].email)
     this.profileForm.get('phone_number').setValue(response['product_dtls_list'][0].phone)
     this.profileForm.get('user_type').setValue(response['product_dtls_list'][0].user_type)
     this.profileForm.get('user_id').setValue(response['product_dtls_list'][0].user_id)
     this.profileForm.get('usid').setValue(response['product_dtls_list'][0].usid)
    })
  }
  Profilesave(){
    if(this.ProfileList[0].phone==this.profileForm.get('phone_number').value){
    
    this.http.post(environment.apiUrl + '/save_profile',(this.profileForm.value)).subscribe(response => {
      Swal.fire({

          
      
        text: 'Your Prfile has been updated!',
  
        icon: 'success',
  
        showCancelButton: true,
  
        confirmButtonText: 'Ok',
  
        //cancelButtonText: 'Cancel'
  
      }).then((result) => {
  
      
  
      })

 
 
 

    


 
    
    })
  }
  else{
    this.ShowOtp=true;

    
    this.http.post(environment.apiUrl + '/sendOtp',(this.profileForm.value)).subscribe(response => {
      if(response['response']=='success'){
      
      }
    })
  }

  }
  Profilesave1(){

    this.http.post(environment.apiUrl + '/save_profile',(this.profileForm.value)).subscribe(response => {
      if(response['response']=='success'){

        this.ShowOtp=false; 
          Swal.fire({

          
      
            text: 'Your Profile has been updated!',
      
            icon: 'success',
      
            showCancelButton: true,
      
            confirmButtonText: 'Ok',
      
            //cancelButtonText: 'Cancel'
      
          }).then((result) => {
      
          
      
          })

     
     
     
  
        
  
    
     
        }

    })
  }
  CustomerSave(){
  
    
    this.http.post(environment.apiUrl + '/verifyOTP',(this.profileForm.value)).subscribe(response => {
      if(response['response']=='success'){

        this.ShowOtp=false; 
        this.ShowSave=true;
          Swal.fire({

          
      
            text: 'Otp  is Verified  Please save the Profile!',
      
            icon: 'success',
      
            showCancelButton: true,
      
            confirmButtonText: 'Ok',
      
            //cancelButtonText: 'Cancel'
      
          }).then((result) => {
      
          
      
          })

     
     
     
  
        
  
    
     
      }else{
        Swal.fire({

          
      
          text: 'Invalid Otp!',
    
          icon: 'error',
    
          showCancelButton: true,
    
          confirmButtonText: 'Ok',
    
          //cancelButtonText: 'Cancel'
    
        }).then((result) => {
    
        
    
        })
        
      }
    })
      
    
    
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

}
