import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-supplieruniformcustunifrmfabric',
  templateUrl: './supplieruniformcustunifrmfabric.component.html',
  styleUrls: ['./supplieruniformcustunifrmfabric.component.css']
})
export class SupplieruniformcustunifrmfabricComponent implements OnInit {
  chekced: boolean=false;

  profileForm: FormGroup;
  Loader: boolean;
  id: string;
  submitted = false;
  CompanyDelaer: any='No';
  User_id: string;
  WholwSaler: any='No';
  retailer: string='No';
  Msg: boolean=false;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router,private toastr: ToastrService) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    
    });
   }

  get fval() { return this.profileForm.controls; }
  ngOnInit(): void {

    // localStorage.setItem('category_type','US')
    this.User_id=localStorage.getItem('userid');
    this.profileForm = this.formBuilder.group({
    
      is_companydeler: [''],
      is_wholesaler: [''],
      is_retailer:[''],
      compnay_names:[''],
      terms  :['',Validators.required],
      temp_id:[this.id],
      prod_type:[localStorage.getItem('prod_type')],
      sub_type:[localStorage.getItem('sub_type')]
  

  
     });
    
  }
  canBeEditable(event){
  // console.log(event)
  if(event){
    this.CompanyDelaer='Yes';
    //this.profileForm.get('is_companydeler').setValue('Yes')

  }
  else{
    this.CompanyDelaer='No';
    //this.profileForm.get('is_companydeler').setValue('No')

  }

  }
  canBeEditable1(event){

    if(event){
      this.WholwSaler='Yes';
 
      //this.profileForm.get('is_wholesaler').setValue('Yes')
  
    }
    else{
      this.WholwSaler='No';
     
     // this.profileForm.get('is_wholesaler').setValue('No')
  
    }
  }
  canBeEditable2(event){
    if(event){
      this.retailer='Yes';
     
      //this.profileForm.get('is_retailer').setValue('Yes')
  
    }
    else{
      this.retailer='No';
    
      //this.profileForm.get('is_retailer').setValue('No')
  
    }
    
  }
  LogOut(){
    localStorage.removeItem('userid');

    window.location.reload();
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
  selectChange(value){
localStorage.setItem('category_type',value)
  }

CustomerSave(){
  this.submitted = true;
  if (this.profileForm.invalid) {
     return;
     }
    //  alert('form fields are validated successfully!');
  if(this.CompanyDelaer=='Yes'){
   this.profileForm.get('is_companydeler').setValue(this.CompanyDelaer);
  }
  if(this.WholwSaler=='Yes'){
    this.profileForm.get('is_companydeler').setValue(this.WholwSaler);
   }
   if(this.retailer=='Yes'){
    this.profileForm.get('is_companydeler').setValue(this.retailer);
   }
  


  
  this.Loader=true;
  this.Msg=true;
  setTimeout(()=>{ 
    
   
   
  this.http.post(environment.apiUrl + '/supplier_save',(this.profileForm.value)).subscribe(response => {
    // console.log("==========")
    if(response['response']=='Data saved success fully'){
      localStorage.setItem('userid',response['product_dtls_list'][0].user_id)
      this.router.navigate(['/otp','sup'])  
      this.Loader=false; 

    }
    
   
  })
  },3000);
  
}


}
