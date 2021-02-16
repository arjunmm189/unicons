import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signuplink',
  templateUrl: './signuplink.component.html',
  styleUrls: ['./signuplink.component.css']
})
export class SignuplinkComponent implements OnInit {
  Loader: boolean;
  SelectedValue: any;

  constructor(private router:Router) { }



SelectChnge(value){
  this.SelectedValue = value;
}
Continue(){
  if(this.SelectedValue=='customer'){
    localStorage.setItem('user_type','uniforms');
    localStorage.setItem('sub_type','customer');
    this.router.navigate(['/form']);
  }
  if(this.SelectedValue=='supplier'){
    localStorage.setItem('user_type','uniforms');
    localStorage.setItem('sub_type','supplier');
    this.router.navigate(['/supplier']);
  }
  if(this.SelectedValue=='labours'){
    localStorage.setItem('user_type','labourstechnicians');
    localStorage.setItem('sub_type','labours');
    this.router.navigate(['/labourform']);
  }
}

  ngOnInit(): void {
  }
  rouerter(path,user_type,sub_type){
    this.Loader=true;

    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
}

}
