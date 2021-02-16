import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-machineform',
  templateUrl: './machineform.component.html',
  styleUrls: ['./machineform.component.css']
})
export class MachineformComponent implements OnInit {
  Loader: boolean;

  submitted = false;
  profileForm: FormGroup;
 
  User_id: string;
 
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) { }

 
  ngOnInit(): void {
    // localStorage.setItem('category_type','US')
    this.User_id=localStorage.getItem('userid');
    this.profileForm = this.formBuilder.group({
      customer_name: ['', Validators.required],
      designation:['',Validators.required],
      org_name:['',Validators.required],
      adress:['' ,Validators.required],
      place: ['', Validators.required],
      state: ['', Validators.required],
      district:['',Validators.required],
      pincode:['', [ Validators.required,Validators.maxLength(6)]],
      email:['',[ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
      this.emailDomainValidator]],
      phone_number: ['', [Validators.required,Validators.minLength(10)]],
      alternate_number: ['', Validators.minLength(10)],
      password:['', [Validators.required,Validators.minLength(6)]],
     terms:['',Validators.required],
   
     });
  }
  get fval() { return this.profileForm.controls; }
  FabricFormsave(){
    this.submitted = true;
    if (this.profileForm.invalid) {
       return;
       }
    

    this.Loader=true;
    setTimeout(()=>{ 
      
    
    this.http.post(environment.apiUrl + '/save_machniries',(this.profileForm.value)).subscribe(response => {
      if(response['response']=='Data saved success fully'){
        localStorage.setItem('userid',response['product_dtls_list'][0].user_id)
        this.router.navigate(['/otp','sup'])  
        this.Loader=false; 
  
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
  LogOut(){
    localStorage.removeItem('userid');

    window.location.reload();
  }
  CustomerSave(){
    
    this.Loader=true;
    setTimeout(()=>{ 
      this.Loader=false;
      this.router.navigate(['/customerhome'])   
    // console.log(this.profileForm.value)
    // this.http.post(environment.apiUrl + '/sign_up',(this.profileForm.value)).subscribe(response => {
    //   if(response['response']=='success'){
       
      //}
      
     
    //})
    },3000);
    
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
