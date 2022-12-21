$(function () {
    // #で始まるアンカーをクリックした場合に処理
    $('a[href^=#]').click(function () {
        // スクロールの速度
        var speed = 400; // ミリ秒
        // アンカーの値取得
        var href = $(this).attr("href");
        // 移動先を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を数値で取得
        var position = target.offset().top;
        // スムーススクロール
        $('body,html').animate({ scrollTop: position }, speed, 'swing');
        return false;
    });
});

//日付の取得
document.getElementById("date").innerHTML = getNow();

function getNow() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minutes = now.getMinutes();
   
    var nowDate = year + "/" + mon + "/" + day + " " + hour + ":" + ("0" +minutes).slice(-2);

    return nowDate;
};

// ロード画面のタイマー
setTimeout(function () {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
}, 5500);

var flag = false;

$(function () {
    // ハンバーガーボタンクリックで実行
    $(".menu-btn").click(function () {
        let html_element = document.querySelector('html');
        html_element.className = 'html_active';
        if(flag){
            html_element.classList.remove("html_active");
            flag = false;
        }else{
            flag = true
        }
        
    });
    
});