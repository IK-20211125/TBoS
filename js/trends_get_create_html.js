//googleトレンド
var google_trends = new Array;
var google_article = new Array;
var google_url = new Array;
var google_time = new Array;
var google_num = new Array;
var google_date = new Array;
var google_picture = new Array;
//Yahooトレンド
var yahoo_trends = new Array;
var yahoo_url = new Array;
//Twitterトレンド
var twitter_trends = new Array;
var twitter_volume = new Array;
var twitter_deviation = new Array;
//Tbosトレンド(twitterとyahooの一致)
var tbos_trends = new Array;
var tbos_yahoo_title = new Array;
var tbos_yahoo_url = new Array;
var tbos_twitter_volume = new Array;
//Googleと一致したTbosトレンド
var tbos_trends_google = new Array;
var tbos_google_trends_article = new Array;
var tbos_google_trends_url = new Array;
var tbos_yahoo_trends_article = new Array;
var tbos_yahoo_trends_url = new Array;
//onlygoogleトレンド
var only_google_trends = new Array;
var google_result_array = new Array;
var only_google_index;
//onlytwitterのトレンド
var only_twitter_trends = new Array;
//twitterとyahooの比較
var ty_result;
var ty_value;
//googleとtwitterとyahooで一致したキーワードの比較
var tyg_result;
var tyg_value;
//取得したデータを比較する(1:前回,2:最新)
var g_comparison1;
var g_comparison2;
var y_comparison1;
var y_comparison2;
var t_comparison1;
var t_comparison2;
//初回であるかそうでないかを判定
var g_counter = 0;
var y_counter = 0;
var t_counter = 0;
//値が更新されているかどうかを判定
var g_judge = false;
var y_judge = false;
var t_judge = false;
//トレンドの要素
var tbos_element = document.getElementById("TBoS_trends");
var twitter_element = document.getElementById("only_twitter_trends");
var google_element = document.getElementById("only_google_trends");


//レーダーチャートの変数
var type = 'radar';

