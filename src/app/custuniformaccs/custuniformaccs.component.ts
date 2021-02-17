import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-custuniformaccs',
  templateUrl: './custuniformaccs.component.html',
  styleUrls: ['./custuniformaccs.component.css']
})
export class CustuniformaccsComponent implements OnInit {
  fabricForm: FormGroup;
  submitted = false;
  Loader: boolean;
  SelectedFile: any;
  categories: any;
  User_id: string;
  myDate: string;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router ,public datePipe: DatePipe) { 
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'); }
  ngOnInit(): void {
     this.User_id=localStorage.getItem('userid');
     this.fabricForm = this.formBuilder.group({
      terms: ['', Validators.required],
      delivery_date: ['', Validators.required],
      item:['' , ],
      count:['',],
      message:[''],
      photo:['',],
    
      product_type: [localStorage.getItem('product_type')],
      prod_sub_type: [localStorage.getItem('sub_type')],
  
   
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
  
  LogOut(){
    localStorage.removeItem('userid');

    window.location.reload();
  }

  FabricFormsave(){
    this.submitted = true;
    if(this.myDate >this.fval.delivery_date.value){
      return;
    }
    if (this.fabricForm.invalid) {
       return;
       }
     
    const uploadData = new FormData();
    uploadData.append('file','');
    uploadData.append('product_type',this.fabricForm.controls['product_type'].value);
    uploadData.append('prod_sub_type',this.fabricForm.controls['prod_sub_type'].value);
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
    },1500);
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
    //this.containers.push(this.containers.length)
  }
  Remove(i:number){
      const control = <FormArray>this.fabricForm.get('order_lines')
      control.removeAt(i);

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
  CustomerSave(){
   
    this.Loader=true;
    setTimeout(()=>{ 
      this.Loader=false;
      this.router.navigate(['/customerhome'])   
   
    },3000);
    
  }
}

