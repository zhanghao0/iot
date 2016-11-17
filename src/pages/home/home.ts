import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProjectHomePage} from './project-home';
import {HttpService} from '../../services/http.service';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  projects = [];
  constructor(protected httpService: HttpService, private nav: NavController) {
    this.httpService.getProjects().subscribe(
      response => {
        this.projects = response;
        //console.log(data, this.items);
      },
      err => console.log(err),
      () => console.log("home - get projects completed")
    );
  }

  openProjectHomePage(project) {
    this.nav.push(ProjectHomePage, project);
  }
}