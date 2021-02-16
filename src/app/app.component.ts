import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'uniform';
  gtag;
 constructor( private router:Router){

  // const navEndEvent$ = router.events.pipe(
  //   filter(e => e instanceof NavigationEnd)
  // );
  // navEndEvent$.subscribe((e: NavigationEnd) => {
  //   this.gtag('config', 'GTM-KBWNZPG', {'page_path':e.urlAfterRedirects});
  // });
 


 
  
}

ngOnInit() {
 
}
}
