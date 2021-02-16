import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-labourstatus',
  templateUrl: './labourstatus.component.html',
  styleUrls: ['./labourstatus.component.css']
})
export class LabourstatusComponent implements OnInit {
  profileForm: FormGroup;
  Loader: boolean;
  submitted = false;
  User_id: string;
  Staus: string;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.User_id=localStorage.getItem('userid');
 
    this.profileForm = this.formBuilder.group({

      status:[''],
      user_id:['']
     
    
 

  
     });
  }
  get fval() { return this.profileForm.controls; }
  rouerter(path,user_type,sub_type){
    this.Loader=true;
    localStorage.setItem('user_type',user_type);
    localStorage.setItem('sub_type',sub_type);
    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
   
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

    canBeEditable(event){
      console.log(event)

      if(event){
        this.Staus='Active';
   
        
      }
      else{
        this.Staus='DeActive';
       
    
    
      }
    }
  
  CustomerSave(){
    this.submitted = true;
    this.profileForm.get('status').setValue(this.Staus)
    
    this.Loader=true;
    setTimeout(()=>{ 
    
    
    this.http.post(environment.apiUrl + '/ChngeLabourStatus',(this.profileForm.value)).subscribe(response => {
      if(response['response']=='success'){
        this.Loader=false;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work status is '+response['product_dtls_list'][0].status,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/home'])
       
      }
      if(response['response']=='notFound'){
        this.Loader=false;
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'You are not a Registered Labour',
          showConfirmButton: false,
          timer: 1500
        })
        
       
      }
      
      
     
    })
    },3000);
  }

}
