import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import $ from "jquery";

@Component({
  selector: 'app-fabricform',
  templateUrl: './fabricform.component.html',
  styleUrls: ['./fabricform.component.css'],
  

})
export class FabricformComponent implements OnInit {
  containers=[0];
  SelectedFile: any;
  Loader: boolean;
  submitted = false;
  categories: any;
  User_id: string;
  ShowProductdetals: boolean=false;
  myDate: string;

 

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router,private toastr:ToastrService,public datePipe: DatePipe) { 
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  fabricForm: FormGroup;
  ngOnInit(): void {
     // localStorage.setItem('category_type','US')
     this.User_id=localStorage.getItem('userid');
     this.fabricForm = this.formBuilder.group({
      model_type:['', Validators.required],
      brand_name: [''],
      terms:['',Validators.required],
      catalog_number: ['',],
      design_no:[''],
      shade_no: [''],
      delivery_date: ['', Validators.required],
      item:['' , ],
      count:['',],
      message:[''],
      pincode:[''],
      prod_image:[''],

     
      product_type: [localStorage.getItem('product_type')],
      prod_sub_type: [localStorage.getItem('sub_type')],
     
      user_id:[localStorage.getItem('userid')],
      order_lines: this.formBuilder.array([
        this.createOrderFormGroup()
    ])
  
     });
     console.log(this.fabricForm.controls['order_lines'])
  }
  get fval() { return this.fabricForm.controls; }
  processFile(event){
    if(this.fabricForm.get('prod_image').value.split(".")[1].toUpperCase() == "JPG" || 
    this.fabricForm.get('prod_image').value.split(".")[1].toUpperCase() == "JPEG" || 
    this.fabricForm.get('prod_image').value.split(".")[1].toUpperCase() == "PNG"  ){
      this.SelectedFile = event.target.files[0]
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Sorry...',
        text: 'Please upload file in these format only (jpg, jpeg, png)!',
      })
     
    }

 
  }

  AddProduct(){
    this.ShowProductdetals=true;

  }
  
  FabricFormsave(){  
   
    this.submitted = true;

    if(this.myDate >this.fval.delivery_date.value){
      return;
    }
   
    if (this.fabricForm.invalid) {
       return;
       }
   
  
      //  alert('form fields are validated successfully!');
     
    const uploadData = new FormData();
    uploadData.append('file',this.SelectedFile);
    uploadData.append('product_type',this.fabricForm.controls['product_type'].value);
    uploadData.append('prod_sub_type',this.fabricForm.controls['prod_sub_type'].value);
    uploadData.append('model_type',this.fabricForm.controls['model_type'].value);
    uploadData.append('brand_name',this.fabricForm.controls['brand_name'].value);
    uploadData.append('catalog_number',this.fabricForm.controls['catalog_number'].value);
    uploadData.append('design_no',this.fabricForm.controls['design_no'].value);
    uploadData.append('shade_no',this.fabricForm.controls['shade_no'].value);
    uploadData.append('delivery_date',this.fabricForm.controls['delivery_date'].value);
    uploadData.append('message',this.fabricForm.controls['message'].value);
    uploadData.append('pincode',this.fabricForm.controls['pincode'].value);
    uploadData.append('prod_image',this.fabricForm.controls['prod_image'].value);
    uploadData.append('user_id',this.fabricForm.controls['user_id'].value);

    
    uploadData.append('order_lines',JSON.stringify(this.fabricForm.controls['order_lines'].value));

    this.Loader=true;
    setTimeout(()=>{ 
      this.Loader=false;   
    
    this.http.post(environment.apiUrl + '/orders',uploadData).subscribe(response => {
      console.log(response)
      if(response['response']=='Data saved success fully'){
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: "Your Requirement's  has been submitted successfully , Your Order will expire at   "+   this.fabricForm.get('delivery_date').value,
        })
        console.log(this.fabricForm.value);
        
    
        this.router.navigate(['/customerhome'])
      }
      
     
    })
    },1500);
  }

  ImageSet(control: FormControl) {
    let value=control.value.split(".")[1]
    console.log(value)
  if(value!="jpg"||value!="jpeg"||value!="png"){
    console.log("==========")
    return {res:true}
  }
  return null;
}
   
 
  getValidity(i) {
    return (<FormArray>this.fabricForm.get('order_lines')).controls[i].invalid;
  }
  selectChange(value){
    this.fabricForm.controls['model_type'].setValue(value);
    this.http.post(environment.apiUrl + '/get_categories',{'category_type':value}).subscribe(response => {
      if(response['response']=='Success'){
        this.categories =response['category_dtls_list']
      }
      
     
    })
    

  }
  ADD(){
    const order_lines = this.fabricForm.get('order_lines') as FormArray
    order_lines.push(this.createOrderFormGroup())
    this.containers.push(this.containers.length)
  }
  Remove(i:number){
      const control = <FormArray>this.fabricForm.get('order_lines')
      control.removeAt(i);

  }
  LogOut(){
    localStorage.removeItem('userid');

    window.location.reload();
  } 
  
  getControls(){
    return (<FormArray>this.fabricForm.get('order_lines')).controls;
   
  }

 createOrderFormGroup():FormGroup{
   return  this.formBuilder.group({
    count:['',Validators.required],
    item:['',Validators.required],
    brand_name:['',],
    catalog_number:['',],
    design_no:['',],
    shade_no:['',],
      
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


  // FabricFormsave(){
  //   this.submitted = true;
  //  if (this.fabricForm.invalid) {
  //     return;
  //     }
  //     alert('form fields are validated successfully!');

  //   this.Loader=true;
  //   setTimeout(()=>{ 
  //     this.Loader=false;
  //   console.log(this.fabricForm.value)
  //   this.http.post(environment.apiUrl + '/sign_up',(this.fabricForm.value)).subscribe(response => {
  //     if(response['response']=='success'){
  //       this.router.navigate(['/progress'])
       
  //     }
      
     
  //   })
  //   },3000);
    
  // }
  
}
  


