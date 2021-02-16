import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-labourform',
  templateUrl: './labourform.component.html',
  styleUrls: ['./labourform.component.css']
})
export class LabourformComponent implements OnInit {
  profileForm: FormGroup;
  Loader: boolean;
  submitted = false;
  User_id: string;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) { }

 
  ngOnInit(): void {
    
 
    this.profileForm = this.formBuilder.group({
      terms:['',Validators.required],
      customer_name: ['',Validators.required],
      place: ['', Validators.required],
      state: ['', Validators.required],
      district:['',Validators.required],
      pincode:['', [ Validators.required,Validators.maxLength(6), Validators.pattern("^[1-9][0-9]{5}$")]],
      phone_number: ['', [Validators.required,Validators.minLength(10)]],
      alternate_number: ['', Validators.minLength(10)],
      email:['',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),this.emailDomainValidator]],
      password:['', [Validators.required,Validators.minLength(6)]],
      work_type:['',Validators.required],
      // status:['',Validators.required],
     
    
     
     gender:['']

  
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
  
  CustomerSave(){
    this.submitted = true;
    if (this.profileForm.invalid) {
       return;
       }
       //alert('form fields are validated successfully!');
  
    this.Loader=true;
    setTimeout(()=>{ 
    
  
    this.http.post(environment.apiUrl + '/save_labours',(this.profileForm.value)).subscribe(response => {
      if(response['response']=='Data saved success fully'){

      
        localStorage.setItem('userid',response['product_dtls_list'][0].user_id)
        localStorage.setItem('us_type','L')
        this.router.navigate(['/otp','la'])   

        console.log("=======logii")
 


     
          
           
                 
        
          this.Loader=false;
        }
     
    })
    },3000);
  }

}
