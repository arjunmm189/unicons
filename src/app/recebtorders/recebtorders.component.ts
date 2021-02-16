import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-recebtorders',
  templateUrl: './recebtorders.component.html',
  styleUrls: ['./recebtorders.component.css']
})
export class RecebtordersComponent implements OnInit {

  Loader: boolean;
  ProdList: any=[];
  searchword:any
  TempOrdeList: any=[];
  id: string;
  type: string;
  quoteid: string;
  date: Date;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router,private toastr: ToastrService,public datepipe: DatePipe) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.type = params.get('prod_type');
      this.quoteid=params.get('quote_id');
    
    });
  }

  ngOnInit(): void {
    this.getProduct();
  }
  rouerter(path,id){
    this.Loader=true;

    setTimeout(()=>{                         
      this.router.navigate([path,id]);
      this.Loader=false;
 }, 3000);
   
  }
  rouerter1(user_id,form_id,date){
    this.http.post(environment.apiUrl + '/update_quotes',{quote_id:form_id,user_id:user_id,order_status:'Accepted by supplier',expiry_date:date,order_id:''}).subscribe(response => {
      if(response['response']=='success'){
        this.router.navigate(['/progress'])
        // this.toastr.success('Please wait, admin is verifying your customer!', 'Success!')
        // this.router.navigate(['/supplierhome'])
       
      }
    })

  }

  searchThis(data) {
  
    
    this.ProdList = this.TempOrdeList.filter(element=>{
      
  
      return element.user_id.toLowerCase()==this.searchword.toLowerCase()||element.user_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1||element.order_id.toLowerCase()==this.searchword.toLowerCase()||element.order_id.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1
      || element.product_type.toLowerCase()==this.searchword.toLowerCase() ||element.product_type.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1|| element.prod_sub_type.toLowerCase()==this.searchword.toLowerCase() ||element.prod_sub_type.toLowerCase().indexOf(this.searchword.toLowerCase())!=-1

 
   }); 
   
  }
  getProduct(){

    this.http.post(environment.apiUrl + '/list_by_id',{user_id:localStorage.getItem('userid')}).subscribe(response => {
      if(response['response']=='success'){
        this.ProdList=response['product_dtls_list'];
        this.TempOrdeList=response['product_dtls_list'];
        
       
      }
      
     
    })

  }
  CatChnge(type,data){
    if(type=='All'){
      this.ProdList=this.TempOrdeList
    }
    else{
      this.ProdList=this.TempOrdeList.filter((a) => a.prod_sub_type ==type);
    }
   

  }
  SelctChnge(type,data){
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    
    if(type=="asc"){
       this.ProdList= data.sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime()); 
    }
    if(type=="desc"){
      this.ProdList=  data.sort((a, b) => new Date(b.expiry_date).getTime() - new Date(a.expiry_date).getTime()); 
   }
   if(type=="exp"){
    this.ProdList=data.filter((a) => this.datepipe.transform(this.date, 'yyyy-MM-dd') >this.datepipe.transform(a.expiry_date, 'yyyy-MM-dd')); 
 }
 if(type=="all"){
  this.ProdList=  this.TempOrdeList;
}
  }
  
  rouerter2(path,user_type,sub_type){
    this.Loader=true;
 
    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
   
  }
  roueter(path,id,type){
    this.router.navigate([path]);
  }
}
