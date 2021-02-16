import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {

  id: string;
  ProdList: any;
  Loader:boolean=false;
  SatrtedYear: any;
  Messge: boolean;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    
    });
   }

   rouerter(path,user_type,sub_type){
    this.Loader=true;

    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
   
  }
   profileForm: FormGroup;
   get f() { return this.profileForm.controls; }
   ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      email:[''],
     
      phone_number: [''],
      password:['',],
      customer_name: [''],
      organization_name: [''],
      designation:[''],
      place: [''],
    
      model_type:[''],     
      state: [''],
      districtl:[''],
      pincode:[''],
     
      alternative_number: ['',]
     
  
     });
     
      this.getProduct();
   } 
  getProduct(){

    this.http.post(environment.apiUrl + '/customer_details',{user_id:this.id}).subscribe(response => {
      if(response['response']=='success'){


      
        this.ProdList=response['product_dtls_list'];
      
        this.profileForm.get('email').setValue(response['product_dtls_list'][0].email);
        this.profileForm.get('customer_name').setValue(response['product_dtls_list'][0].customer_name);
        this.profileForm.get('organization_name').setValue(response['product_dtls_list'][0].organization_name)
        this.profileForm.get('designation').setValue(response['product_dtls_list'][0].designation)
        this.profileForm.get('place').setValue(response['product_dtls_list'][0].place)
        this.profileForm.get('model_type').setValue(response['product_dtls_list'][0].category_type)
        this.profileForm.get('state').setValue(response['product_dtls_list'][0].state)
        this.profileForm.get('districtl').setValue(response['product_dtls_list'][0].districtl);
        this.profileForm.get('pincode').setValue(response['product_dtls_list'][0].pincode);
        this.profileForm.get('alternative_number').setValue(response['product_dtls_list'][0].alternative_number);
        this.profileForm.get('phone_number').setValue(response['product_dtls_list'][0].phone_number);

        
        
        
       
      }
      
     
    })

  }
 

}