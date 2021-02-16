import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-machineadd',
  templateUrl: './machineadd.component.html',
  styleUrls: ['./machineadd.component.css']
})
export class MachineaddComponent implements OnInit {
  chekced: boolean=false;
  submitted = false;
  profileForm: FormGroup;
  Loader: boolean;
  id: string;
  CompanyDelaer: any='No';
  WholwSaler: any='No';
  retailer: string='No';
  SelectedFile: any;
  ProdList: any=[];
  Image: any;
  User_id: string;
  Processed: boolean;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router,private toastr:ToastrService) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id=='machines'){
        
      }
      else{
        this.getProducrbyID();
      }
    
    });
   }

  get fval() { return this.profileForm.controls; }
  ngOnInit(): void {

    // localStorage.setItem('category_type','US')
    this.User_id=localStorage.getItem('userid');
    this.profileForm = this.formBuilder.group({
      prod_id:[''],
     
      item_code:[''],
      size:[''],
      image:[''],
    
      quantity:[''],
      status:[''],
      user_id:[localStorage.getItem('userid')],
      prod_type:['machines'],
      
     terms:['',Validators.required],
      item_name:['',Validators.required],
   
   
   
      price:['',Validators.required],
    
   
     
      prod_desc:['',Validators.required],
      condition:['',],
      brand_name: ['',Validators.required],
  
     });
    
  }
  getProducrbyID(){
 
    this.http.post(environment.apiUrl + '/prod_list_byid',{prod_id:this.id,user_id:localStorage.getItem('userid')}).subscribe(response => {
      if(response['response']=='success'){
        this.ProdList=response['product_dtls_list'];
        this.Image=this.ProdList[0].image;
        this.profileForm.get('item_name').setValue(this.ProdList[0].item_name);
        this.profileForm.get('brand_name').setValue(this.ProdList[0].shades);
        this.profileForm.get('condition').setValue(this.ProdList[0].condition);
        this.profileForm.get('prod_desc').setValue(this.ProdList[0].prod_desc);
        this.profileForm.get('price').setValue(this.ProdList[0].price);
        this.profileForm.get('prod_id').setValue(this.ProdList[0].prod_id)
       
       
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
  processFile(event){
    this.Processed=true;
    if(this.profileForm.get('image').value.split(".")[1].toUpperCase() == "JPG" || this.profileForm.get('image').value.split(".")[1].toUpperCase() == "JPEG" || this.profileForm.get('image').value.split(".")[1].toUpperCase() == "PNG"  ){
      this.SelectedFile = event.target.files[0]
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Sorry...',
        text: 'Browse to upload a valid File with png,jpg extension!',
      })
     
    }
   
    }
  ProductChange(value){
    this.profileForm.get('prod_type').setValue(value)
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
     //alert('form fields are validated successfully!');

  if (this.SelectedFile==undefined&&this.Processed) {
    this.toastr.error('Please Select Image')
    return;
    }


  
  const uploadData = new FormData();



  uploadData.append('file',this.SelectedFile);
  uploadData.append('prod_id',this.profileForm.controls['prod_id'].value);
  uploadData.append('item_name',this.profileForm.controls['item_name'].value);
  uploadData.append('item_code',this.profileForm.controls['item_code'].value);
  uploadData.append('size',this.profileForm.controls['size'].value);
  uploadData.append('image',this.profileForm.controls['image'].value);
  uploadData.append('price',this.profileForm.controls['price'].value);
  uploadData.append('quantity',this.profileForm.controls['quantity'].value);
  uploadData.append('user_id',this.profileForm.controls['user_id'].value);
  uploadData.append('status',this.profileForm.controls['status'].value);
  uploadData.append('prod_type',this.profileForm.controls['prod_type'].value);
  uploadData.append('prod_desc',this.profileForm.controls['prod_desc'].value);
  uploadData.append('condition',this.profileForm.controls['condition'].value);
  uploadData.append('brand_name',this.profileForm.controls['brand_name'].value);

  this.Loader=true;
  setTimeout(()=>{ 
    this.Loader=false;
    

  this.http.post(environment.apiUrl + '/prod_dtls_save',uploadData).subscribe(response => {
    if(response['response']=='success'){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your Product has been saved',
        showConfirmButton: false,
        timer: 1500
      })

      this.router.navigate(['/machineandreadylist','machines'])
     
    }
    
   
  })
  },3000);
  
}
}
