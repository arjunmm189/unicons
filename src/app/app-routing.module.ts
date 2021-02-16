import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {HomeComponent} from './home/home.component'
import {Form1Component} from './form1/form1.component'
import {Form2Component} from './form2/form2.component'
import {SupplierformComponent} from './supplierform/supplierform.component'
import {CustomerhomeComponent} from './customerhome/customerhome.component'
import {FabricformComponent} from './fabricform/fabricform.component'
import {MachineformComponent} from './machineform/machineform.component'
import {LabourformComponent} from './labourform/labourform.component'
import {CustuniformaccsComponent} from './custuniformaccs/custuniformaccs.component'
import {CustcustomstitchComponent} from './custcustomstitch/custcustomstitch.component'
import {CustcustomfabricstitchComponent} from './custcustomfabricstitch/custcustomfabricstitch.component'
import {ReadymadeorderbasedComponent} from './readymadeorderbased/readymadeorderbased.component'
import {SupplierreadymadeComponent} from './supplierreadymade/supplierreadymade.component'
import {SupplieruniformaccsComponent} from './supplieruniformaccs/supplieruniformaccs.component'
import {SupplieruniformaccsaccsreadymadeComponent} from './supplieruniformaccsaccsreadymade/supplieruniformaccsaccsreadymade.component'
import{SupplierreadyaccsandreadyComponent} from './supplierreadyaccsandready/supplierreadyaccsandready.component'
import {SupplieruniformcustunifrmfabricComponent} from './supplieruniformcustunifrmfabric/supplieruniformcustunifrmfabric.component'
import {SupplieruniformcustunifrmstitchComponent} from './supplieruniformcustunifrmstitch/supplieruniformcustunifrmstitch.component'
import {SupplieruniformcustunifrmfabricandstitchComponent} from './supplieruniformcustunifrmfabricandstitch/supplieruniformcustunifrmfabricandstitch.component'
import {PaymentComponent} from './payment/payment.component';
import {SupplierbasicformComponent} from './supplierbasicform/supplierbasicform.component';
import { SupplierhomeComponent } from './supplierhome/supplierhome.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {MachineaddComponent} from './machineadd/machineadd.component';
import { MachineandreadtlistComponent } from './machineandreadtlist/machineandreadtlist.component';
import {LoginComponent}  from './login/login.component';
import {LabrouslistComponent} from './labrouslist/labrouslist.component';
import{ HomelistproductComponent } from './homelistproduct/homelistproduct.component';
import{HomeprosigleComponent} from './homeprosigle/homeprosigle.component';
import{ MachinesingleComponent } from './machinesingle/machinesingle.component';
import {MachinelistComponent} from './machinelist/machinelist.component'
import { FabriclistComponent } from './fabriclist/fabriclist.component';
import { OrderformeditComponent } from './orderformedit/orderformedit.component';
import {ProgressComponent} from './progress/progress.component';
import {AdminComponent}  from './admin/admin.component';
import {AdminhomeComponent} from './adminhome/adminhome.component';
import {ViewmoreusersComponent} from './viewmoreusers/viewmoreusers.component';
import {TermsComponent} from './terms/terms.component';
import {ContactComponent} from "./contact/contact.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {ProfileComponent} from "./profile/profile.component";
import { RecentquotesComponent } from './recentquotes/recentquotes.component';
import { RecebtordersComponent } from './recebtorders/recebtorders.component';
import { ExpiredquotesComponent } from './expiredquotes/expiredquotes.component';
import { QoutationsComponent } from './qoutations/qoutations.component';
import { QuotetemplateComponent } from './quotetemplate/quotetemplate.component';
import {SupplierlistComponent} from './supplierlist/supplierlist.component';
import {BuyerslistComponent} from './buyerslist/buyerslist.component';
import {CustomerdetailsComponent} from './customerdetails/customerdetails.component';
import {SupplierdetailsComponent}  from './supplierdetails/supplierdetails.component';
import {OrderdetailsComponent} from './orderdetails/orderdetails.component';
import{QuotatioComponent} from './quotatio/quotatio.component';
import{CustomerdropdownComponent} from './customerdropdown/customerdropdown.component'; 
import {BannerComponent} from './banner/banner.component';
import {BanneraddComponent} from './banneradd/banneradd.component';
import {AdminquotationComponent} from './adminquotation/adminquotation.component';
import {AdminsupplierorderComponent} from './adminsupplierorder/adminsupplierorder.component';
import {AdminlabourlistComponent} from './adminlabourlist/adminlabourlist.component';
import {AdminmachinelistComponent} from './adminmachinelist/adminmachinelist.component';
import {OtpComponent} from './otp/otp.component';
import {QuotComponent} from './quot/quot.component';
import {AdminaccsComponent} from './adminaccs/adminaccs.component';
import{AdminproductComponent} from './adminproduct/adminproduct.component';
import{LabourstatusComponent} from './labourstatus/labourstatus.component';
import {SignuplinkComponent} from './signuplink/signuplink.component';
import {AuthenticationGuard} from './authentication.guard';  




