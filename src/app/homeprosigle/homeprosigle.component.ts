import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-homeprosigle',
  templateUrl: './homeprosigle.component.html',
  styleUrls: ['./homeprosigle.component.css']
})
export class HomeprosigleComponent implements OnInit {
  Loader: boolean;
  type: string;
  ProdList: any=[];
  User_id: any;
  ContactList: any=[];
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
    this.route.paramMap.subscribe(params => {
      this.type=params.get('type');

      console.log(this.type)
    
    });
   }

  ngOnInit(): void {
    this.getProductById();
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
  getProductById(){
    this.http.post(environment.apiUrl + '/prod_list_byid',{user_id:'',prod_id:this.type}).subscribe(response => 
    {
      if(response['response']=='success'){


        this.getConatctDetails(response['product_dtls_list'][0].user_id)


       
        
        this.ProdList=response['product_dtls_list'];
      
       console.log(this.ProdList)
       
      }
      

  });
}
getConatctDetails(user_id){
  this.http.post(environment.apiUrl + '/supplier_list',{user_id:user_id}).subscribe(response => 
    {
      if(response['response']=='success'){
   this.ContactList=response['product_dtls_list'];
      
       console.log(this.ProdList)
       
      }
      

  });
}


}