var data = {
    labels: ['Twitter', 'Yahoo!', 'Google'],
    datasets: [{
        //グラフのデータ
        data: [0, 0, 0],
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

var options = {
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
};

//スプレットシートの値を取得するためのURL
const GOOGLE_ENDPOINT = "https://script.google.com/macros/s/AKfycbyMriOIvoeSU5J4mHpNJj0CGB6knEpt-uwQz2ucF79-nhOij0-F-9pBCz4R6gCKnbeyQg/exec";
const YAHOO_ENDPOINT = "https://script.google.com/macros/s/AKfycbxw17J9uso3gk9nrrlKFV8r6ZAZxVRC34iQHPiysW0ORJMNsfEkrQ9rDMgNCS2ZfOSj/exec";
const TWITTER_ENDPOINT = "https://script.google.com/macros/s/AKfycbzlFovDNjUEIfvaGz0NUs6got89Gdb16pB2qIakaHU9LNbNt-V20jlt8ot-fq3W9omg7A/exec";

//タイトル作成
tbos_element.insertAdjacentHTML('beforeend', '<h2>TBoSトレンド</h2>'
);

twitter_element.insertAdjacentHTML('beforeend', '<h3 class="twitter_title">OnlyTwitterトレンド</h3>'
);

google_element.insertAdjacentHTML('beforeend', '<h3 class="google_title">OnlyGoogleトレンド</h3>'
);


//添え字だけ表示

for (let index = 0; index < 5; index++) {
    tbos_element.insertAdjacentHTML('beforeend', '<article class="tbos_content_' + index + '">' +
        '<P class="tbos_trend"><span class="tbos_number">' + (index + 1) + '</span></P></article>'
    );
};

for (let index = 0; index < 20; index++) {

    twitter_element.insertAdjacentHTML('beforeend', '<article class="twitter_content_' + index + '">' +
        '<P class="twitter_trend"><span class="twitter_number">' + (index + 1) + '</span></P></article>'
    );
};

for (let index = 0; index < 10; index++) {

    google_element.insertAdjacentHTML('beforeend', '<article class="google_content_' + index + '">' +
        '<P class="google_trend"><span class="google_number">' + (index + 1) + '</span></P></article>'
    );
};


//トレンドを取得し、HTMLを作成する関数
function GetTrends() {

    //Googleの情報を取得する
    fetch(GOOGLE_ENDPOINT)
        .then(response => response.json())
        /*成功した処理*/
        .then(data => {
            //JSONから配列に変換
            object = data;
            //初回
            if (g_counter === 0) {

                //配列に取得した値を代入
                for (a = 0; a < object.length; a++) {

                    //キーワード
                    google_trends[a] = object[a].keyword;
                    //記事のタイトル
                    google_article[a] = object[a].article;
                    //記事のURL
                    google_url[a] = object[a].url;
                    //写真のURL
                    google_picture[a] = object[a].picture;
                    //取得時間
                    // google_time[a] = object[a].time;
                    //検索件数をカンマ区切りにする
                    // google_num[a] = Number(object[a].num).toLocaleString();
                    //トレンド入りした日付
                    // google_date[a] = object[a].date;

                }

                //取得したJSON形式のデータを文字列型に変換
                g_comparison1 = JSON.stringify(object);
                g_counter++;

            }
            g_comparison2 = JSON.stringify(object);

            //取得したjsonの値が前回と異なる
            if (g_comparison1 !== g_comparison2) {

                //値を更新
                g_comparison1 = g_comparison2;
                g_counter++;
                g_judge = true;

                //配列に取得した値を代入
                for (a = 0; a < object.length; a++) {

                    google_trends[a] = object[a].keyword;
                    google_article[a] = object[a].article;
                    google_url[a] = object[a].url;
                    google_picture[a] = object[a].picture;
                    // google_time[a] = object[a].time;
                    // google_num[a] = Number(object[a].num).toLocaleString();
                    // google_date[a] = object[a].date;

                }

            }

            //Yahoo!の情報を取得する
            fetch(YAHOO_ENDPOINT)
                .then(response => response.json())
                /*成功した処理*/
                .then(data => {
                    //JSONから配列に変換
                    object2 = data;
                    //初回
                    if (y_counter === 0) {

                        //配列に取得した値を代入
                        for (b = 0; b < object2.length; b++) {

                            //記事のタイトル
                            yahoo_trends[b] = object2[b].article;
                            //URL
                            yahoo_url[b] = object2[b].url;

                        }

                        //取得したJSON形式のデータを文字列型に変換
                        y_comparison1 = JSON.stringify(object2);
                        y_counter++;

                    }
                    y_comparison2 = JSON.stringify(object2);
                    //取得したjsonの値が前回と異なる
                    if (y_comparison1 !== y_comparison2) {

                        //値を更新
                        y_comparison1 = y_comparison2;
                        y_counter++;
                        y_judge = true;

                        //配列に取得した値を代入
                        for (b = 0; b < object2.length; b++) {
                            yahoo_trends[b] = object2[b].article;
                            yahoo_url[b] = object2[b].url;
                        }

                    }


                    //Twitterの情報を取得する
                    fetch(TWITTER_ENDPOINT)
                        .then(response => response.json())
                        /*成功した処理*/
                        .then(data => {
                            //JSONから配列に変換
                            object3 = data;
                            //初回
                            if (t_counter === 0) {

                                //配列に取得した値を代入
                                for (c = 0; c < object3.length; c++) {

                                    //キーワード
                                    twitter_trends[c] = object3[c].keyword;
                                    //ツイート件数
                                    twitter_volume[c] = object3[c].volume;

                                }

                                //取得したJSON形式のデータを文字列型に変換
                                t_comparison1 = JSON.stringify(object3);
                                t_counter++;

                            }
                            t_comparison2 = JSON.stringify(object3);
                            //取得したjsonの値が前回と異なる
                            if (t_comparison1 !== t_comparison2) {

                                //値を更新
                                t_comparison1 = t_comparison2;
                                t_counter++;
                                t_judge = true;
                                //配列に取得した値を代入
                                for (c = 0; c < object3.length; c++) {
                                    twitter_trends[c] = object3[c].keyword;
                                    twitter_volume[c] = object3[c].volume;
                                }
                            }
                            console.log("ツイート件数 " + twitter_volume);

                            //初回
                            if (g_counter === 1 && y_counter === 1 && t_counter === 1) {
                                console.log("初回");
                                g_counter++;
                                y_counter++;
                                t_counter++;
                                Create_trends();
                                //スプレットシートの値が更新された    
                            } else if (g_judge === true || y_judge === true || t_judge === true) {
                                Elementdelete();
                            }
                        });
                });
        });

}

//値の初期化
function Elementdelete() {

    //値の初期化処理
    console.log("更新");
    g_judge = false;
    y_judge = false;
    t_judge = false;
    //前回のデータを削除
    tbos_trends.length = 0;
    tbos_yahoo_url.length = 0;
    tbos_yahoo_title.length = 0;
    tbos_trends_google.length = 0;
    tbos_google_trends_article.length = 0;
    tbos_google_trends_url.length = 0;
    tbos_yahoo_trends_article.length = 0;
    tbos_yahoo_trends_url.length = 0;

};

var radar_data = new Array;
var radar_index = 0;
for (var index = 0; index < 20; index++) {
    radar_data[index] = [0, 0, 0];
};


//トレンドの作成
function Create_trends() {

    //tbosトレンドの作成(TwitterとYahooの比較)
    for (a = 0; a < twitter_trends.length; a++) {

        for (b = 0; b < yahoo_trends.length; b++) {

            //twitterのキーワードがyahooの記事に含まれているか調べる
            ty_value = new RegExp(".*" + twitter_trends[a] + ".*");
            ty_result = yahoo_trends[b].match(ty_value);

            //一致するキーワードがあった
            if (ty_result != null) {
                //tbosトレンドに入れる
                tbos_trends.push(twitter_trends[a]);
                tbos_twitter_volume.push(twitter_volume[a]);
                if (typeof twitter_volume[a] === 'number') {
                    var twitter_radar_data = Math.round(twitter_volume[a] / 10000) * 5 + 50;
                }
                else {
                    var twitter_radar_data = 50;
                }
                console.log(twitter_radar_data);
                // グラフのデータ
                radar_data[radar_index] = [twitter_radar_data, 90, 0];
                radar_index++;
                //tbosのyahoo!URL
                tbos_yahoo_url.push(yahoo_url[b]);
                //tbosのyahoo!title
                tbos_yahoo_title.push(yahoo_trends[b]);
                break;
            }

        }

    }
    radar_index = 0;

    //onlytwitterトレンド作成
    only_twitter_trends = twitter_trends.filter(i => tbos_trends.indexOf(i) == -1);

    //tbos_trendsとgoogleの作成(全てに一致)
    for (c = 0; c < google_trends.length; c++) {

        for (d = 0; d < tbos_trends.length; d++) {

            //googleのキーワードがtbos_trends[]に含まれているか調べる
            tyg_value = new RegExp(".*" + google_trends[c] + ".*");
            tyg_result = tbos_trends[d].match(tyg_value);

            //一致するキーワードがあった
            if (tyg_result != null) {

                radar_data[d][2] = 90;
                //googleの添え字を調べる
                // var g_index = google_trends.indexOf(google_trends[c]);
                //google_result_array[index] = tyg_result;
                //キーワード
                // tbos_trends_google.push(google_trends[c]);
                //Googleの記事
                // tbos_google_trends_article.push(google_article[g_index]);
                // tbos_google_trends_url.push(google_url[g_index]);
                //Yahooの記事
                // tbos_yahoo_trends_article.push(ty_yahoo_trends[c]);
                // tbos_yahoo_trends_url.push(ty_yahoo_url[c]);
                // console.log("完全一致" + tbos_trends_google);
                //yahooとtwitterの一致は削除
                // tbos_trends.splice(d, 1);
                // ty_yahoo_trends.splice(d, 1);
                // ty_yahoo_url.splice(d, 1);
                break;

            }

        }

    }

    console.log(radar_data);

    //onlygoogleトレンド作成
    only_google_trends = google_trends.filter(i => tbos_trends.indexOf(i) == -1);


    //HTMlでTBoSトレンド作成

    var tbos_statistics_count = 0;
    tbos_element.textContent = '';

    tbos_element.insertAdjacentHTML('beforeend', '<h2>TBoSトレンド</h2>'
    );

    for (let index = 0; index < tbos_trends.length; index++) {

        tbos_element.insertAdjacentHTML('beforeend', '<article class="tbos_content_' + index + '"><label for="tbos_menu_bar' + index + '">' +
            '<P class="tbos_trend"><span class="tbos_number" >' + (index + 1) + '</span>&nbsp;&nbsp;&nbsp;<span class="data_of_tbos light_false" id="light' + index + '" onclick="graph_animation(radar_data[' + index + '],radarChart' + index + ')">' + tbos_trends[index] + '</span></P>' +
            '</label><input type="checkbox" id="tbos_menu_bar' + index + '" /><div class="content_text" id="tbos_links' + index + '">' +
            '<div class="tbos_graph_parents"><canvas id="RadarChart' + index + '"></canvas></div><div class="tbos_news"><a class="tbos_news_link" href="' + tbos_yahoo_url[index] + '" target="_blank" rel="noopener noreferrer">' + tbos_yahoo_title[index] + '</a><p class="twitter_volume">ツイート件数 ' + tbos_twitter_volume[index] + '</p></div></div></article>'
        );

        if (radar_data[index].at(0) >= 10 && radar_data[index].at(1) === 90 && radar_data[index].at(2) === 90) {
            let textLight = document.getElementById('light' + index);
            textLight.className = 'data_of_tbos light_true';
        }
    };

    twitter_deviation = statistics(twitter_volume);

    for (let index = 0; index < twitter_deviation.length; index++) {

        if (twitter_deviation[index] > 90) {
            tbos_element.insertAdjacentHTML('beforeend', '<article class="tbos_content_' + (tbos_trends.length + tbos_statistics_count) + '"><label for="tbos_menu_bar' + (tbos_trends.length + tbos_statistics_count) + '">' +
                '<P class="tbos_trend"><span class="tbos_number" >' + (tbos_trends.length + tbos_statistics_count + 1) + '</span>&nbsp;&nbsp;&nbsp;<span class="data_of_tbos light_false" id="light' + (tbos_trends.length + tbos_statistics_count) + '" >' + twitter_trends[index] + '</span></P>' +
                '</label><input type="checkbox" id="tbos_menu_bar' + (tbos_trends.length + tbos_statistics_count) + '" /><div class="content_text" id="tbos_links' + (tbos_trends.length + tbos_statistics_count) + '">' +
                '<div class="tbos_news"><p class="twitter_statistics">Twitter内で急上昇中<br>ツイート件数 :  ' + twitter_volume[index] + '<br>ツイート偏差値 :  ' + twitter_deviation[index] + '</p></div></div></article>'
            );

            tbos_statistics_count++;
        }
    }




    //HTMLでOnlyTwitterトレンド作成

    twitter_element.textContent = '';

    twitter_element.insertAdjacentHTML('beforeend', '<h3 class="twitter_title">OnlyTwitterトレンド</h3>'
    );



    for (let index = 0; index < 20; index++) {

        twitter_element.insertAdjacentHTML('beforeend', '<article class="twitter_content_' + index + '"><label for="twitter_menu_bar' + index + '">' +
            '<P class="twitter_trend"><span class="twitter_number">' + (index + 1) + '</span>&nbsp;&nbsp;<a class="data_of_twitter" href="https://twitter.com/search?q=' + only_twitter_trends[index].replace("#", "%23") + '" target="_blank" rel="noopener noreferrer">' + only_twitter_trends[index] + '</a></P></label></article>');

    };


    //HTMLでOnlyGoogleトレンド作成

    google_element.textContent = '';

    google_element.insertAdjacentHTML('beforeend', '<h3 class="google_title">OnlyGoogleトレンド</h3>'
    );

    for (let index = 0; index < only_google_trends.length; index++) {

        only_google_index = google_trends.indexOf(only_google_trends[index]);

        google_element.insertAdjacentHTML('beforeend', '<article class="google_content_' + index + '"><label for="google_menu_bar' + index + '">' +
            '<P class="google_trend"><span class="google_number">' + (index + 1) + '</span>&nbsp;&nbsp;<span class="data_of_google">' + only_google_trends[index] + '</span></P>' +
            '</label><input type="checkbox" id="google_menu_bar' + index + '" /><div class="content_text" id="google_links' + index + '"><img class="google_picture" src="' + google_picture[only_google_index] + '"><div class="google_news"><a class="google_news_link" href="' + google_url[only_google_index] + '" target="_blank" rel="noopener noreferrer">' + google_article[only_google_index] + '</a></div></div></article>');

    };



    //グラフ作成

    radarChart0 = new Chart(document.getElementById("RadarChart0"), { type, data, options });
    radarChart1 = new Chart(document.getElementById("RadarChart1"), { type, data, options });
    radarChart2 = new Chart(document.getElementById("RadarChart2"), { type, data, options });
    radarChart3 = new Chart(document.getElementById("RadarChart3"), { type, data, options });
    radarChart4 = new Chart(document.getElementById("RadarChart4"), { type, data, options });
    radarChart5 = new Chart(document.getElementById("RadarChart5"), { type, data, options });
    radarChart6 = new Chart(document.getElementById("RadarChart6"), { type, data, options });
    radarChart7 = new Chart(document.getElementById("RadarChart7"), { type, data, options });
    radarChart8 = new Chart(document.getElementById("RadarChart8"), { type, data, options });
    radarChart9 = new Chart(document.getElementById("RadarChart9"), { type, data, options });
    radarChart10 = new Chart(document.getElementById("RadarChart9"), { type, data, options });
    radarChart11 = new Chart(document.getElementById("RadarChart9"), { type, data, options });
    radarChart12 = new Chart(document.getElementById("RadarChart9"), { type, data, options });
    radarChart13 = new Chart(document.getElementById("RadarChart9"), { type, data, options });
    radarChart14 = new Chart(document.getElementById("RadarChart9"), { type, data, options });
    radarChart15 = new Chart(document.getElementById("RadarChart9"), { type, data, options });
    radarChart16 = new Chart(document.getElementById("RadarChart9"), { type, data, options });
    radarChart17 = new Chart(document.getElementById("RadarChart9"), { type, data, options });
    radarChart18 = new Chart(document.getElementById("RadarChart9"), { type, data, options });
    radarChart19 = new Chart(document.getElementById("RadarChart9"), { type, data, options });

    //ここより下処理不動

}

//レーダーチャートの動的な生成
function graph_animation(radar_data, radarChart) {
    setTimeout(function () { radarChart.reset() }, 500);
    radarChart.update();
    radarChart.data.datasets[0].data = radar_data;
    radarChart.options.animation.duration = 1000;
    radarChart.options.animation.easing = 'linear'
    radarChart.update();
};

//平均値
function average(array) {
    let n = array.length;
    let avg = 0;

    for (i = 0; i < n; i++) {
        avg += array[i];
    }
    return avg / n; //  (1 / n * avg)
}

//標準偏差
function standardDeviation(array, avg) {
    let n = array.length;
    let sum = 0;
    for (i = 0; i < n; i++) {
        sum += Math.pow(array[i] - avg, 2);
    }
    return Math.sqrt(sum / n);
}

//偏差値
function standardScore(array, avg, sd) {
    let ssArr = [];
    let n = array.length;
    for (i = 0; i < n; i++) {
        let ti = Math.round((10 * (array[i] - avg) / sd) + 50);
        ssArr.push(ti);
    };

    return ssArr;
}

function statistics(array) {

    console.log(array);
    for (var index = 0; index < array.length; index++) {
        // array[index] = array[index].replace("10000 ↓", "10000");
        if (typeof array[index] === 'string') {
            array[index] = 10000;
        };
    };
    let avg = average(array);
    let sd = standardDeviation(array, avg);
    let ssArr = standardScore(array, avg, sd);

    console.log("偏差値" + ssArr);

    return ssArr;
}

//初回は即実行
GetTrends();


//2回目以降60秒ごと
// setInterval("GetTrends()", 10000);





