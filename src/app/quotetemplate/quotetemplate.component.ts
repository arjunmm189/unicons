import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quotetemplate',
  templateUrl: './quotetemplate.component.html',
  styleUrls: ['./quotetemplate.component.css']
})
export class QuotetemplateComponent implements OnInit {
  id: string;
  type: string;
  Loader: boolean;
  ProductList: any;
  ProdList: any=[];
  QuoutesList: any=[];
  quoteid: string;
  QuoteList: any;
  ProdDetailsList: any;


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
    supplier_id:[],
    quatation_form_id:[],
    product_type:[],
  
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


  getid(){

    this.http.post(environment.apiUrl + '/productSupplideerlst',{order_id:this.id,type:this.type}).subscribe(response => {
      if(response['response']=='success'){
        this.ProdList=response['product_dtls_list'];
        this.ProdDetailsList=response['product__list'];
        this.fabricForm.get('user_id').setValue(response['product_dtls_list'][0].user_id);
        
      
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
        
        this.fabricForm.get('order_id').setValue(response['product_dtls_list'][0].order_id);
        this.fabricForm.get('total_count').setValue(response['product_dtls_list'][0].total_count);
        this.fabricForm.get('is_invidulaystiched').setValue(response['product_dtls_list'][0].is_invidulaystiched);
        const order_lines =this.fabricForm.get('order_lines') as FormArray

        for(let item=0;item<this.ProdDetailsList.length;item++){
          order_lines.push(this.createOrderFormGroup(this.ProdDetailsList[item]))
        const controlArray = <FormArray> this.fabricForm.get('order_lines');


       
        //  controlArray.controls[item].get('brand_name').setValue(this.ProductList[item].brand_name);
        //  controlArray.controls[item].get('catalog_number').setValue(this.ProductList[item].catalogue_number);
        //  controlArray.controls[item].get('design_no').setValue(this.ProductList[item].design_number);
        //  controlArray.controls[item].get('shade_no').setValue(this.ProductList[item].shade_number);
        //  console.log(controlArray.controls[item].get('brand_name'))


         
        }


        
        
       
      }})
      
     
    
  }

  getProduct(){
    this.http.post(environment.apiUrl + '/get_qouteditem',{quote_id:this.quoteid,user_id:localStorage.getItem('userid')}).subscribe(response => {
      if(response['response']=='success'){
        this.QuoutesList=response['product_dtls_list'];
        this.QuoteList=response['quote_dtls_list'];
      
        this.fabricForm.get('quatation_form_id').setValue(response['product_dtls_list'][0].quatation_form_id);
        this.fabricForm.get('supplier_id').setValue(response['product_dtls_list'][0].supplier_id);
        this.fabricForm.get('delivery_date').setValue(response['product_dtls_list'][0].expiry_date)
      
        
        
        

      }})}
  createOrderFormGroup(item):FormGroup{
    return  this.formBuilder.group({

     rate_per_meter:[],
     brand_name:[item.brand_name],
     catalog_number:[item.catalogue_number],
     design_no:[item.design_number],
     shade_no:[item.shade_number],
     item_name:[item.name],
     count:[item.size],

     avail_size:[item.avail_size]
       
     })
   }
   UpdateOrder(type){
    this.http.post(environment.apiUrl + '/update_quotes',{quote_id:this.quoteid,user_id:localStorage.getItem('userid'),order_status:type,expiry_date:this.fabricForm.get('delivery_date').value,order_id:''}).subscribe(response => {
      if(response['response']=='success'){
        this.router.navigate(['/recentquotes'])
      }
    })

   }

  }


