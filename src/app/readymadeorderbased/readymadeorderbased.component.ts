import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-readymadeorderbased',
  templateUrl: './readymadeorderbased.component.html',
  styleUrls: ['./readymadeorderbased.component.css']
})
export class ReadymadeorderbasedComponent implements OnInit {
  containers=[0];
  SelectedFile: any;
  Loader: boolean;
  categories: any;
  submitted=false;
  myDate: string;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router,public datePipe: DatePipe) { 
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  fabricForm: FormGroup;
  ngOnInit(): void {
     // localStorage.setItem('category_type','US')
     this.fabricForm = this.formBuilder.group({
    
      product_type: [localStorage.getItem('product_type')],
      prod_sub_type: [localStorage.getItem('sub_type')],
      item:[''],
      count:[''],
      model_type:['', Validators.required],
      delivery_date: ['', Validators.required],
      terms:['', Validators.required],
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
    const uploadData = new FormData();
    uploadData.append('file',this.SelectedFile);
    uploadData.append('product_type',this.fabricForm.controls['product_type'].value);
    uploadData.append('prod_sub_type',this.fabricForm.controls['prod_sub_type'].value);
    uploadData.append('model_type',this.fabricForm.controls['model_type'].value);
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
          title: 'Successfull...',
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
  ADD(){
    const order_lines = this.fabricForm.get('order_lines') as FormArray
    order_lines.push(this.createOrderFormGroup())
    this.containers.push(this.containers.length)
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
    size:['',Validators.required],
     
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
}

