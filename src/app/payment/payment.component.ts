import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  Loader: boolean;
  User_id: string;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.User_id=localStorage.getItem('userid');
  }

  Paynow(){
   
      this.Loader=true;

      setTimeout(()=>{  
        Swal.fire({

          title: this.User_id + '        is your User Id for Uniconform',
    
          text: 'Please Remember your User Id and Password!',
    
          icon: 'success',
    
          showCancelButton: true,
    
          confirmButtonText: 'Ok',
    
          //cancelButtonText: 'Cancel'
    
        }).then((result) => {
    
        
    
        })
        this.router.navigate(['/login'])  
        
         
                               
      
        this.Loader=false;
   }, 3000);
     
    }
  
  }