const routes: Routes = [
  {
    path:"",
    redirectTo:'home',
    pathMatch: 'full'
},
{
  path:'signuplink',component:SignuplinkComponent
},
{
  path:'labourstatus',component:LabourstatusComponent
},

{
  path:'adminproduct',component:AdminproductComponent
},
{
  path:'adminaccs',component:AdminaccsComponent
},

{
  path:'otp',component:OtpComponent
},
{
  path:'otp/:id',component:OtpComponent
},
{
  path:'adminmachinelist',component:AdminmachinelistComponent
},
{
  path:'adminlabourlist',component:AdminlabourlistComponent
},
{
  path:'adminsupplierorder',component:AdminsupplierorderComponent
},
{
  path:'adminsupplierorder/:id/:type',component:AdminsupplierorderComponent
},
{
  path:'adminquo',component:AdminquotationComponent
},
{
  path:'adminquo/:id/:type',component:AdminquotationComponent
},
{
path:'banneradd',component:BanneraddComponent
},
{
  path:'banneradd/:id',component:BanneraddComponent
  },
{
  path:'customerdropdown',component:CustomerdropdownComponent
},
{
path:'banner',component:BannerComponent
},
{
path:'quotatio',component:QuotatioComponent
},
{
  path:'machinesingle',component:MachinesingleComponent
},
{
  path:'machinesingle/:type',component:MachinesingleComponent
},
{
path:'homeprosingle' ,component:HomeprosigleComponent
},
{
  path:'homeprosingle/:type' ,component:HomeprosigleComponent
  },
{
   path:'homelistproduct',component:HomelistproductComponent
},
{
  path:'homelistproduct/:type',component:HomelistproductComponent
},
{
 path:'machineandreadylist', component:MachineandreadtlistComponent
},

{
   path:'login' ,component:LoginComponent
},


{
  path:'supplierhome', component:SupplierhomeComponent
},
{
  path:'payment',component:PaymentComponent
},
{
    path:'supplieruniformcustunifrmfabric' ,component:SupplieruniformcustunifrmfabricComponent
},
{
  path:'supplieruniformcustunifrmfabric/:id' ,component:SupplieruniformcustunifrmfabricComponent
},
{
  path:'supplieruniformcustunifrmstitch' ,component:SupplieruniformcustunifrmstitchComponent
},
{
  path:'supplieruniformcustunifrmstitch/:id' ,component:SupplieruniformcustunifrmstitchComponent
},
{
  path:'supplieruniformcustunifrmfabricandstitch' ,component:SupplieruniformcustunifrmfabricandstitchComponent
},
{
  path:'supplieruniformcustunifrmfabricandstitch/:id' ,component:SupplieruniformcustunifrmfabricandstitchComponent
},
{
  path:'supplierreadyaccsandready',component:SupplierreadyaccsandreadyComponent
},
{
  path:'supplierreadyaccsandready/:id',component:SupplierreadyaccsandreadyComponent
},
{
  path:'supplierreadyaccsandready/:id/:type',component:SupplierreadyaccsandreadyComponent
},
{
  path:'supplieruniformaccsaccsredymade',component:SupplieruniformaccsaccsreadymadeComponent
},
{ 
  path:'supplieriniformaccs',component:SupplieruniformaccsComponent
}
,
{ 
  path:'supplieriniformaccs/:id',component:SupplieruniformaccsComponent
},
{
  path:'supplierreadymade' ,component:SupplierreadymadeComponent
},
{
  path:'supplierreadymade/:id' ,component:SupplierreadymadeComponent
},

{
   path:'readymadeorder',component:ReadymadeorderbasedComponent
},
{
  path:'custcustomfabricstitch' ,component:CustcustomfabricstitchComponent
},
{
  path:'custcustomsstitch' ,component:CustcustomstitchComponent
},
{
    path:'custunfrmaccs' ,component:CustuniformaccsComponent
},
{
    path:'machine',component:MachineformComponent
},
{
    path:'labourform',component:LabourformComponent
},
{
  path:'home',component:HomeComponent
},
{
  path:'form',component:Form1Component
},
{
  path:'form2',component:Form2Component
},
{
  path:'form2/:id/:prod_type/:quote_id',component:Form2Component
},
{
  path:'supplier',component:SupplierformComponent
},
{
  path:'customerhome',component:CustomerhomeComponent,canActivate:[AuthenticationGuard]
},
{
  path:'fabricform',component:FabricformComponent
},
{
  path:'basicform',component:SupplierbasicformComponent
},
{
  path:'basicform/:id',component:SupplierbasicformComponent
},
{
  path:'dropdown',component:DropdownComponent
},
{
  path:'machineadd' ,component:MachineaddComponent
},
{
  path:'machineadd/:id' ,component:MachineaddComponent
},
{
  path:'machineadd/:id/:type' ,component:MachineaddComponent
},
{
  path:'machineandreadylist', component:MachineandreadtlistComponent
 },
 {
  path:'machineandreadylist/:id', component:MachineandreadtlistComponent
 },
 {
  path:'machineandreadylist/:id/:type', component:MachineandreadtlistComponent
 },
 {
  path:'login', component:LoginComponent
 },
 {
  path:'labour', component:LabrouslistComponent
 },
 {
  path:'machinelist', component:MachinelistComponent
 },
 {
  path:'machinelist/:type', component:MachinelistComponent
 },
 {
  path:'fabriclist', component:FabriclistComponent
 },
 {
 path:'orderformedit' ,component:OrderformeditComponent
 },
 {
  path:'orderformedit/:id/:type',component:OrderformeditComponent
  },
  {
    path:'quote/:id/:type/:orderid',component:QuotComponent
    },


  
  {
    path:'progress',component:ProgressComponent
    },
    {
      path:'admin',component:AdminComponent
      },
    {
 path:'adminhome',component:AdminhomeComponent
},
       {
        path:'viewuser',component:ViewmoreusersComponent
       },
       {
        path:'viewuser/:id',component:ViewmoreusersComponent
       },
       {
        path:'terms',component:TermsComponent
       },
       {
        path:'contact',component:ContactComponent
       },
       {
        path:'privacy',component:PrivacyComponent
       },
       {
        path:'profile',component:ProfileComponent
       },
       {
        path:'recentquotes',component:RecentquotesComponent
       },
       {
        path:'approvedqutations',component:RecebtordersComponent
       },
       {
        path:'expiredquotes',component:ProfileComponent
       },
       {
        path:'quoteform/:id/:prod_type/:quote_id',component:QuotetemplateComponent
       },
       {
        path:'supplier_list',component:SupplierlistComponent
       },
       {
        path:'buyers_list',component:BuyerslistComponent
       },{
        path:'customer_details/:id',component:CustomerdetailsComponent
       },
       {
        path:'supplier_details',component:SupplierdetailsComponent
       },
       {
        path:'order_details',component:OrderdetailsComponent
       },
       {
        path:'quotations',component:QoutationsComponent
       },
       {
        path:'finalquoteform/:id/:prod_type/:quote_id',component:ExpiredquotesComponent
       },


       

       
       


       
       

       
   
 
 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
