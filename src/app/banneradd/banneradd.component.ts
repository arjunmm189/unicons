import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banneradd',
  templateUrl: './banneradd.component.html',
  styleUrls: ['./banneradd.component.css']
})
export class BanneraddComponent implements OnInit {
  profileForm: FormGroup;
  Loader: boolean;
  submitted = false;
  User_id: string;
  myFiles: any=[];
  id: string;
  ImageList: any;
  
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router,private toastr:ToastrService) { 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if(this.id){
        this.imageDetails()
      }

    
    });
  }

 

    ngOnInit(): void {
      this.User_id=localStorage.getItem('userid');
      // localStorage.setItem('category_type','US')
      this.profileForm = this.formBuilder.group({

        banner: [''],
        photo:['', Validators.required],
        banner_type: ['',Validators.required],

       
    
       });
    }
    get fval() {
      return this.profileForm.controls;
      }
      oFileChange(event){
        for(var i=0;i<event.target.files.length;i++){

          console.log(event)
          if(event.target.files[i].type=='image/jpeg'||event.target.files[i].type=='image/png'){
            console.log("====4")
          console.log(event.target.files[i])
           this.myFiles.push(event.target.files[i])
           
      
        }
        else{
          
          this.toastr.error('Image format should be jpeg or png','Sorry')
    
      }

      }
    }
  
  rourter(path,user_type,sub_type){
    this.Loader=true;
    localStorage.setItem('user_type',user_type);
    localStorage.setItem('sub_type',sub_type);
    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
}
selectChange(type){
  this.profileForm.get('banner_type').setValue(type);
}
addbannerImage(){

  if(this.profileForm.get('banner_type').value==''){
    this.toastr.error('Please select Banner Type','Sorry')
  }
  if(this.myFiles.length==0){
    this.toastr.error('Please select Image','Sorry')
  }
  var formData = new FormData();
 
  for(let i=0;i<this.myFiles.length;i++){
    console.log(this.myFiles[i])
    formData.append('myfile',this.myFiles[i])

 
  }
  formData.append('banner_type',this.profileForm.get('banner_type').value)
  formData.append('banner_name',this.profileForm.get('banner').value)

  if(this.profileForm.get('banner_type').value &&this.myFiles.length>0){

  this.http.post(environment.apiUrl + '/banneraddd',formData).subscribe(response => {
    if(response['response']=="Data saved success fully"){
      this.router.navigate(['/banner'])
    }
     
     
  })
}

}
imageDetails(){
  this.http.post(environment.apiUrl + '/ImageDetails',{id:this.id}).subscribe(response => {
    if(response['response']=="success"){
      this.ImageList=response['product_dtls_list']
  
    }
     
     
  })
}
EditBannerImage(){
  var formData = new FormData();
 
  for(let i=0;i<this.myFiles.length;i++){
    console.log(this.myFiles[i])
    formData.append('myfile',this.myFiles[i])

 
  }
  formData.append('id',this.id)

  if(this.myFiles.length==0){
    this.toastr.error('Please select  Image to Edit ','Sorry')
  }

  if(this.myFiles.length>0){
  this.http.post(environment.apiUrl + '/EditBannerImage',formData).subscribe(response => {
    if(response['response']=="success"){
      this.router.navigate(['/banner'])
    }
     
     
  })
}

}
}
