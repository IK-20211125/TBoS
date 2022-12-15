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
//Tbosトレンド(twitterとyahooの一致)
var tbos_trends = new Array;
var tbos_yahoo_title = new Array;
var tbos_yahoo_url = new Array;
//Googleと一致したTbosトレンド
var tbos_trends_google = new Array;
var tbos_google_trends_article = new Array;
var tbos_google_trends_url = new Array;
var tbos_yahoo_trends_article = new Array;
var tbos_yahoo_trends_url = new Array;
//onlygoogleトレンド
var only_google_trends = new Array;
var google_result_array = new Array;
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
        data: [3, 2, 1],
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

//スプレットシートの値を取得するためのURL
const GOOGLE_ENDPOINT = "https://script.google.com/macros/s/AKfycbx2EFmf06-FCt9BkET6aikAE0kVrU5S9jVqkgi9x6Kq0tRF4AIG1fgpp6wdD5CDR7noLA/exec";
const YAHOO_ENDPOINT = "https://script.google.com/macros/s/AKfycbxw17J9uso3gk9nrrlKFV8r6ZAZxVRC34iQHPiysW0ORJMNsfEkrQ9rDMgNCS2ZfOSj/exec";
const TWITTER_ENDPOINT = "https://script.google.com/macros/s/AKfycbzlFovDNjUEIfvaGz0NUs6got89Gdb16pB2qIakaHU9LNbNt-V20jlt8ot-fq3W9omg7A/exec";

//タイトル作成
tbos_element.insertAdjacentHTML('beforeend', '<h2>TBoSトレンド</h2>'
);

twitter_element.insertAdjacentHTML('beforeend', '<h3 class="twitter_title">OnlyTwitterトレンド</h3>'
);

