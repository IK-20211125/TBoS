
var type = 'radar';

var data = {
  labels: ['Twitter', 'Yahoo!', 'Google'],
  datasets: [{
    //グラフのデータ
    data:  [0,0,0],
    // データライン
    fill: true,
    //データの内側の色
    backgroundColor: 'rgb(255, 99, 132, 0.4)',
    //データ外枠の色
    borderColor: 'rgb(255, 99, 132)',
    hitRadius: "none",
    radius: "0.001"
  }],
};

var options =  {
  //タイトルの非表示
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    r: {
      //グラフの最小値・最大値
      min: 0,
      max: 3,
      //背景色
      backgroundColor: '#F0F0F0',

      //グリッドライン
      grid: {
        color: '#a9a9a9',
        display: true
      },
      //アングルライン
      angleLines: {
        display: true
      },
      //目盛り
      ticks: {
        maxTicksLimit: 1,
        display: false
      },
      //各項目のラベル
      pointLabels: {
        color: 'blue'
      },
    },
  },
};

// var ctx0 = document.getElementById("RadarChart0");

var radarChart0 = new Chart(document.getElementById("RadarChart0"), {type,data,options});
var radarChart1 = new Chart(document.getElementById("RadarChart1"), {type,data,options});
var radarChart2 = new Chart(document.getElementById("RadarChart2"), {type,data,options});
var radarChart3 = new Chart(document.getElementById("RadarChart3"), {type,data,options});
var radarChart4 = new Chart(document.getElementById("RadarChart4"), {type,data,options});
var radarChart5 = new Chart(document.getElementById("RadarChart5"), {type,data,options});
var radarChart6 = new Chart(document.getElementById("RadarChart6"), {type,data,options});
var radarChart7 = new Chart(document.getElementById("RadarChart7"), {type,data,options});
var radarChart8 = new Chart(document.getElementById("RadarChart8"), {type,data,options});
var radarChart9 = new Chart(document.getElementById("RadarChart9"), {type,data,options});

var a = [3,3,3];

radarChart0.data.datasets[0].data = a;
radarChart0.update();
