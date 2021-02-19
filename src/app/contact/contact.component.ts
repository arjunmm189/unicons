import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  Loader: boolean;
  

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) { }

  fabricForm: FormGroup;
  ngOnInit(): void {
     // localStorage.setItem('category_type','US')
     this.fabricForm = this.formBuilder.group({
    
      
      subject:['', Validators.required],
      name: ['',Validators.required],
      org_name:['', Validators.required],
      email:['',Validators.required],
      phone_numer:['',Validators.required],
      message:['',Validators.required]
    
    
  
     });
  
  }


  sendMail()
{
 
   this.http.post(environment.apiUrl + '/mail',(this.fabricForm.value)).subscribe(response => {
    if(response['response']=='success'){
     return;
     console.log(this.fabricForm.value);
     
    }
    Swal.fire({
      text: "You have successfully submitted...!",
      icon: 'success',
    })
   
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
