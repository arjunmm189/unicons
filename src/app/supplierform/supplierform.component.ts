import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-supplierform',
  templateUrl: './supplierform.component.html',
  styleUrls: ['./supplierform.component.css']
})
export class SupplierformComponent implements OnInit {
  profileForm: FormGroup;
  Loader: boolean;
  UDSTATE:any;
  UDDIST:any;
  UDPIN:any;
  UDNAME: any;
  submitted = false;
  udyam_naumeber: string;
  UDS:string;
 
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) { }

  get fval() { return this.profileForm.controls; }
  ngOnInit(): void {
    // localStorage.setItem('category_type','US')
    this.profileForm = this.formBuilder.group({
    
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
      this.emailDomainValidator]],
      terms: ['',Validators.required],
      supplier_name: ['',Validators.required],
      organization_name: ['', Validators.required],
      place: ['', Validators.required],
      state: ['', Validators.required],
      districtl:['',Validators.required],
      pincode:['',[Validators.required,Validators.minLength(6)]],
      phone_number: ['', [Validators.required,Validators.minLength(10)]],
      alternate_number: ['', [Validators.minLength(10)]],
      password:['', [Validators.required,Validators.minLength(6)]],
      user_type:[localStorage.getItem('user_type'),Validators.required],
      sub_type:[localStorage.getItem('sub_type'),Validators.required],
      category_type:[localStorage.getItem('category_type')],
      org_started_year:['',Validators.required],
      org_name:[''],
     
      gst_number:[''],
      udayam_number:[''],
      UD1:[],
      UD2:[],
      UD3:[],
      UD4:[],
      


  
     });
     this.profileForm.get('UD1').setValue('UDAYAM')
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
  searchThis(){
   
    this.UDPIN=this.UDS;
    if(this.UDS.length==2){
      this.UDSTATE=this.UDS+'-';
     this.UDS=this.UDSTATE;


    }
    else if(this.UDS.length==5){
      this.UDDIST=this.UDPIN+'-';
      this.UDS=this.UDDIST;
      
    }
    else{

    }



    
  


    // this.udyam_naumeber = 'UDAYAM'+'-'+this.UDSTATE+'-'+this.UDDIST+'-'+this.UDPIN;

    // console.log(this.udyam_naumeber)

    // this.profileForm.get('udayam_number').setValue(this.udyam_naumeber)

  }
  selectChange(value){
localStorage.setItem('category_type',value)
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
    if(this.UDS){

    this.profileForm.get('udayam_number').setValue(this.UDS);
    }
    else{
        this.profileForm.get('udayam_number').setValue('');
    }
    this.Loader=true;
    setTimeout(()=>{ 
      this.Loader=false;   
    this.http.post(environment.apiUrl + '/temp_dtls',(this.profileForm.value)).subscribe(response => {
      if(response['response']=='success'){
        this.router.navigate(['/basicform',response['delete_id']]);
      }
      
     
    })
    },3000);
  }
}