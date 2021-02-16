import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';
import { SupplierformComponent } from './supplierform/supplierform.component';
import { CustomerhomeComponent } from './customerhome/customerhome.component';
import { FabricformComponent } from './fabricform/fabricform.component';
import { MachineformComponent } from './machineform/machineform.component';
import { LabourformComponent } from './labourform/labourform.component';
import { CustuniformaccsComponent } from './custuniformaccs/custuniformaccs.component';
import { CustcustomstitchComponent } from './custcustomstitch/custcustomstitch.component';
import { CustcustomfabricstitchComponent } from './custcustomfabricstitch/custcustomfabricstitch.component';
import { ReadymadeorderbasedComponent } from './readymadeorderbased/readymadeorderbased.component';
import { SupplierreadymadeComponent } from './supplierreadymade/supplierreadymade.component';
import { SupplieruniformaccsComponent } from './supplieruniformaccs/supplieruniformaccs.component';
import { SupplieruniformaccsaccsreadymadeComponent } from './supplieruniformaccsaccsreadymade/supplieruniformaccsaccsreadymade.component';
import { SupplierreadyaccsandreadyComponent } from './supplierreadyaccsandready/supplierreadyaccsandready.component';
import { SupplieruniformcustunifrmfabricComponent } from './supplieruniformcustunifrmfabric/supplieruniformcustunifrmfabric.component';
import { SupplieruniformcustunifrmstitchComponent } from './supplieruniformcustunifrmstitch/supplieruniformcustunifrmstitch.component';
import { SupplieruniformcustunifrmfabricandstitchComponent } from './supplieruniformcustunifrmfabricandstitch/supplieruniformcustunifrmfabricandstitch.component';
import { PaymentComponent } from './payment/payment.component';
import { CommonModule } from "@angular/common";




// import{AngularFontAwesomeModule} from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SupplierbasicformComponent } from './supplierbasicform/supplierbasicform.component';
import { DropdownComponent } from './dropdown/dropdown.component'
import { SupplierhomeComponent } from './supplierhome/supplierhome.component';
import { MachineaddComponent } from './machineadd/machineadd.component';
import { MachineandreadtlistComponent } from './machineandreadtlist/machineandreadtlist.component';
import { LoginComponent } from './login/login.component';
import { LabrouslistComponent } from './labrouslist/labrouslist.component';
import { HomelistproductComponent } from './homelistproduct/homelistproduct.component';
import { HomeprosigleComponent } from './homeprosigle/homeprosigle.component';
import { MachinesingleComponent } from './machinesingle/machinesingle.component';
import { MachinelistComponent } from './machinelist/machinelist.component';

import { OrderformeditComponent } from './orderformedit/orderformedit.component';
import { FabriclistComponent } from './fabriclist/fabriclist.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProgressComponent } from './progress/progress.component';
import { AdminComponent } from './admin/admin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ViewmoreusersComponent } from './viewmoreusers/viewmoreusers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TermsComponent } from './terms/terms.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ContactComponent } from './contact/contact.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProfileComponent } from './profile/profile.component';
import { RecentquotesComponent } from './recentquotes/recentquotes.component';
import { RecebtordersComponent } from './recebtorders/recebtorders.component';
import { ExpiredquotesComponent } from './expiredquotes/expiredquotes.component';
import { QoutationsComponent } from './qoutations/qoutations.component';
import { QuotetemplateComponent } from './quotetemplate/quotetemplate.component';
import { SupplierlistComponent } from './supplierlist/supplierlist.component';
import { BuyerslistComponent } from './buyerslist/buyerslist.component';
import { SupplierdetailsComponent } from './supplierdetails/supplierdetails.component';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { NgxPrintModule } from 'ngx-print';
import { ToastrModule } from 'ngx-toastr';
import { QuotatioComponent } from './quotatio/quotatio.component';
// import { SupplierdropdownComponent } from './supplierdropdown/supplierdropdown.component';
import { CustomerdropdownComponent } from './customerdropdown/customerdropdown.component';
import { BannerComponent } from './banner/banner.component';
import { BanneraddComponent } from './banneradd/banneradd.component';
import { DatePipe } from '@angular/common';
import { AdminquotationComponent } from './adminquotation/adminquotation.component';
import { AdminsupplierorderComponent } from './adminsupplierorder/adminsupplierorder.component';
import { AdminlabourlistComponent } from './adminlabourlist/adminlabourlist.component';
import { AdminmachinelistComponent } from './adminmachinelist/adminmachinelist.component';
import { OtpComponent } from './otp/otp.component';
import { AdminproductComponent } from './adminproduct/adminproduct.component';
import { AdminaccsComponent } from './adminaccs/adminaccs.component';
import { LabourstatusComponent } from './labourstatus/labourstatus.component';
import {QuotComponent} from './quot/quot.component';
import { SignuplinkComponent } from './signuplink/signuplink.component';
import {AuthgurdServiceService} from './authgurd-service.service';
// import { FooterComponent } from './footer/footer.component'









// import{AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Form1Component,
    Form2Component,
    SupplierformComponent,
    CustomerhomeComponent,
    FabricformComponent,
    MachineformComponent,
    LabourformComponent,
    CustuniformaccsComponent,
    CustcustomstitchComponent,
    CustcustomfabricstitchComponent,
    ReadymadeorderbasedComponent,
    SupplierreadymadeComponent,
    SupplieruniformaccsComponent,
    SupplieruniformaccsaccsreadymadeComponent,
    SupplierreadyaccsandreadyComponent,
    SupplieruniformcustunifrmfabricComponent,
    SupplieruniformcustunifrmstitchComponent,
    SupplieruniformcustunifrmfabricandstitchComponent,
    PaymentComponent,
    SupplierbasicformComponent,
    DropdownComponent,
    SupplierhomeComponent,
    MachineaddComponent,
    MachineandreadtlistComponent,
    LoginComponent,
    LabrouslistComponent,
    HomelistproductComponent,
    HomeprosigleComponent,
    MachinesingleComponent,
    MachinelistComponent,
    OrderformeditComponent,
    FabriclistComponent,
    ProgressComponent,
    AdminComponent,
    AdminhomeComponent,
    ViewmoreusersComponent,
    TermsComponent,
    ContactComponent,
    PrivacyComponent,
    ProfileComponent,
    RecentquotesComponent,
    RecebtordersComponent,
    ExpiredquotesComponent,
    QoutationsComponent,
    QuotetemplateComponent,
    SupplierlistComponent,
    BuyerslistComponent,
    SupplierdetailsComponent,
    CustomerdetailsComponent,
    OrderdetailsComponent,
    QuotatioComponent,
    // SupplierdropdownComponent,
    CustomerdropdownComponent,
    BannerComponent,
    BanneraddComponent,
    AdminquotationComponent,
    AdminsupplierorderComponent,
    AdminlabourlistComponent,
    AdminmachinelistComponent,
    OtpComponent,
    AdminproductComponent,
    AdminaccsComponent,
    LabourstatusComponent,
    QuotComponent,
    SignuplinkComponent,
    // FooterComponent




  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    NgxPrintModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ToastrModule,
    
   




  ],

  providers: [
    DatePipe,
    AuthgurdServiceService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }