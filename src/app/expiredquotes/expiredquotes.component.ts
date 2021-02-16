import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-expiredquotes',
  templateUrl: './expiredquotes.component.html',
  styleUrls: ['./expiredquotes.component.css']
})
export class ExpiredquotesComponent implements OnInit {

  id: string;
  type: string;
  Loader: boolean;
  ProductList: any;
  ProdList: any=[];
  QuoutesList: any;
  quoteid: string;
  QuoteList: any;
  Buyer_id: any;
  Supplier_id: any;
  BuyerList: any=[];
  SupplierList: any=[];
  SupplierEmail: any;
  GrndTotal: any;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) { 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.type = params.get('prod_type');
      this.quoteid=params.get('quote_id');
    
    });
  }


  fabricForm: FormGroup;
  ngOnInit(): void {
    localStorage.setItem('total_amount','0')
    this.getid();
    this.getProduct();
  this.fabricForm = this.formBuilder.group({
    
    terms:['', Validators.required],
    model_type:['', Validators.required],
    brand_name: ['',Validators.required],
    catalog_number: ['', Validators.required],
    design_no:['', Validators.required],
    shade_no: ['', Validators.required],
    delivery_date: ['', Validators.required],
    message:['',Validators.required],
    pincode:['',Validators.required],
    prod_image:['',],
    customer_id:[localStorage.getItem('userid')],
    user_id:[],
    order_id:[],
    grand_total:[],
    total_amount:[],
    total_count:[],
    is_invidulaystiched:[],
    type:[],
  
    order_lines: this.formBuilder.array([
      // this.createOrderFormGroup()
  ])

   });
  }
  get fval() { return this.fabricForm.controls; }
  getControls(){
  
    return (<FormArray>this.fabricForm.get('order_lines')).controls;
   
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

  // Calculate(value,index){
  //   this.Amount=0;
  //  this.Total_Amount=localStorage.getItem('total_amount')
    
  //   const controlArray = <FormArray> this.fabricForm.get('order_lines');
    
  //   console.log("========")
  //   console.log(controlArray)
  //   console.log(controlArray.controls[index].value.rate_per_meter)
  //   console.log(controlArray.controls[index].value.count)
  //   this.Amount=controlArray.controls[index].value.count*controlArray.controls[index].value.rate_per_meter
  //   this.Total_Amount=parseInt(this.Total_Amount)+parseInt(this.Amount);
  // }
  getid(){

    this.http.post(environment.apiUrl + '/productSupplideerlst',{order_id:this.id,type:this.type}).subscribe(response => {
      if(response['response']=='success'){
        this.ProdList=response['product_dtls_list'];


       
     
        this.fabricForm.get('user_id').setValue(response['product_dtls_list'][0].user_id);
        
       
        this.fabricForm.get('brand_name').setValue(response['product_dtls_list'][0].brand_name)
        this.fabricForm.get('catalog_number').setValue(response['product_dtls_list'][0].catalog_number)
        this.fabricForm.get('design_no').setValue(response['product_dtls_list'][0].design_no)
        this.fabricForm.get('shade_no').setValue(response['product_dtls_list'][0].sahde_no)
        this.fabricForm.get('delivery_date').setValue(response['product_dtls_list'][0].delivery_date)
        this.fabricForm.get('message').setValue(response['product_dtls_list'][0].message)
        if(response['product_dtls_list'][0].category_type=='US'){
          this.fabricForm.get('model_type').setValue('School/Collage Uniforms')
        }
        else if(response['product_dtls_list'][0].category_type=='UH'){
          this.fabricForm.get('model_type').setValue('Hospital Uniforms')
        }
        else if(response['product_dtls_list'][0].category_type=='UC'){
          this.fabricForm.get('model_type').setValue('Catering Uniforms')

        }
        else if(response['product_dtls_list'][0].category_type=='UI'){
          this.fabricForm.get('model_type').setValue('Industrial  Uniforms')

        }
        else{
          this.fabricForm.get('model_type').setValue('Corporate Uniforms')
        }
        
        this.fabricForm.get('order_id').setValue(response['product_dtls_list'][0].order_id)
        this.fabricForm.get('total_count').setValue(response['product_dtls_list'][0].total_count)
        this.fabricForm.get('is_invidulaystiched').setValue(response['product_dtls_list'][0].is_invidulaystiched)
        
        
       
      }})
      
     
    
  }

  getProduct(){
    this.http.post(environment.apiUrl + '/quotelist_for_all',{quote_id:this.quoteid}).subscribe(response => {
      if(response['response']=='success'){
        this.QuoutesList=response['product_dtls_list'];
        
        this.QuoteList=response['quote_dtls_list'];
        this.Buyer_id=response['product_dtls_list'][0].user_id
        this.Supplier_id=response['product_dtls_list'][0].supplier_id
        this.GrndTotal=response['product_dtls_list'][0].grand_total
        

        
        
    this.getBuyerdetails(this.Buyer_id);
    this.getSupplierdetils(this.Supplier_id);

      }})}
  createOrderFormGroup():FormGroup{
    return  this.formBuilder.group({
     count:[],
     item:[],
     rate_per_meter:[]
       
     })
   }

   getBuyerdetails(buyer_id){
    this.http.post(environment.apiUrl + '/customerdetails_by_id',{user_id:buyer_id}).subscribe(response => {
      if(response['response']=='success'){
        this.BuyerList=response['product_dtls_list'];
   
   
      
      }
    })


   }
   getSupplierdetils(supplier_id){
  
    this.http.post(environment.apiUrl + '/supplierdetails_by_id',{user_id:supplier_id}).subscribe(response => {
      if(response['response']=='success'){
        this.SupplierList=response['product_dtls_list'];
        this.SupplierEmail=response['product_dtls_list'][0].email
       
     
      
      
      }
    })
   }
   UpdateOrder(){
   this.http.post(environment.apiUrl + '/update_quotes',{quote_id: this.QuoutesList[0].quatation_form_id,user_id:this.QuoutesList[0].user_id,order_status:'Conformed Quotation',expiry_date:this.QuoutesList[0].expiry_date,order_id:''}).subscribe(response => {
    if(response['response']=='success'){
     this.router.navigate(['/quotations'])
     
    }
  })
}
   generatebill(){
  
    this.http.post(environment.apiUrl + '/generatebill',{supplier_id:this.Supplier_id,buyer_id:this.Buyer_id,order_id:this.id,type:this.type,quote_id:this.quoteid,emailto:this.SupplierEmail,grand_total:this.GrndTotal}).subscribe(response => {
      if(response['response']=='success'){
       
     
      
      
      }
    })
   }
  
  }
