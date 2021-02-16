import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customerdropdown',
  templateUrl: './customerdropdown.component.html',
  styleUrls: ['./customerdropdown.component.css']
})
export class CustomerdropdownComponent implements OnInit {
  Loader: boolean;
  Seletedvalue: any;
  id: string;
  User_id: string;
  Customised: boolean;
  Readymade: boolean;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private router:Router,private toastr: ToastrService) { 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    
    });
  }

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
  selectChange(value){
    this.Seletedvalue=value;
    if(value=='custom'|| value=='fabric'||value=='stitching'||value=='fabricandstitching'){
      this.Customised=true;
      this.Readymade=false;
    }
    if(value=='Order Based Form'|| value=='Ready Made Uniforms'){
      this.Readymade=true;
      this.Customised=false;
    }
    if(value=='Uniform Accessories'){
      this.Readymade=false;
      this.Customised=false;
    }
    
  

  }
  CustomerSave(){
    this.Loader=true;
    if(this.Seletedvalue=='fabric'){
    localStorage.setItem('product_type','Customized Uniforms');
    localStorage.setItem('sub_type','Fabrics');
    this.Loader=false;
    this.router.navigate(['/fabricform'])
    }
    else if(this.Seletedvalue=='stitching'){
    localStorage.setItem('product_type','Customized Uniforms');
    localStorage.setItem('sub_type','Stitching');
    this.Loader=false;
      this.router.navigate(['/custcustomsstitch'])
    }

    else if(this.Seletedvalue=='fabricandstitching'){
      localStorage.setItem('product_type','Customized Uniforms');
      localStorage.setItem('sub_type','Fabric and Stitching');
      this.Loader=false;
        this.router.navigate(['/custcustomfabricstitch'])
      }
    else if(this.Seletedvalue=='Order Based Form'){
    localStorage.setItem('product_type','Ready Made Uniforms');
    localStorage.setItem('sub_type','Order Based Form');
    this.Loader=false;
      this.router.navigate(['/readymadeorder'])
    }
    else if(this.Seletedvalue=='Uniform Accessories') {
    this.router.navigate(['/custunfrmaccs'])
    localStorage.setItem('product_type','Uniform Accesoriess');
    this.Loader=false;
    localStorage.setItem('sub_type','none');
    }
    else{
      this.toastr.error('Please selece a Service','Sorry')
      this.Loader=false;
    }
    // else{
    //   localStorage.setItem('prod_type','Customized Uniforms');
    //   localStorage.setItem('sub_type','fabricandstitching');
    //   this.router.navigate(['supplieruniformcustunifrmfabricandstitch',this.id])

    // }
  }
  LogOut(){
    localStorage.removeItem('userid');

    window.location.reload();
  }

}
