import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplieruniformaccsaccsreadymade',
  templateUrl: './supplieruniformaccsaccsreadymade.component.html',
  styleUrls: ['./supplieruniformaccsaccsreadymade.component.css']
})
export class SupplieruniformaccsaccsreadymadeComponent implements OnInit {
  Loader: boolean;
  User_id: string;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.User_id=localStorage.getItem('userid');
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
  // console.log("========")
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
