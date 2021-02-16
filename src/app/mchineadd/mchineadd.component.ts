import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mchineadd',
  templateUrl: './mchineadd.component.html',
  styleUrls: ['./mchineadd.component.css']
})
export class MCHINEADDComponent implements OnInit {
  Loader: boolean;
  constructor(private router:Router) { }


  ngOnInit(): void {
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
    console.log("========")
    this.Loader=true;
    setTimeout(()=>{ 
      this.Loader=false;
      this.router.navigate(['/customerhome'])   
    // console.log(this.profileForm.value)
    // this.http.post(environment.apiUrl + '/sign_up',(this.profileForm.value)).subscribe(response => {
    //   if(response['response']=='success'){
       
      //}
      
     
    //})
    },3000);
    
  }


}
