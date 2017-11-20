import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { RutaBaseService } from '../../services/ruta-base.service';

import { FormBuilder, FormArray, FormGroup, Validators  } from '@angular/forms';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls : ['dashboard.css']
})
export class DashboardComponent implements OnInit {

  private data:any;
  public loading = false;
  public mostrar = false;
  public fecha = this.getFecha();

  public alerta = false;
  public alerta_boton = false;
  public alerta_tipo: any; //success info warning danger  
  public alerta_msg: any;

  public maxEjeY: any;
  public totalPedidosMes: any;
  public totalClientesMes: any;
  public contClientesHoy: any;
  public contPedidosHoy: any;
  public prodSolicitadosHoy: any;
  public dineroRecaudadoHoy: any;

  constructor(private http: HttpClient,private router: Router, private rutaService: RutaBaseService) {
    
  }

  public getFecha(){
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    if (m == 0) {
        return 'Enero '+ y;
    }
    else if (m == 1) {
        return 'Febrero '+y;
    }
    else if (m == 2) {
        return 'Marzo '+y;
    }
    else if (m == 3) {
        return 'Abril '+y;
    }
    else if (m == 4) {
        return 'Mayo '+y;
    }
    else if (m == 5) {
        return 'Junio '+y;
    }
    else if (m == 6) {
        return 'Julio '+y;
    }
    else if (m == 7) {
        return 'Agosto '+y;
    }
    else if (m == 8) {
        return 'Septiembre '+y;
    }
    else if (m == 9) {
        return 'Octubre '+y;
    }
    else if (m == 10) {
        return 'Noviembre '+y;
    }
    else if (m == 11) {
        return 'Diciembre '+y;
    }
  }

  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';

  // dropdown buttons
  public status: { isopen } = { isopen: false };
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  // convert Hex to RGBA
  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    return rgba;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandPrimary,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A'
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.6,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

  // mainChart

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Pedidos'
    },
    {
      data: this.mainChartData2,
      label: 'Usuarios'
    }/*,
    {
      data: this.mainChartData3,
      label: 'BEP'
    }*/
  ];
  /* tslint:disable:max-line-length */
  //public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  //public mainChartLabels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  public mainChartLabels: Array<any> = [];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any; /*= {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        }
        //NOTA: Esta propiedad no va
        ,
        ticks: {
          callback: function(value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(this.maxEjeY / 5),
          max: this.maxEjeY
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };*/
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: this.convertHex(this.brandInfo, 10),
      borderColor: this.brandInfo,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

  // social box charts

  public socialChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public socialChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public socialChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public socialChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public socialChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public socialChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public socialChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public socialChartLegend = false;
  public socialChartType = 'line';

  // sparkline charts

  public sparklineChartData1: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Clients'
    }
  ];
  public sparklineChartData2: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Clients'
    }
  ];

  public sparklineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public sparklineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public sparklineChartDefault: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#d1d4d7',
    }
  ];
  public sparklineChartPrimary: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandPrimary,
    }
  ];
  public sparklineChartInfo: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandInfo,
    }
  ];
  public sparklineChartDanger: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
    }
  ];
  public sparklineChartWarning: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandWarning,
    }
  ];
  public sparklineChartSuccess: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
    }
  ];

  public sparklineChartLegend = false;
  public sparklineChartType = 'line';

  public setMainChartOptions(): void{
    this.mainChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false,
          }/*,
          ticks: {
            callback: function(value: any) {
              return value.charAt(0);
            }
          }*/
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(this.maxEjeY / 5),
            max: this.maxEjeY
          }
        }]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        }
      },
      legend: {
        display: false
      }
    };
  }

  ngOnInit(): void {
    // generate random values for mainChart
    /*for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(1, 10));
      this.mainChartData2.push(this.random(1, 10));
      this.mainChartData3.push(65);
    }*/

    this.loading = true;
    this.http.get(this.rutaService.getRutaApi()+'constructoraKienAPI/public/dashboard?token='+localStorage.getItem('constructora_token'))
       .toPromise()
       .then(
         data => { // Success
           console.log(data);
           this.data=data;
           
           //Grafico de lineas<----

           //Inicializar las labels
           for (var i = 0; i < this.data.labelsPedidosMesActual.length; i++) {
             this.mainChartLabels.push(this.data.labelsPedidosMesActual[i]);
           }

           //Inicializar los pedidos y los clientes
           for (var i = 0; i < this.data.pedidosMesActual.length; i++) {
             this.mainChartData1.push(this.data.pedidosMesActual[i].contador);
             this.mainChartData2.push(this.data.clientesMesActual[i].contador);
           }

           //Inicializar el maximo maxEjeY
           this.maxEjeY = this.data.maxEjeY;

           this.setMainChartOptions();

           //Inicializar los totales
           this.totalPedidosMes = this.data.totalPedidosMes;
           this.totalClientesMes = this.data.totalClientesMes;

           //Grafico de lineas---->

           //Inicializar cantidades de hoy
           this.contClientesHoy = this.data.contClientesHoy;
           this.contPedidosHoy = this.data.contPedidosHoy;
           this.prodSolicitadosHoy = this.data.prodSolicitadosHoy;
           this.dineroRecaudadoHoy = this.data.dineroRecaudadoHoy;

          setTimeout(()=>{
            this.loading = false;
            setTimeout(()=>{this.mostrar = true;},100);
          },1000);

           
         },
         msg => { // Error
           console.log(msg);
           //console.log(msg.error.error);

           this.loading = false;

           //token invalido/ausente o token expiro
           if(msg.status == 400 || msg.status == 401){ 
                //alert(msg.error.error);
                //ir a login

                this.alerta_tipo = 'warning';
                this.alerta_msg = msg.error.error;
                this.alerta_boton = true;
                this.mostrar = false;
            }
         }
       );
  }
}