google_element.insertAdjacentHTML('beforeend', '<h3 class="google_title">OnlyGoogleトレンド</h3>'
);

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
                                }
                            }
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

}

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
                tbos_trends.push(twitter_trends[a]);
                //tbosのyahoo!URL
                tbos_yahoo_url.push(yahoo_url[b]);
                //tbosのyahoo!title
                tbos_yahoo_title.push(yahoo_trends[b]);
                break;
            }

        }

    }

    //onlytwitterトレンド作成
    only_twitter_trends = twitter_trends.filter(i => tbos_trends.indexOf(i) == -1);

    //tbos_trendsとgoogleの作成(全てに一致)
    // for (c = 0; c < google_trends.length; c++) {

    //     for (d = 0; d < tbos_trends.length; d++) {

    //         //googleのキーワードがtbos_trends[]に含まれているか調べる
    //         tyg_value = new RegExp(".*" + google_trends[c] + ".*");
    //         tyg_result = tbos_trends[d].match(tyg_value);

    //         //一致するキーワードがあった
    //         if (tyg_result != null) {

    //             //googleの添え字を調べる
    //             var g_index = google_trends.indexOf(google_trends[c]);
    //             //google_result_array[index] = tyg_result;
    //             //キーワード
    //             tbos_trends_google.push(google_trends[c]);
    //             //Googleの記事
    //             tbos_google_trends_article.push(google_article[g_index]);
    //             tbos_google_trends_url.push(google_url[g_index]);
    //             //Yahooの記事
    //             tbos_yahoo_trends_article.push(ty_yahoo_trends[c]);
    //             tbos_yahoo_trends_url.push(ty_yahoo_url[c]);
    //             console.log("完全一致" + tbos_trends_google);
    //             //yahooとtwitterの一致は削除
    //             tbos_trends.splice(d, 1);
    //             ty_yahoo_trends.splice(d, 1);
    //             ty_yahoo_url.splice(d, 1);
    //             break;

    //         }

    //     }

    // }

    //onlygoogleトレンド作成
    only_google_trends = google_trends.filter(i => tbos_trends.indexOf(i) == -1);


    //HTMlでTBoSトレンド作成

    tbos_element.textContent = '';

    tbos_element.insertAdjacentHTML('beforeend', '<h2>TBoSトレンド</h2>'
    );

    for (let index = 0; index < tbos_trends.length; index++) {

        tbos_element.insertAdjacentHTML('beforeend', '<article class="tbos_content_' + index + '"><label for="tbos_menu_bar' + index + '">' +
            '<P class="tbos_trend"><span class="tbos_number">' + (index + 1) + '</span>&nbsp;&nbsp;&nbsp;<span class="data_of_tbos">' + tbos_trends[index] + '</span></P>' +
            '</label><input type="checkbox" id="tbos_menu_bar' + index + '" /><div class="content_text" id="tbos_links' + index + '">' +
            '<div class="tbos_graph_parents"><canvas id="RadarChart' + index + '"></canvas></div><div class="tbos_news"><a class="tbos_news_link" href="' + tbos_yahoo_url[index] + '" target="_blank">' + tbos_yahoo_title[index] + '</a></div></div></article>'
        );

    };


    //HTMLでOnlyTwitterトレンド作成

    twitter_element.textContent = '';

    twitter_element.insertAdjacentHTML('beforeend', '<h3 class="twitter_title">OnlyTwitterトレンド</h3>'
    );



    for (let index = 0; index < 20; index++) {

        twitter_element.insertAdjacentHTML('beforeend', '<article class="twitter_content_' + index + '"><label for="twitter_menu_bar' + index + '">' +
            '<P class="twitter_trend"><span class="twitter_number">' + (index + 1) + '</span>&nbsp;&nbsp;<a class="data_of_twitter" href="https://twitter.com/search?q=' + only_twitter_trends[index].replace("#", "%23") + '" target="_blank">' + only_twitter_trends[index] + '</a></P></label></article>');

    };


    //HTMLでOnlyGoogleトレンド作成

    google_element.textContent = '';

    google_element.insertAdjacentHTML('beforeend', '<h3 class="google_title">OnlyGoogleトレンド</h3>'
    );

    for (let index = 0; index < only_google_trends.length; index++) {

        google_element.insertAdjacentHTML('beforeend', '<article class="google_content_' + index + '"><label for="google_menu_bar' + index + '">' +
            '<P class="google_trend"><span class="google_number">' + (index + 1) + '</span>&nbsp;&nbsp;<span class="data_of_google">' + only_google_trends[index] + '</span></P>' +
            '</label><input type="checkbox" id="google_menu_bar' + index + '" /><div class="content_text" id="google_links' + index + '"><img class="google_picture" src="' + google_picture[index] + '"><div class="google_news"><a class="google_news_link" href="' + google_url[index] + '" target="_blank">' + google_article[index] + '</a></div></div></article>');

    };


    //グラフ作成
    var radarChart0 = new Chart(document.getElementById("RadarChart0"), { type, data, options });
    var radarChart1 = new Chart(document.getElementById("RadarChart1"), { type, data, options });
    var radarChart2 = new Chart(document.getElementById("RadarChart2"), { type, data, options });
    var radarChart3 = new Chart(document.getElementById("RadarChart3"), { type, data, options });
    var radarChart4 = new Chart(document.getElementById("RadarChart4"), { type, data, options });
    var radarChart5 = new Chart(document.getElementById("RadarChart5"), { type, data, options });
    var radarChart6 = new Chart(document.getElementById("RadarChart6"), { type, data, options });
    var radarChart7 = new Chart(document.getElementById("RadarChart7"), { type, data, options });
    var radarChart8 = new Chart(document.getElementById("RadarChart8"), { type, data, options });
    var radarChart9 = new Chart(document.getElementById("RadarChart9"), { type, data, options });

    var test1 = [1, 1, 1];
    radarChart1.data.datasets[0].data = test1;
    radarChart1.update();

    var test2 = [2, 2, 2]
    radarChart2.data.datasets[0].data = test2;
    radarChart2.update();

}

//初回は即実行
GetTrends();

//2回目以降60秒ごと
// setInterval("GetTrends()", 10000);





