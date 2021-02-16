import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orderformedit',
  templateUrl: './orderformedit.component.html',
  styleUrls: ['./orderformedit.component.css']
})
export class OrderformeditComponent implements OnInit {
  Loader: boolean;
  id: string;
  type: string;
  submitted=false;
  ProductList: any=[];
  Total_Amount :any;
  searchword:number;
  Amount: any;
  ratePermeter:any=0;
  Count:any=0;
  sub_Amount: string;
  Image: any;
  Total_Amount1: number;
  
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private http:HttpClient,private router:Router) {
 
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.type = params.get('type');
    
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

    this.http.post(environment.apiUrl + '/productSupplideerlst',{order_id:this.id,type:this.type}).subscribe(response => {
      if(response['response']=='success'){

        


       
     
        this.fabricForm.get('user_id').setValue(response['product_dtls_list'][0].user_id);
        
       
     
        this.fabricForm.get('delivery_date').setValue(response['product_dtls_list'][0].delivery_date)
        this.fabricForm.get('message').setValue(response['product_dtls_list'][0].message)
        this.Image='http://api.uniconform.in'+''+response['product_dtls_list'][0].photo
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

  getProduct(){
    this.http.post(environment.apiUrl + '/customer_requirements',{order_id:this.id}).subscribe(response => {
      if(response['response']=='success'){

        this.ProductList=response['product_dtls_list'];
        console.log(this.ProductList)
        
        for(let item=0;item<this.ProductList.length;item++){
          const order_lines =this.fabricForm.get('order_lines') as FormArray
               order_lines.push(this.createOrderFormGroup(this.ProductList[item]))
        //        const controlArray = <FormArray> this.fabricForm.get('order_lines');
        //        controlArray.controls[item].get('item').setValue(this.ProductList[item].name);
        //  controlArray.controls[item].get('count').setValue(this.ProductList[item].size);
        //  controlArray.controls[item].get('brand_name').setValue(this.ProductList[item].brand_name);
        //  controlArray.controls[item].get('catalog_number').setValue(this.ProductList[item].catalogue_number);
        //  controlArray.controls[item].get('design_no').setValue(this.ProductList[item].design_number);
        //  controlArray.controls[item].get('shade_no').setValue(this.ProductList[item].shade_number);



         
        }
        
        
        // for(let item=0;item<this.ProductList.length;item++){    
        //   controlArray.controls[item].get('item').setValue(this.ProductList[item].name);
        //   controlArray.controls[item].get('count').setValue(this.ProductList[item].size);
     

          
         
        // }

      }})}
  createOrderFormGroup(item):FormGroup{
    return  this.formBuilder.group({
     count:[item.size],
     item:[item.name],
     rate_per_meter:[],
     brand_name:[item.brand_name],
     catalog_number:[item.catalogue_number],
     design_no:[item.design_number],
     shade_no:[item.shade_number],
     total_amount:[],
     avail_size:[item.avail_size]
       
     })
   }
   FabricFormsave(){
     
    this.submitted = true;
    const uploadData = new FormData();
    if(this.type=='Fabrics'){

    
    uploadData.append('product_type','Customized Uniforms');
    uploadData.append('prod_sub_type','Fabrics');
    uploadData.append('type','FA');
    
    }
    else if(this.type=='Stitching'){

    
      uploadData.append('product_type','Customized Uniforms');
      uploadData.append('prod_sub_type','Stitching');
      uploadData.append('type','ST');
      
      }
      else if(this.type=='Fabric and Stitching'){

    
        uploadData.append('product_type','Customized Uniforms');
        uploadData.append('prod_sub_type','Fabric and Stitching');
        uploadData.append('type','FS');
        
        }
        else if(this.type=='none'){
          uploadData.append('product_type','Uniform Accesoriess');
        uploadData.append('prod_sub_type','none');
        uploadData.append('type','UA');

        }
        else if(this.type=='Order Based Form'){
          uploadData.append('product_type','Readymade Uniforms');
        uploadData.append('prod_sub_type','Order Based Form');
        uploadData.append('type','RM');

        }

    uploadData.append('model_type',this.fabricForm.controls['model_type'].value);
    // uploadData.append('brand_name',this.fabricForm.controls['brand_name'].value);
    // uploadData.append('catalog_number',this.fabricForm.controls['catalog_number'].value);
    // uploadData.append('design_no',this.fabricForm.controls['design_no'].value);
    // uploadData.append('shade_no',this.fabricForm.controls['shade_no'].value);
    // uploadData.append('delivery_date',this.fabricForm.controls['delivery_date'].value);
    // uploadData.append('message',this.fabricForm.controls['message'].value);
    // uploadData.append('pincode',this.fabricForm.controls['pincode'].value);
    // uploadData.append('prod_image',this.fabricForm.controls['prod_image'].value);
    uploadData.append('user_id',this.fabricForm.controls['user_id'].value);
    uploadData.append('customer_id',this.fabricForm.controls['customer_id'].value);
    uploadData.append('order_id',this.fabricForm.controls['order_id'].value);
    uploadData.append('order_lines',JSON.stringify(this.fabricForm.controls['order_lines'].value));
    uploadData.append('total_amount',this.fabricForm.controls['total_amount'].value);
    uploadData.append('grand_total',this.fabricForm.controls['grand_total'].value);
    uploadData.append('delivery_date',this.fabricForm.controls['delivery_date'].value);
    

   

        
       
       this.http.post(environment.apiUrl + '/quotaton_form',uploadData).subscribe(response => {
         if(response['response']=='success'){
           this.router.navigate(['/fabriclist'])
         }
         
        
       })
       
     }
   

}
