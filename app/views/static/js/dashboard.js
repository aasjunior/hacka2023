// Cores para cada label
let colors = {
    Tecnologia: "#526BDB",
    Marketing: "72B3FF",
    Comunicacao: "#3FBDF1",
    Outros: "#8195A8",
  };
  var mesesAno = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  var line_chart;
  var monthly_chart;
  
  if (document.querySelector(".dashboard")) {
    var tecnologia = parseInt(document.getElementById("tecnologia").value) ?? null;
    var marketing = parseInt(document.getElementById("bom").value) ?? null;
    var sem_resposta =
      parseInt(document.getElementById("sem_resposta").value) ?? null;
    var mesAtual = new Date().getMonth() ?? null;
    
    
    var datatecnologia = [2, 6, 8, 5, 10, 9, 7, 4, 3, 1, 12];
    var dataBom = [10, 5, 3, 8, 6, 4, 11, 9, 7, 2, 12];
    var dataSemResposta = [4, 2, 1, 6, 3, 5, 2, 4, 1, 6, 5];
  
    var datatecnologiaMensal =
      JSON.parse(document.getElementById("datatecnologiaMensal").value) ?? null;
    var dataBomMensal =
      JSON.parse(document.getElementById("dataBomMensal").value) ?? null;
    var dataSemRespostaMensal =
      JSON.parse(document.getElementById("dataSemRespostaMensal").value) ?? null;
  
    dailyRecord(tecnologia, bom, sem_resposta);
    annualRecord(datatecnologia, dataBom, dataSemResposta);
    // monthlyChart(datatecnologiaMensal, dataBomMensal, dataSemRespostaMensal)
    monthlyChart();
  }
  
  if (document.querySelector(".patient-card_dash")) {
    const weight_data =
      parseFloat(document.getElementById("weight_data").value) ?? null;
    const sleep_data =
      parseFloat(document.getElementById("sleep_data").value) ?? null;
    const health_data =
      parseFloat(document.getElementById("health_data").value) ?? null;
  
    weight_chart(weight_data);
    sleep_chart(sleep_data);
    health_chart(health_data);
  }
  
  function dailyRecord(tecnologia, bom, sem_resposta) {
    const options = {
      chart: {
        type: "donut",
        height: "90%",
      },
      series: [tecnologia, bom, sem_resposta],
      colors: [colors["tecnologia"], colors["Bom"], colors["Sem_resposta"]],
      labels: ["Humor: tecnologia", "Humor: Bom", "Sem resposta"],
      legend: {},
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                fontSize: "24px",
                color: "#888",
                offsetY: -5,
              },
              value: {
                fontSize: "24px",
                color: "#111",
                offsetY: 16,
              },
              total: {
                show: true,
                fontSize: "16px",
                color: "#888",
                label: "Total",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                },
              },
            },
            size: "60%",
            strokeWidth: 0,
          },
        },
      },
    };
  
    const dailyRecord_chart = new ApexCharts(
      document.querySelector("#g-daily"),
      options
    );
    dailyRecord_chart.render();
  }
  
  function annualRecord(datatecnologia, dataBom, dataSemResposta) {
    // Cria um array com os nomes dos meses do ano
    var meses = [];
  
    for (var i = mesAtual - 11; i <= mesAtual; i++) {
      var mes = (i < 0 ? 12 + i : i) % 12; // Ajusta o índice para garantir um valor entre 0 e 11
      meses.push(mesesAno[mes].substr(0, 3));
    }
  
    // Define o intervalo do eixo X para exibir os meses do ano
    var xaxisRange = {
      min: new Date().getFullYear() - 1 + "-" + (mesAtual + 1) + "-01",
      max: new Date().getFullYear() + "-" + (mesAtual + 1) + "-01",
    };
  
    // Dados iniciais do gráfico
    var initialData = datatecnologia;
    var initialColor = colors["tecnologia"];
  
    var line_options = {
      series: [
        {
          data: initialData,
        },
      ],
      chart: {
        id: "line-chart",
        height: 350,
        type: "line",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: [initialColor],
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "category",
        categories: meses,
      },
      yaxis: {
        max: 12,
      },
      legend: {
        show: false,
      },
    };
    line_chart = new ApexCharts(
      document.querySelector("#g-annual"),
      line_options
    );
    line_chart.render();
  }
  
  // Filtrar o gráfico com base na label selecionada
  function filterChart(label) {
    var newData, newColor;
  
    if (label === "Tecnologia") {
      newData = dataTecnologia;
      newColor = colors["Tecnologia"];
    } else if (label === "Marketing") {
      newData = dataMarketing;
      newColor = colors["Marketing"];
    } else if (label === "Comunicacao") {
      newData = dataComunicacao;
      newColor = colors["Comunicacao"];
    } else if (label === "Outros") {
      newData = dataOutros;
      newColor = colors["Outros"];
    }
  
    line_chart.updateOptions({
      stroke: {
        colors: [newColor],
      },
    });
    line_chart.updateSeries([{ data: newData }]);
  }

  function monthlyChart() {
    var dataTecnologia = [2, 6, 8, 5, 10, 9, 7, 4, 3, 1, 12, 11, 6];
    var dataMarketing = [10, 5, 3, 8, 6, 4, 11, 9, 7, 2, 12, 1, 6];
    var dataComunicacao = [4, 2, 1, 6, 3, 5, 2, 4, 1, 6, 5, 3, 2];
    var dataOutros = [7, 3, 2, 6, 3, 5, 2, 4, 11, 6, 5, 13, 12];
    var dataTime = generateDateRange("2023-10-01", "2023-10-28");
  
    var colors = {
      Tecnologia: "#526BDB",
      Marketing: "72B3FF",
      Comunicacao: "#3FBDF1",
      Outros: "#8195A8",
    };
  
    var monthly_options = {
      series: [
        {
          name: "Tecnologia",
          data: dataTecnologia,
        },
        {
          name: "Marketing",
          data: dataMarketing,
        },
        {
          name: "Comunicacao",
          data: dataComunicacao,
        },
        {
          name: "Outros",
          data: dataOutros,
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: dataTime,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
      colors: [colors["Tecnologia"], colors["Marketing"], colors["Comunicacao"], colors["Outros"]],
    };
  
    var monthly_chart = new ApexCharts(
      document.querySelector("#g-monthly"),
      monthly_options
    );
    monthly_chart.render();
  }
  
  function generateRandomData(count) {
    var data = [];
    for (var i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * 100) + 1);
    }
    return data;
  }
  
  function generateDateRange(startDate, endDate) {
    var currentDate = new Date(startDate);
    var dates = [];
    while (currentDate <= new Date(endDate)) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
  
  function formatDate(date) {
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    var milliseconds = ("00" + date.getMilliseconds()).slice(-3);
  
    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      "." +
      milliseconds
    );
  }