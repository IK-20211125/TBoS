var ctx = document.getElementById("RadarChart");
var myRadarChart = new Chart(ctx, {
  //グラフの種類
  type: 'radar',
  //データの設定
  data: {
    labels: ['Twitter', 'Yahoo!', 'Google'],
    datasets: [{
      //グラフのデータ
      data: [80, 50, 50],
      // データライン
      fill: true,
      //データの内側の色
      backgroundColor: 'rgb(255, 99, 132, 0.4)',
      //データ外枠の色
      borderColor: 'rgb(255, 99, 132)',
      hitRadius: "none",
      radius: "0.001"
    }],
  },
  //オプションの設定
  options: {
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
        max: 100,
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
  },
});