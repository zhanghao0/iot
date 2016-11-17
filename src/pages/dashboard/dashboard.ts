import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {nvD3} from '../thirdparty/ng2-nvd3';

declare var d3;
declare var nv;
import {TabPage} from '../common/tab';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage extends TabPage implements OnInit{
  items;
  charts: Array<any>;

  options = {
    chart: {
      type: 'pieChart',
      height: 300,
      x: function(d){return d.key;},
      y: function(d){return d.values;},
      showLabels: true,
      duration: 300,
      labelThreshold: 1,
      labelSunbeamLayout: true,
      valueFormat: d3.format(".0f"),
      legend: {
        margin: {
          top: 5,
          right: 35,
          bottom: 5,
          left: 0
        }
      }
    }
  };

  constructor(protected httpService: HttpService, protected nav: NavController, protected params: NavParams) {
    super(httpService, nav, params);
    this.charts = [];
  }

  ngOnInit(){
    
    this.httpService.getList(this.params.data.name).subscribe(
      response => {
        this.items = response;

        if (this.items) {
          this.charts.push({visible: true, icon: "ios-pie", color: "primary", title: "Status Chart", options: this.options, data: this.generateData(this.items, "status")});
          this.charts.push({visible: false, icon: "ios-pie-outline", color: "null", title: "Type Chart", options: this.options, data: this.generateData(this.items, "type")});
          this.charts.push({visible: false, icon: "ios-pie-outline", color: "null", title: "Location Chart", options: this.options, data: this.generateData(this.items, "location")});
      
          //console.log(data, this.items);
        }
      },
      err => console.log(err),
      () => console.log("dashboard - get inventory completed")
    );

  }

  generateData(items, attribute) {
    return d3.nest()
    .key(function(d) { return d[attribute]; })
    .rollup(function(values) { return values.length; })
    .entries(this.items);
  }

  toggleChart(chart) {
    chart.visible = !chart.visible;

    if (chart.visible) {
      chart.icon = "ios-pie";
      chart.color = "primary";
    } else {
      chart.icon = "ios-pie-outline";
      chart.color = "primary";
    }
  }
}