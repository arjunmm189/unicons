import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common'



@Component({
  selector: 'app-fabriclist',
  templateUrl: './fabriclist.component.html',
  styleUrls: ['./fabriclist.component.css']
})
export class FabriclistComponent implements OnInit {
  Loader: boolean;
  OrdeList: any=[];
  TempOrdeList: any=[];
  searchword:any
  minvalue: number;
  maxvalue: any;
  Pincode: any;
  date: Date;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router,public datepipe: DatePipe) {

   }

   SelectOnoptChnge(value,data){
     if(value=='All'){
      this.OrdeList=this.TempOrdeList;
       
     }
     else{
    this.OrdeList=this.TempOrdeList.filter(obj=>{
      return obj.prod_sub_type==value;

    })
  }


   }
   SelectPincodechnge(value,data){
    if(value=='All'){
      this.OrdeList=this.TempOrdeList;
       
     }
     else{

       this.minvalue=parseInt(value)-10;
       this.maxvalue=parseInt(value)+10

    this.OrdeList=data.filter(obj=>{
      return obj.pincode> this.minvalue && obj.pincode<this.maxvalue
      // return obj.pincode<=this.minvalue &&  obj.pincode>=this.maxvalue;

    })
  }


   }

  ngOnInit(): void {

    this.getOrders();
    this.getSupplierPincode();
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
  searchThis(data) {
    if(data=='' &&this.searchword=='' ){
  
      this.OrdeList=this.TempOrdeList;
    }



    this.OrdeList = data.filter(element=>{

  
      return element.product_type.toLowerCase()==this.searchword.toLowerCase()||element.product_type.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1||element.prod_sub_type.toLowerCase()==this.searchword.toLowerCase()||element.prod_sub_type.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
      || element.order_id.toLowerCase()==this.searchword.toLowerCase() ||element.order_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1|| element.delivery_date.toLowerCase()==this.searchword.toLowerCase() ||element.delivery_date.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
      || element.pincode.toLowerCase()==this.searchword.toLowerCase() || element.pincode.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1;
   }); 
  
  }

  getSupplierPincode(){
    this.http.post(environment.apiUrl + '/pincode',{user_id:localStorage.getItem('userid')}).subscribe(response => {
      if(response['response']=='success'){
        
        this.Pincode=response['product_dtls_list'][0].pincode;

        
      
       
      }
      
     
    })

  }
  
  SelctChnge(type,data){
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    if(type=="asc"){
      this.OrdeList= data.sort((a, b) => new Date(a.delivery_date).getTime() - new Date(b.delivery_date).getTime()); 
    }
    if(type=="desc"){
      this.OrdeList=  data.sort((a, b) => new Date(b.delivery_date).getTime() - new Date(a.delivery_date).getTime()); 
   }
  
 if(type=="all"){
  this.OrdeList=  this.TempOrdeList;
}
  }
 
  getOrders(){
   
    this.http.post(environment.apiUrl + '/bulk_enquiries',{product_type:localStorage.getItem('sellertype'),product_sub_type:localStorage.getItem('sellersubtype')}).subscribe(response => {
      if(response['response']=='success'){
        
        this.OrdeList=response['product_dtls_list'];
        this.TempOrdeList=response['product_dtls_list']
    
      }
      
     
    })

  }

}
