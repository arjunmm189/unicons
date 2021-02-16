import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  bannerList: any=[];

  constructor(private router:Router,private http:HttpClient) { }
  Loader: boolean;
  ngOnInit(): void {
    this.getBannerList()
  }
  
  rourter(path,user_type,sub_type){
    this.Loader=true;
    localStorage.setItem('user_type',user_type);
    localStorage.setItem('sub_type',sub_type);
    setTimeout(()=>{                         
      this.router.navigate([path]);
      this.Loader=false;
 }, 3000);
}


rourterwithid(path,id){
  this.Loader=true;

  setTimeout(()=>{                         
    this.router.navigate([path,id]);
    this.Loader=false;
}, 3000);

}
getBannerList(){
  
  this.http.post(environment.apiUrl + '/addbannerList',{id:''}).subscribe(response => {
    if(response['response']=='success'){
      this.bannerList=response['product_dtls_list']
    }
  
     
     
  })

}
Delete(id,index){ 
  this.http.post(environment.apiUrl + '/deletebanner',{id:id}).subscribe(response => {
    if(response['response']=='success'){
      this.bannerList.splice(index,1)
    }
  
     
     
  })

}

}
