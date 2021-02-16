import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-labrouslist',
  templateUrl: './labrouslist.component.html',
  styleUrls: ['./labrouslist.component.css']
})
export class LabrouslistComponent implements OnInit {
  id: string;
  ProdList: any=[];
  Loader: boolean;
  tempList: any=[];
  searchword:any;
  username:any;
  showModal: boolean;
  Status: any;
  profileForm: FormGroup;
  submitted: boolean;
  Staus: string;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
   
   }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({

      status:[''],
      user_id:['']
     
    
 

  
     });
  
 
    
    this.getProduct()
  }
  Onchange(value){
    if(value=='all'){
      this.ProdList=this.tempList;
    }
    else{
    this.ProdList=this.tempList.filter(obj=>{
      return obj.status=='Active'
      //return obj.pincode> this.minvalue && obj.pincode<this.maxvalue
      // return obj.pincode<=this.minvalue &&  obj.pincode>=this.maxvalue;

    })
  }
  }
  canBeEditable1(event){
  

    if(event){
      this.Staus='DeActive';
 
      
    }
    else{
      this.Status='Active';
     
  
  
    }
  }
  canBeEditable2(event){


    if(event){
      this.Staus='Active';

    }
    else{
      this.Status='DeActive';
     
    }
  }
  searchThis(){
    this.ProdList = this.tempList.filter(element=>{
   
    return  element.work_type.toLowerCase()==this.searchword.toLowerCase() || element.work_type.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1;
 }); 

  }
  hide()
{
  this.showModal = false;
}
show()
{
  
  this.showModal = true;

  this.profileForm.get('user_id').setValue(this.username)
  this.http.post(environment.apiUrl + '/get_laboursstatus',{user_id:this.username}).subscribe(response => {
    if(response['response']=='success'){
      this.Status=response['labour_status']
      console.log(this.Status)

     
     
    }
    
   
  })
  
}
CustomerSave(){
  this.submitted = true;
  this.showModal = false;

  console.log(this.Staus)
  this.profileForm.get('status').setValue(this.Staus)
  
  this.Loader=true;
  setTimeout(()=>{ 
  
  
  this.http.post(environment.apiUrl + '/ChngeLabourStatus',(this.profileForm.value)).subscribe(response => {
    if(response['response']=='success'){
      this.Loader=false;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work status is '+response['product_dtls_list'][0].status,
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/home'])
     
    }
    if(response['response']=='notFound'){
      this.Loader=false;
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'You are not a Registered Labour',
        showConfirmButton: false,
        timer: 1500
      })
      
     
    }
    
    
   
  })
  },3000);
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
  customerouerter(path,id){
    this.Loader=true;

    setTimeout(()=>{                         
      this.router.navigate([path,id]);
      this.Loader=false;
 }, 3000);
   
  }

  
  getProduct(){

    this.http.post(environment.apiUrl + '/getlabours_technisions_list',{prod_type:'uii'}).subscribe(response => {
      if(response['response']=='success'){
        this.ProdList=response['product_dtls_list'];

        this.ProdList=response['product_dtls_list'].filter(obj=>{
          return obj.status=='Active'
        })
        this.tempList=response['product_dtls_list'];
       
       
      }
      
     
    })

  }

}
