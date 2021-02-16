import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-supplieruniformaccs',
  templateUrl: './supplieruniformaccs.component.html',
  styleUrls: ['./supplieruniformaccs.component.css']
})
export class SupplieruniformaccsComponent implements OnInit {
  id: string;
  Loader: boolean;
  submitted = false;
  profileForm: FormGroup;
  User_id: string;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    
    });
   }

  get fval() { return this.profileForm.controls; }
  ngOnInit(): void {

    // localStorage.setItem('category_type','US')
    this.User_id=localStorage.getItem('userid');
    this.profileForm = this.formBuilder.group({
    
      terms:['',Validators.required],
      providing_accesoseries:['',Validators.required],
      temp_id:[this.id],
      prod_type:[localStorage.getItem('prod_type')],
      sub_type:[localStorage.getItem('sub_type')]
  

  
     });
    
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
  this.submitted = true;
  if (this.profileForm.invalid) {
     return;
     }
    //  alert('form fields are validated successfully!');
 
    this.Loader=true;
    setTimeout(()=>{ 
     
   
      this.http.post(environment.apiUrl + '/supplier_save',(this.profileForm.value)).subscribe(response => {
     
        if(response['response']=='Data saved success fully'){
          localStorage.setItem('userid',response['product_dtls_list'][0].user_id)
          this.router.navigate(['/otp','sup'])  
          this.Loader=false; 
    
        }
        
       
      })
      },3000);
    }
}
