import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-supplieruniformcustunifrmfabricandstitch',
  templateUrl: './supplieruniformcustunifrmfabricandstitch.component.html',
  styleUrls: ['./supplieruniformcustunifrmfabricandstitch.component.css']
})
export class SupplieruniformcustunifrmfabricandstitchComponent implements OnInit {
  containers=[0];
  Loader: boolean;
  list: { name: string; checked: boolean;value:string }[];
  id: string;
  profileForm: FormGroup;
  Femalenumbers: any =0;
  maleNumbers: any=0;
  submitted = false;
  total_numbers:any=0;
  myArray: any=[];
  myString:string;
  CompanyDelaer: string;
  fnum:any=0;
  mnum:any=0;
  total_num: number;
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
     
      company_undertaking: ['', Validators.required],
      no_labours: ['', Validators.required],
      male_number:['', Validators.required],
      female_number:['',Validators.required],
      terms:['',Validators.required],
      item:[''],
      count:[''],
      temp_id:[this.id],
      prod_type:[localStorage.getItem('prod_type')],
      sub_type:[localStorage.getItem('sub_type')],
      user_id:[''],
      is_companydeler:[],
      compnay_names:[],
      order_lines:this.formBuilder.array([
        this.createOrderFormGroup()
    ])

  

  
     });
    this.list = 
    [
      {name :'School / College Uniform',checked : false,value:'US'},
      {name :'Hospital Uniform',checked : false,value:'UH'},
      {name :'Catering Uniforms',checked : false,value:'UC'},
      {name :'Industraial Uniform',checked : false,value:'UI'},
      {name :'Corporate Uniform',checked : false,value:'UR'},
      {name :'Readymades',checked : false,value:'RD'}
    ]



  }

  getControls(){
    
    return (<FormArray>this.profileForm.get('order_lines')).controls;
   
  }
  ADD(){
    const order_lines = this.profileForm.get('order_lines') as FormArray
    order_lines.push(this.createOrderFormGroup())
    this.containers.push(this.containers.length)
  }
  Remove(i:number){
      const control = <FormArray>this.profileForm.get('order_lines')
      control.removeAt(i);

  }

  createOrderFormGroup():FormGroup{
    return  this.formBuilder.group({
     count:['', Validators.required],
     item:['', Validators.required],
      
     })
   }

   canBeEditable(event){
  
    if(event){
      this.CompanyDelaer='Yes';
      //this.profileForm.get('is_companydeler').setValue('Yes')
  
    }
    else{
      this.CompanyDelaer='No';
      //this.profileForm.get('is_companydeler').setValue('No')
  
    }
  
    }
 

shareCheckedList(item:any[]){
  this.myArray.push(item)

  this.myString = item.toString();


  
  
  this.profileForm.get('company_undertaking').setValue( this.myString)

}
shareIndividualCheckedList(item:{}){
//console.log(item);
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
NoMale(){
 this.maleNumbers=this.profileForm.controls['male_number'].value;
 this.total_numbers=parseInt(this.total_numbers)+ parseInt(this.maleNumbers);
 this.profileForm.get('no_labours').setValue(this.total_numbers)
}
Nofemale(){
  this.total_num=parseInt(this.fnum)+parseInt(this.mnum)

//  this.Femalenumbers=this.profileForm.controls['female_number'].value;
//  this.total_numbers=parseInt(this.total_numbers)+ parseInt(this.Femalenumbers);
//  this.profileForm.get('no_labours').setValue(this.total_numbers)

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
  if(this.CompanyDelaer=='Yes'){
    this.profileForm.get('is_companydeler').setValue(this.CompanyDelaer);
   }
  const uploadData = new FormData();
  
  uploadData.append('company_undertaking',this.profileForm.controls['company_undertaking'].value);
  uploadData.append('no_labours',this.profileForm.controls['no_labours'].value);
  uploadData.append('male_number',this.profileForm.controls['male_number'].value);
  uploadData.append('female_number',this.profileForm.controls['female_number'].value);
  uploadData.append('prod_type',this.profileForm.controls['prod_type'].value);
  uploadData.append('sub_type',this.profileForm.controls['sub_type'].value);
  uploadData.append('user_id',this.profileForm.controls['user_id'].value);
  uploadData.append('is_companydeler',this.profileForm.controls['is_companydeler'].value);

  

  uploadData.append('order_lines',JSON.stringify(this.profileForm.controls['order_lines'].value));




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
