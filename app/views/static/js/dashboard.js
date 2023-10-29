// Cores para cada label
let colors = {
    Tecnologia: "#526BDB",
    Marketing: "#72B3FF",
    Comunicacao: "#3FBDF1",
    Outros: "#8195A8",
    TaxaOcorrencias: "#72B3FF",
    TaxaConcientizacao: "#FFFFFF"
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
    var taxaOcorrencias = parseInt(document.getElementById("taxaOcorrencias").value) ?? null;
    var taxaConcientizacao = parseInt(document.getElementById("taxaConcientizacao").value) ?? null;
    var mesAtual = new Date().getMonth() ?? null;
  }

  function dailyRecord(tecnologia, marketing, Comunicação, outros) {
    const options = {
      chart: {
        type: "donut",
        height: "90%",
      },
      series: [tecnologia, marketing, Comunicação, outros],
      colors: [colors["Tecnologia"], colors["Marketing"], colors["Comunicacao"], colors["Outros"]],
      labels: ["Tecnologia", "Marketing", "Comunicação", "Outros"],
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

  dailyRecord(25, 30, 22, 11)
  
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
    var taxaOcorrencias = [2, 6, 8, 5, 10, 9, 7, 4, 3, 1, 4, 3, 2, 7, 3, 2, 5];
    var taxaConcientizacao = [1, 5, 3, 4, 6, 4, 7, 1, 2, 0, 1, 3, 1, 4, 2, 2, 3];
    var dataTime = generateDateRange("2023-10-11", "2023-10-29");
  
    var colors = {
      TaxaOcorrencias: "#72B3FF",
      TaxaConcientizacao: "#FFFFFF"
    };
  
    var monthly_options = {
      series: [
        {
          name: "TaxaOcorrências",
          data: taxaOcorrencias,
        },
        {
          name: "TaxaConcientização",
          data: taxaConcientizacao,
        }
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
      xaxis: {
        type: "datetime",
        categories: dataTime,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
      colors: [colors["TaxaOcorrencias"], colors["TaxaConcientizacao"]],
    };
  
    var monthly_chart = new ApexCharts(
      document.querySelector("#g-monthly"),
      monthly_options
    );
    monthly_chart.render();
  }
  
  monthlyChart();
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