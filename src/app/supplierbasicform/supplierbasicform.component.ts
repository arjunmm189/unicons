import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-supplierbasicform',
  templateUrl: './supplierbasicform.component.html',
  styleUrls: ['./supplierbasicform.component.css']
})
export class SupplierbasicformComponent implements OnInit {
  Seletedvalue: any;
  id: string;
  Loader: boolean;
  Customised: boolean;
  Readymade: boolean;
  Accesories: boolean;
  Machine: boolean;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router,private toastr: ToastrService) { 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    
    });
    
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
  ngOnInit(): void {
  
  }
  selectChange(value){
    
   
    this.Seletedvalue=value;
    if(value=='custom'||value=='fabric'||value=='stitching'||value=='fabricandstitching'){
      this.Customised=true;
    }
    if(value=='Ready Made Uniforms' ||value=='Uniform Accessories' || value=='Machines and SpareParts' ){
      this.Customised=false;
    }
    
  

  }
  setradio(value){
    if(value=='custom'){
      this.Customised=true;
      this.Readymade=false;
      this.Accesories=false;
      this.Machine=false;

    }
    if(value=='Readymade'){
      this.Customised=false;
      this.Readymade=true;
      this.Accesories=false;
      this.Machine=false;

    }
    if(value=='Accesories'){
      this.Customised=false;
      this.Readymade=false;
      this.Accesories=true;
      this.Machine=false;

    }
    if(value=='Machine'){
      this.Customised=false;
      this.Readymade=false;
      this.Accesories=false;
      this.Machine=true;

    }

  }
  CustomerSave(){
    if(this.Seletedvalue=='fabric'){
    localStorage.setItem('prod_type','Customized Uniforms');
    localStorage.setItem('sub_type','fabric');
    this.router.navigate(['supplieruniformcustunifrmfabric',this.id])
    }
    else if(this.Seletedvalue=='stitching'){
    localStorage.setItem('prod_type','Customized Uniforms');
    localStorage.setItem('sub_type','stitching');
    this.router.navigate(['supplieruniformcustunifrmstitch',this.id])
    }
    else if(this.Seletedvalue=='Ready Made Uniforms'){
     
    localStorage.setItem('prod_type','Ready Made Uniforms');
    localStorage.setItem('sub_type','none');
    this.router.navigate(['supplierreadymade',this.id])
    }
    else if(this.Seletedvalue=='Uniform Accessories'){
     
    this.router.navigate(['supplieriniformaccs',this.id])
    localStorage.setItem('prod_type','Uniform Accessories');
    localStorage.setItem('sub_type','none');
    }
    else if(this.Seletedvalue=='Machines and SpareParts'){
     
    
    localStorage.setItem('prod_type','machinespareparts');
    localStorage.setItem('sub_type','machine');
    this.router.navigate(['/machine'])
    }
    else if (this.Seletedvalue=='fabricandstitching'){
      localStorage.setItem('prod_type','Customized Uniforms');
      localStorage.setItem('sub_type','fabricandstitching');
      this.router.navigate(['supplieruniformcustunifrmfabricandstitch',this.id])

    }
    else{
      this.toastr.error('Please selece a Service','Sorry')

    }
  }
}
  

