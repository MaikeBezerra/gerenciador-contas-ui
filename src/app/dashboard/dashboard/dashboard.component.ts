import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  lineChart: any;
  tamanho: String;
  options: any;
  
  pieChart: any;
  pieOptions: any;

  constructor(private dashboardService: DashboardService) {
      this.lineChart = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#4bc0c0'
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#565656'
            }
        ]
      }
      
      this.tamanho = "400px";

      this.options = {
          title: {
              display: true,
              text: 'Lançamentos por dia',
              fontSize: 16
          },
          legend: {
              position: 'bottom'
          }
      };

    this.pieOptions = {
        title: {
            display: true,
            text: 'Lançamentos por categoria',
            fontSize: 16
        },
    };
  }

  ngOnInit(): void {
    this.configurarGraficoDePizza();
  }

  configurarGraficoDePizza() {
      this.dashboardService.lancamentosPorCategoria()
        .then(dados => {
            this.pieChart = {
                labels: dados.map(dado => dado.categoria.nome),
                datasets: [
                    {
                        data: dados.map(dado => dado.total),
                        backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                                  '#DD4477', '#3366CC', '#DC3912']
                    }]    
                };
        });
  }

}
