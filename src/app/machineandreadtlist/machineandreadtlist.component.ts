import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-machineandreadtlist',
  templateUrl: './machineandreadtlist.component.html',
  styleUrls: ['./machineandreadtlist.component.css']
})
export class MachineandreadtlistComponent implements OnInit {
  id: string;
  ProdList: any=[];
  Loader: boolean;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    
    });
   }

  ngOnInit(): void {
    this.getProduct()
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
  deleteID(id,index){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
      this.deleteconform(id,index);
      }
      
    })


  }
  deleteconform(id,index){
    this.http.post(environment.apiUrl + '/delete_prod_dtls',{prod_id:id,user_id:localStorage.getItem('userid')}).subscribe(response => {
      if(response['response']=='success'){
        this.ProdList.splice(index,1)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
       
      }
      
     
    })
  }
  
  getProduct(){

    this.http.post(environment.apiUrl + '/get_prod_list',{prod_type:this.id,user_id:localStorage.getItem('userid')}).subscribe(response => {
      if(response['response']=='success'){
        this.ProdList=response['product_dtls_list'];
       
       
      }
      
     
    })

  }

}
