import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quot',
  templateUrl: './quot.component.html',
  styleUrls: ['./quot.component.css']
})
export class QuotComponent implements OnInit {
  Loader: boolean;
  id: string;
  type: string;
  submitted=false;
  ProductList: any=[];
  Total_Amount :any=0;
  searchword:number;
  Amount: any;
  ratePermeter:any=0;
  Count:any=0;
  sub_Amount: string;
  orderid: string;
  OrderStatus: any;
  DeliveryDate: any;
  UserId: any;
  QuotationForm: any;
  
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.type = params.get('type');
      this.orderid = params.get('orderid');
    
    });

  }
  fabricForm: FormGroup;

  ngOnInit(): void {
    localStorage.setItem('total_amount','0')
    this.getid();
    this.getProduct();
  this.fabricForm = this.formBuilder.group({
    
    terms:['', Validators.required],
    model_type:['',],
    brand_name: [''],
    catalog_number: [''],
    design_no:[''],
    shade_no: [''],
    delivery_date: [''],
    message:[''],
    pincode:[''],
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

  Calculate(value,index){
    this.Total_Amount=0;
    //this.sub_Amount=0;
    //this.Total_Amount=localStorage.getItem('total_amount');
     
   
    
    const controlArray = <FormArray> this.fabricForm.get('order_lines');
    this.Amount=controlArray.controls[index].value.count*controlArray.controls[index].value.rate_per_meter;
    controlArray.controls[index].get('total_amount').setValue(this.Amount.toFixed(2));
    console.log(controlArray.controls[index].get('total_amount').setValue(this.Amount.toFixed(2)))
    // localStorage.setItem('sub_amount',this.sub_Amount);
    // this.sub_Amount=localStorage.getItem('sub_amount');
    // this.Total_Amount=parseInt(this.Total_Amount)+this.sub_Amount;
    // console.log(this.Total_Amount)
    // localStorage.setItem('total_amount', this.Total_Amount)
    // this.fabricForm.get('grand_total').setValue(this.Total_Amount.toFixed(2))
    
    this.getTotal();
  }


  getTotal(){
  
    for(let item=0;item<this.ProductList.length;item++){
      const controlArray = <FormArray> this.fabricForm.get('order_lines');
      this.Total_Amount=(parseFloat(this.Total_Amount)+parseFloat(controlArray.controls[item].get('total_amount').value)).toFixed(2)
    }
  }
  getid(){

    this.http.post(environment.apiUrl + '/productSupplideerlst',{order_id:this.orderid,type:this.type}).subscribe(response => {
      if(response['response']=='success'){

       

      
       
     
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
        else if(response['product_dtls_list'][0].category_type=='Others'){
          this.fabricForm.get('model_type').setValue('Others')

        }
        else{
          this.fabricForm.get('model_type').setValue('Corporate Uniforms')
        }
        
        this.fabricForm.get('order_id').setValue(response['product_dtls_list'][0].order_id)
        this.fabricForm.get('total_count').setValue(response['product_dtls_list'][0].total_count)
        this.fabricForm.get('is_invidulaystiched').setValue(response['product_dtls_list'][0].is_invidulaystiched)
        
        
       
      }})
      
     
    
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

  getProduct(){
    this.http.post(environment.apiUrl + '/getQuotationlist',{qutation_form_id:this.id,user_id:localStorage.getItem('userid')}).subscribe(response => {
      if(response['response']=='success'){
        this.ProductList=response['product_dtls_list'];
        
    this.fabricForm.get('grand_total').setValue(parseFloat(this.ProductList[0].grand_total).toFixed(2));
    this.fabricForm.get('delivery_date').setValue(response['product_dtls_list'][0].expiry_date);
    this.OrderStatus = response['product_dtls_list'][0].is_order_accepted;
    this.DeliveryDate = response['product_dtls_list'][0].expiry_date;
    this.UserId = response['product_dtls_list'][0].user_id;
    this.QuotationForm =response['product_dtls_list'][0].quatation_form_id;
        
        for(let item=0;item<this.ProductList.length;item++){
          const order_lines =this.fabricForm.get('order_lines') as FormArray
               order_lines.push(this.createOrderFormGroup(this.ProductList[item]))
        //        const controlArray = <FormArray> this.fabricForm.get('order_lines');
        //  controlArray.controls[item].get('rate_per_meter').setValue(this.ProductList[item].rate_per_item);
        //  controlArray.controls[item].get('total_amount').setValue(this.ProductList[item].total__amt);
        //  controlArray.controls[item].get('item').setValue(this.ProductList[item].item_name);
        //  controlArray.controls[item].get('count').setValue(this.ProductList[item].count);
         
       




         
        }
        
        
        // for(let item=0;item<this.ProductList.length;item++){    
        //   controlArray.controls[item].get('item').setValue(this.ProductList[item].name);
        //   controlArray.controls[item].get('count').setValue(this.ProductList[item].size);
     

          
         
        // }

      }})}
  createOrderFormGroup(item):FormGroup{
    return  this.formBuilder.group({
     count:[item.count],
     item:[item.item_name],
     rate_per_meter:[parseFloat(item.rate_per_item).toFixed(2)],
     brand_name:[],
     catalog_number:[],
     design_no:[],
     shade_no:[],
     total_amount:[parseFloat(item.total__amt).toFixed(2)],
     avail_size:[]
       
     })
   }
   FabricFormsave(){
     

       
     }
    }