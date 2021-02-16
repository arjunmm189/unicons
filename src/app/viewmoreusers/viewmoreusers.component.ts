import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewmoreusers',
  templateUrl: './viewmoreusers.component.html',
  styleUrls: ['./viewmoreusers.component.css']
})
export class ViewmoreusersComponent implements OnInit {
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
     // localStorage.setItem('category_type','US')
     this.profileForm = this.formBuilder.group({
       email: ['',],
       phone_number: ['',],
      
       supplier_name: [''],
       organization_name: ['',],
       designation:['',],
       place: ['',],
       state: ['', ],
       districtl:['',],
       pincode:['',],
   
       org_started_year:[''],
       gst_number:[''],
       udayam_number:['']
      });
     
      this.getProduct();
   } 
  getProduct(){

    this.http.post(environment.apiUrl + '/supplier_details',{user_id:this.id}).subscribe(response => {
      if(response['response']=='success'){


        console.log(response['product_dtls_list'])
        this.ProdList=response['product_dtls_list'];
        this.SatrtedYear = response['product_dtls_list'][0].org_started_year
        this.profileForm.get('organization_name').setValue(response['product_dtls_list'][0].organization_name);
        this.profileForm.get('phone_number').setValue(response['product_dtls_list'][0].phone_number);
        this.profileForm.get('supplier_name').setValue(response['product_dtls_list'][0].supplier_name)
        this.profileForm.get('place').setValue(response['product_dtls_list'][0].place)
        this.profileForm.get('state').setValue(response['product_dtls_list'][0].state)
        this.profileForm.get('districtl').setValue(response['product_dtls_list'][0].district)
        this.profileForm.get('org_started_year').setValue(response['product_dtls_list'][0].org_started_year)
        this.profileForm.get('udayam_number').setValue(response['product_dtls_list'][0].udayam_number);
        this.profileForm.get('pincode').setValue(response['product_dtls_list'][0].pincode);
        this.profileForm.get('gst_number').setValue(response['product_dtls_list'][0].gst_number);
        
        
       
      }
      
     
    })

  }
  CustomerSave(){
    this.Messge=true;
    this.http.post(environment.apiUrl + '/accept_supplier',{user_id:this.id}).subscribe(response => {
      if(response['response']=='success'){
       
        this.router.navigate(['/adminhome'])
      }
    });


  }

}
