import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-custcustomfabricstitch',
  templateUrl: './custcustomfabricstitch.component.html',
  styleUrls: ['./custcustomfabricstitch.component.css']
})
export class CustcustomfabricstitchComponent implements OnInit {
  containers=[0];
  SelectedFile: any;
  Loader: boolean;
  submitted = false;
  categories: any;
  StichType: string='No';
  User_id: string;
  myDate: any;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router,public datePipe: DatePipe) { 
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  fabricForm: FormGroup;
  ngOnInit(): void {
    // localStorage.setItem('category_type','US')
    this.User_id=localStorage.getItem('userid');
    this.fabricForm = this.formBuilder.group({
      terms:['', Validators.required],
      model_type:['', Validators.required],
      total_count:['', Validators.required],
      delivery_date: ['', Validators.required],
      // item:['' ,],
      // count:['',],
      product_type: [localStorage.getItem('product_type')],
      prod_sub_type: [localStorage.getItem('sub_type')],
    
       stich_type: [''],
     
     
    
    
     message:[''],
     photo:['',],
     user_id:[localStorage.getItem('userid')],
     order_lines: this.formBuilder.array([
       this.createOrderFormGroup()
   ])
 
    });
 
 }
  get fval() { return this.fabricForm.controls; }
  processFile(event){
    if(this.fabricForm.get('photo').value.split(".")[1].toUpperCase() == "JPG" || this.fabricForm.get('photo').value.split(".")[1].toUpperCase() == "JPEG" || this.fabricForm.get('photo').value.split(".")[1].toUpperCase() == "PNG"  ){
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

  FabricFormsave(){
    this.submitted = true;
    if(this.myDate >this.fval.delivery_date.value){
      return;
    }
    if (this.fabricForm.invalid) {
       return;
       }
      //  alert('form fields are validated successfully!');
    if( this.StichType=='Yes'){
      this.fabricForm.get('stich_type').setValue(this.StichType);
    }

    const uploadData = new FormData();
    uploadData.append('file',this.SelectedFile);
    uploadData.append('product_type',this.fabricForm.controls['product_type'].value);
    uploadData.append('prod_sub_type',this.fabricForm.controls['prod_sub_type'].value);
    uploadData.append('model_type',this.fabricForm.controls['model_type'].value);
    uploadData.append('stich_type',this.fabricForm.controls['stich_type'].value);
    uploadData.append('total_count',this.fabricForm.controls['total_count'].value);
    uploadData.append('delivery_date',this.fabricForm.controls['delivery_date'].value);
    uploadData.append('message',this.fabricForm.controls['message'].value);
    uploadData.append('photo',this.fabricForm.controls['photo'].value);
    uploadData.append('user_id',this.fabricForm.controls['user_id'].value);
    uploadData.append('order_lines',JSON.stringify(this.fabricForm.controls['order_lines'].value));

    this.Loader=true;
    setTimeout(()=>{ 
      this.Loader=false;   
    
    this.http.post(environment.apiUrl + '/orders',uploadData).subscribe(response => {
      if(response['response']=='Data saved success fully'){
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: "Your Requirement's  has been submitted successfully , Your Order will expire at   "+        this.fabricForm.get('delivery_date').value,
        })
    
        this.router.navigate(['/customerhome'])
      }
      
      
     
    })
    },3000);
  }
  selectChange(value){
    this.categories=[]
    this.fabricForm.controls['model_type'].setValue(value);
    this.http.post(environment.apiUrl + '/get_categories',{'category_type':value}).subscribe(response => {
      if(response['response']=='Success'){
        this.categories =response['category_dtls_list']
      }
      
     
    })

  }
  canBeEditable(event){
    if(event){
      this.StichType='Yes';

    }
    else{
      this.StichType='No';

    }

  }
  ADD(){
    const order_lines = this.fabricForm.get('order_lines') as FormArray
    order_lines.push(this.createOrderFormGroup())
    this.containers.push(this.containers.length)
  }
  Remover(){
      // const control = <FormArray>this.fabricForm.get('order_lines')
      // control.removeAt(i);

  }
  getControls(){
   
    return (<FormArray>this.fabricForm.get('order_lines')).controls;
   
  }

 createOrderFormGroup():FormGroup{
   return  this.formBuilder.group({
    count:['',Validators.required],
    item:['',Validators.required],
     
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
  LogOut(){
    localStorage.removeItem('userid');

    window.location.reload();
  }
  CustomerSave(){
    this.submitted = true;
   if (this.fabricForm.invalid) {
      return;
      }
    

    this.Loader=true;
    setTimeout(()=>{ 
      this.Loader=false;
      this.router.navigate(['/customerhome'])   
   
    },3000);
    
  }
  
  
}
