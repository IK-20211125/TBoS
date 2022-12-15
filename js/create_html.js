//TBoSトレンド作成

var tbos_element = document.getElementById("TBoS_trends");

var tbos_text = ["イレリアはレーン戦にてEを当てるかがすべてである", "弐号機", "参号機", "四号機", "五号機", "六号機", "七号機", "八号機", "九号機", "十号機あああああああああああああああああああああああああああああ"];

tbos_element.textContent = '';

tbos_element.insertAdjacentHTML('beforeend', '<h2>TBoSトレンド</h2>'
);

for (let index = 0; index < tbos_text.length; index++) {

    tbos_element.insertAdjacentHTML('beforeend', '<article class="tbos_content_' + index + '"><label for="tbos_menu_bar' + index + '">' +
        '<P class="tbos_trend"><span class="tbos_number">'+(index+1)+'</span>&nbsp;&nbsp;&nbsp;<span class="data_of_tbos">' + tbos_text[index] + '</span></P>' +
        '</label><input type="checkbox" id="tbos_menu_bar' + index + '" /><div class="content_text" id="tbos_links' + index + '">' +
        '<div class="tbos_graph_parents"><canvas class="RadarChart"></canvas></div><div><a class="tbos_news_link" href="https://tbos.shop">tbos.shop</a></div></div></article>'
    );

};


//OnlyTwitterトレンド作成

var twitter_element = document.getElementById("only_twitter_trends");

var twitter_text = ["イレリアはレーン戦にてEを当てるかがすべてである", "弐号機", "参号機", "四号機", "五号機", "六号機", "七号機", "八号機", "九号機", "九号機"];

twitter_element.textContent = '';

twitter_element.insertAdjacentHTML('beforeend', '<h3 class="twitter_title">OnlyTwitterトレンド</h3>'
);

for (let index = 0; index < twitter_text.length; index++) {

    twitter_element.insertAdjacentHTML('beforeend', '<article class="twitter_content_' + index + '"><label for="twitter_menu_bar' + index + '">' +
        '<P class="twitter_trend"><span class="twitter_number">'+(index+1)+'</span>&nbsp;&nbsp;<span class="data_of_twitter">' + twitter_text[index] + '</span></P>' +
        '</label><input type="checkbox" id="twitter_menu_bar' + index + '" /><div class="content_text" id="twitter_links' + index + '">test</div></article>');

};


//OnlyGoogleトレンド作成

var google_element = document.getElementById("only_google_trends");

var google_text = ["イレリア", "弐号機", "参号機", "四号機"];

google_element.textContent = '';

google_element.insertAdjacentHTML('beforeend', '<h3 class="google_title">OnlyGoogleトレンド</h3>'
);

for (let index = 0; index < google_text.length; index++) {

    google_element.insertAdjacentHTML('beforeend', '<article class="google_content_' + index + '"><label for="google_menu_bar' + index + '">' +
        '<P class="google_trend"><span class="google_number">'+(index+1)+'</span>&nbsp;&nbsp;<span class="data_of_google">' + google_text[index] + '</span></P>' +
        '</label><input type="checkbox" id="google_menu_bar' + index + '" /><div class="content_text" id="google_links' + index + '">test</div></article>');

};