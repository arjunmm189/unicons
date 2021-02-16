import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';


 

@Component({
  selector: 'app-adminaccs',
  templateUrl: './adminaccs.component.html',
  styleUrls: ['./adminaccs.component.css']
})
export class AdminaccsComponent implements OnInit {
  Loader: boolean;
  ProdList: any;
  showModal: boolean;
  Image: any;
  TempList: any;
  searchword: string;
  
  


  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.getProduct();
  }
 
  rourter(path,user_type,sub_type){
    this.Loader=true;

    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
}




searchThis(){
  this.ProdList = this.TempList.filter(element=>{
   
    return element.user_id!=''&& element.user_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
    || element.shades.toLowerCase()==this.searchword.toLowerCase()||element.shades!=''&& element.shades.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
    ||  element.item_name.toLowerCase()==this.searchword.toLowerCase() || element.item_name.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
    

 }); 
}


  show(image)
  {
    this.showModal = true; // Show-Hide Modal Check
    this.Image='http://api.uniconform.in'+''+image;
    console.log(this.Image)
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }

  deleteID(id,index,user_id){
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
      this.deleteconform(id,index,user_id);
      }
      
    })


  }
  deleteconform(id,index,user_id){
    this.http.post(environment.apiUrl + '/delete_prod_dtls',{prod_id:id,user_id:user_id}).subscribe(response => {
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

  this.http.post(environment.apiUrl + '/getAccessories',{prod_type:'uii'}).subscribe(response => {
    if(response['response']=='success'){
      this.ProdList=response['product_dtls_list'];
      this.TempList=response['product_dtls_list']
    
     
    }
    
   
  })

}

}
