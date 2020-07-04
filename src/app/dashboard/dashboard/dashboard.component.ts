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
    this.configurarGraficoLinha();
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

  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia()
      .then(dados => {
        const diasDoMes = this.configurarDiasMes();
        const totaisReceitas = this.totaisPorCadaDiaMes(
          dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
        const totaisDespesas = this.totaisPorCadaDiaMes(
          dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);

        this.lineChart = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceitas,
              borderColor: '#3366CC'
            }, {
              label: 'Despesas',
              data: totaisDespesas,
              borderColor: '#D62B00'
            }
          ]
        }
      });
  }

  private totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;

          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }


  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }

}
