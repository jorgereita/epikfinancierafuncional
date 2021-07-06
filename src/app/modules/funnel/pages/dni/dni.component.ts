import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.scss']
})
export class DniComponent implements OnInit {

  public currentStream: any;
  public videoDimensions: any;

  param1: string;
  param2: string;
  constructor(private route: ActivatedRoute) {debugger
    let id = this.route.snapshot.paramMap.get("state");
  
    console.log(id); 
    // console.log(this.param1)
  }
  ngOnInit(): void {

}
 
}


 
