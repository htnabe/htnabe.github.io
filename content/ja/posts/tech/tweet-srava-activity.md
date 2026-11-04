---
title: "Strava APIを使ってアクティビティを自動ツイートする"
date: 2022-12-02T11:47:09+09:00
draft: false
tags: [Strava API, Twitter API, Google Apps Script]
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1670325438/NabeBlog/strava_post_thumbnail_jbviy5.webp"
categories: [Tech]
show_date: true
toc: true
---

追記：2023/1/25をもってTwitterアカウントを削除しました。なお、本記事の内容には何ら影響はありません。

## 目指す姿とモチベーション

サイクリング・ランニングの走行データを↓の様に定時に自動ツイートする。

- サイクリングの場合

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1670325438/NabeBlog/strava_post_thumbnail_jbviy5.webp" alt="サイクリングのアクティビティのツイートイメージ">}}

- ランニングの場合

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1674637159/NabeBlog/strava-activity-image2_vch71j.webp" alt="ランニングのアクティビティのツイートイメージ">}}

上記に似たようなことはIFTTTやZapierを使えば簡単にできます。実際に自分も以前まではそれらの自動化ツールを使っていました。しかしながら拡張性に乏しいため

- 走行ルートをGoogle Maps上に表示しようとするとGoogle Maps APIを使わないとムリ（っぽい）
- 走行距離の単位が何故かmだけ（10kmって表示してほしいのに10000mになる、みたいな）
- 取得可能なデータが少なく、消費カロリー等のデータにアクセスできない場合がある

といったことで多少なりともストレスがありました。「痒い所に手が届かない～；；」みたいな。

## 主な仕様

仕様は下の図の通り。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1669950365/NabeBlog/process-of-tweet-strava-activity_uvvxjg.webp" alt="image-of-prcessing">}}

### リアルタイムにアクティビティをツイートしない理由

Stravaさん、実はデフォでWebhookを発行する機能を備えています。公式ページは[こちら](https://developers.strava.com/docs/webhooks/)です。

なのでリアルタイムにアクティビティをツイートすることも可能なのですが、**残したくないアクティビティが含まれる可能性がある**ため実装を止めておきました。

割と「あるある」だと思うのですが、ミスって100mだけの超短距離アクティビティをアップロードしてしまったり、自宅が一発で分かるようなアクティビティをアップロードしてしまうことがありますw

さすがに自宅の住所を番地レベルで晒す勇気は無いのと、変なアクティビティは前もって消す余裕を持つために今回は上記の仕様で実装しました。

## 参考にした記事と技術的な話

参考にした記事は次の通りです。

{{<blogcard url="https://dev.classmethod.jp/articles/strava-api-introduction/">}}
{{<blogcard url="https://www.benlcollins.com/spreadsheets/strava-api-with-google-sheets/">}}

特にハマるポイントは無いかなと思いますし、あまり需要は無いと思いますがプログラム等について解説します。

~~最適化できていない部分もあるけど許してクレメンス~~

なお、もし実装される際は前もって以下のライブラリとサービスをGoogle Apps Scriptのエディタ側で有効にしておいてください。

- Oauth1
- Oauth2
- DocsServiceApp
- ImgApp
- Google Slide

ただし、走行マップ画像の編集などを行う必要が無い場合はOauth1とOauth2だけでも問題ありません。

### StravaとTwitterの認証関連のプログラム

Strava APIではOauth2.0を用いた認証が可能です。GAS側でOauth2のライブラリを追加して以下のプログラムでStrava上のデータへのアクセスを要求します。

```JavaScript
// OAuth2.0のトークンを生成し、認証画面のURLを表示
function confirmStravaUrl() {
  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperties({
    'CLIENT_ID': 'アカウントID',
    'CLIENT_SECRET': 'シークレット',
    'ACSSES_TOKEN': 'アクセストークン'
  });
  const service = getStravaService();
  if (!service.hasAccess()) {
    const authorizationUrl = service.getAuthorizationUrl();
    console.log("認証用URL:" + authorizationUrl);
  } else {
    console.log("OAuth2.0認証はすでに許可されています。");
  }
}

// Stravaサービスへのアクセスをリクエスト
function getStravaService() {
  const userProperties = PropertiesService.getUserProperties();
  const secretKey = userProperties.getProperty('CLIENT_SECRET');
  const userId = userProperties.getProperty('CLIENT_ID');
  return OAuth2.createService('Strava')
    .setAuthorizationBaseUrl('https://www.strava.com/oauth/authorize')
    .setTokenUrl('https://www.strava.com/oauth/token')
    .setClientId(userId)
    .setClientSecret(secretKey)
    .setCallbackFunction('stravaAuthCallback')
    .setPropertyStore(PropertiesService.getUserProperties())
    .setScope('activity:read');
}

// リクエスト後に実行される関数
function stravaAuthCallback(request) {
  var stravaService = getStravaService();
  var isAuthorized = stravaService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}
```

Twitter API側でも同様の処理を行います。今回用いた画像のアップロード用のAPIはOauth1しか対応していませんでしたので、Twitter APIではOauth1でのアクセス要求を行っています。

```JavaScript
// 環境変数の設定
const userProperties = PropertiesService.getUserProperties();
userProperties.setProperties({
  'TWITTER_API_KEY': 'APIキー',
  'TWITTER_API_SECRET': 'シークレット',
});
const serviceName = 'twitter';

// OAuth1.0のトークンを生成し、認証画面のURLを表示
function confirmTwitterAuthUrl() {
  const service = getTwitterService();
  if (!service.hasAccess()) {
    const authorizationUrl = service.authorize();
    console.log("認証用URL:" + authorizationUrl);
  } else {
    console.log("OAuth1.0認証はすでに許可されています。");
  }
}

// OAuth1.0の認証でTwitterにアクセスする関数
function getTwitterService() {
  const accessTokenUrl = "https://api.twitter.com/oauth/access_token";
  const requestTokenUrl = "https://api.twitter.com/oauth/request_token";
  const authorizationUrl = "https://api.twitter.com/oauth/authorize";
  const apiKey = userProperties.getProperty('TWITTER_API_KEY');
  const apiSecretKey = userProperties.getProperty('TWITTER_API_SECRET');
  return OAuth1.createService(serviceName)
    .setAccessTokenUrl(accessTokenUrl)
    .setRequestTokenUrl(requestTokenUrl)
    .setAuthorizationUrl(authorizationUrl)
    .setConsumerKey(apiKey)
    .setConsumerSecret(apiSecretKey)
    // 認証の確認後に実行するコールバック関数を指定
    .setCallbackFunction('twitterAuthCallback')
    // 生成したトークンを、GASのプロパティストアに保存（永続化）
    .setPropertyStore(PropertiesService.getUserProperties());
}

// 認証の確認後に表示する可否メッセージを指定する関数
function twitterAuthCallback(request) {
  const service = getTwitterService();
  const isAuthorized = service.handleCallback(request);

  if (isAuthorized) {
    return HtmlService.createHtmlOutput('認証が許可されました。');
  } else {
    return HtmlService.createHtmlOutput('認証が拒否されました。');
  }
}

// プロパティストアに保存したトークンをリセットする関数
// function clearService() {
//   OAuth1.createService(serviceName)
//     .setPropertyStore(PropertiesService.getUserProperties())
//     .reset();
// }
```

### メインのプログラム（ツイートを行う関数など）

ツイートを行うメインの関数ですが、以下の順番に処理しています。

1. 過去24時間に新規のアクティビティがあるか確認
1. 主要なデータの取り出し & 整形
1. 走行マップ画像データの作成
1. 画像だけ先にTwitter側へアップロードし、`media_id_string`を取得
1. `media_id_string`で画像を指定し、主要データと併せてツイート

プログラムは以下の通りです。

```JavaScript
function tweetActivitySummary() {
  const activities = callStravaActiities();
  if (activities.length > 0) {
    // CAUTION: 24時間以内のアクティビティが一件とは限らない
    activities.forEach(activity => {

      // `distance`が`null`と`undefined`の時にはこれ以上の処理を行わない
      let distance = activity.distance;
      if (distance === null || distance === undefined) {
        return
      }

      // 単位を時間、分、秒、mに変換する
      activity.distance = (activity.distance) * (0.001);  // kmに変換
      activity.distance = Math.round(activity.distance * 100) / 100;  // 小数点以下2桁まで表示
      distance = activity.distance;
      const hour = Math.floor(activity.moving_time / 3600);
      const min = Math.floor(activity.moving_time % 3600 / 60);
      const rem = activity.moving_time % 60;
      if (hour > 0) {
        activity.moving_time = hour + 'h ' + min + 'min ' + rem + 'sec';
      } else {
        activity.moving_time = min + 'min ' + rem + 'sec';
      }

      // 最長距離および最高獲得標高を更新したかどうかを確認し，更新も行う
      // 返り値にはどの値を更新したかが記される
      const elevationGain = activity.total_elevation_gain;
      statusMessage = updatePersonalStravaStats(distance, elevationGain, activity.type);

      // 平均速度をマイルからkmに変換
      activity.average_speed = activity.average_speed * 3.6;
      activity.average_speed = Math.round(activity.average_speed * 100) / 100;

      const polyline = activity.map.summary_polyline;

      // polylineを元に地図画像を生成
      let imageBlob = createMapImage(polyline)
      imageBlob = addStravaLogo(imageBlob);

      // Twitterへ画像をアップロードしてその画像のIDを取得
      const mediaId = obtainTwitterMediaId(imageBlob);

      tweetWithImage(activity, mediaId, statusMessage);
    })
  }
}

// 画像をTwitter側へアップロード
function obtainTwitterMediaId(image) {
  const uploadUrl = 'https://upload.twitter.com/1.1/media/upload.json';

  // ファイルのデータをbase64形式に変換
  const convertedImage = Utilities.base64Encode(image.getBytes());
  const img_option = { 'method': 'POST', 'payload': { 'media': convertedImage } };
  const result = makeRequest(uploadUrl, img_option);
  const mediaId = result.media_id_string;
  return mediaId
}

// 文章と画像をツイートする関数
// CAUTION: 画像を添付するにはmedia IDを取得するためにAPI v1.1を使ってそれをv2のツイート機能に渡す
function tweetWithImage(activityData, imageId, statusMessage) {
  let textTweeted = `Completed a ${activityData.type} w/ @Strava !
  Time: ${activityData.moving_time}
  Dist: ${statusMessage.updateDistance ? activityData.distance + ` km <= Longest ${activityData.type}🎉` : activityData.distance + " km"}
  Elev Gain: ${statusMessage.updateElevGain ? activityData.total_elevation_gain + " m <= Highest Gain🎉" : activityData.total_elevation_gain + " m"}
  Avg: ${activityData.average_speed} km/h`;

  // Personal Recordがある場合に文章を追加
  if (activityData.pr_count) {
    textTweeted += `\n  🎉New PR: ${activityData.pr_count}🎉`
  }

  console.log(`This text is tweeted.\n ${textTweeted}`)

  // ツイートするAPIリクエスト
  const url = "https://api.twitter.com/2/tweets";
  const payload = {
    "text": textTweeted,
    "media": { "media_ids": [imageId] }
  };
  const options = {
    'method': 'post',
    'payload': JSON.stringify(payload),
    'contentType': 'application/json',
    'muteHttpExceptions': true
  };
  makeRequest(url, options);
}

// API リクエストを送信するための関数
function makeRequest(url, options) {
  try {
    const service = getTwitterService();
    const res = service.fetch(url, options);
    const result = JSON.parse(res.getContentText());
    console.log(`This is the result of request. \n${JSON.stringify(result)}`);
    return result
  }
  catch (error) {
    console.error(`${error}\nrequest failed`)
  }
}
```

### Strava上のデータを呼び出す関数

メインの関数で呼ばれている`callStravaActiities`関数についてです。過去24時間のStrava上のデータを呼び出します。なお、Strava側でのタイムスタンプはミリ秒ではなく秒で扱われているため注意してください。

```JavaScript
// 24時間前までのStravaデータの呼び出し
function callStravaActiities() {
  const service = getStravaService();
  if (service.hasAccess()) {

    // CAUTION: Strava側ではミリ秒ではなく秒でしか扱えない
    const timeStamp = (Date.now() - 24 * 3600 * 1000) / 1000;
    const endpoint = 'https://www.strava.com/api/v3/athlete/activities';
    const params = `?after=${timeStamp}`;

    const headers = {
      Authorization: 'Bearer ' + service.getAccessToken()
    };
    const options = {
      headers: headers,
      method: 'GET',
      muteHttpExceptions: true
    };
    const response = JSON.parse(UrlFetchApp.fetch(endpoint + params, options));
    if (response.length < 1) {
      console.log('過去24時間にアクティビティがありませんでした．')
    } else {
      console.log(`該当するアクティビティがあります．\n${response}`)
    }
    return response
  }
  else {
    Logger.log('Stravaへのアクセスが認可されていません。');
    const authorizationUrl = service.getAuthorizationUrl();
    Logger.log('次のURLを開いたのち、スクリプトを再度実行してください。: %s',
      authorizationUrl);
  }
}
```

### 走行ルートのマップ画像を生成する関数

メインの関数で呼び出されている`createMapImage`関数です。

`setPathStyle`でルートの色の設定を行えるはず、と思ったのですが何故かできず困ってます；；そのうち対応させます。

```JavaScript
function createMapImage(polyline) {
  let map = Maps.newStaticMap().addPath(polyline);

  // Mapを設定しpngで取得
  // Reference: https://developers.google.com/apps-script/reference/maps
  map.setSize(1600, 800)
    .setLanguage('ja')
    .setPathStyle(5, Maps.StaticMap.Color.RED, Maps.StaticMap.Color.RED)
    .setFormat(Maps.StaticMap.Format.PNG)

  // getMapImageで画像をバイト列に変換
  return Utilities.newBlob(map.getMapImage(), 'image/png', 'map.png')
}
```

### 走行ルートのマップ画像にStravaのロゴなどを入れる関数

Strava APIの利用規約を読んだところ、Strava APIを使ったいかなるアプリケーションにおいて、配布可能なメディアにはStrava APIを使ったことが分かるように特定の語句や画像を挿入する必要があるそうです。

以下引用です[^1]。

> All apps must display the “Powered by Strava” logo or “Compatible with Strava” logo on all websites, apps and any distributable media such as images, videos or prints. No variations or modifications are acceptable.

今回はがっつりTwitterに走行データや走行マップ画像を投稿するので、走行マップの隅っこにpowered by Stravaの画像を一応追加しています。

Stravaのロゴなどの画像はGoogleドライブ上に保存しています。

```JavaScript
// マップ画像にStravaのロゴを入れる
function addStravaLogo(mapImageBlob) {
  // 1. Retrieve the image size using ImgApp.
  const size = ImgApp.getSize(mapImageBlob);

  // 2. Create new Google Slides with the custom page size using DocsServiceApp.
  const slideProperty = {
    title: "走行マップ画像用のスライド", // Title of created Slides.
    width: { unit: "pixel", size: size.width },
    height: { unit: "pixel", size: size.height },
  };
  const presentationId = DocsServiceApp.createNewSlidesWithPageSize(slideProperty);

  // 3. Put the image and text.
  const slide = SlidesApp.openById(presentationId);
  const page = slide.getSlides()[0];
  page.insertImage(mapImageBlob);
  const logoId = 'Googleドライブ上の画像ファイルのID';
  const logo = DriveApp.getFileById(logoId);
  const logoBlob = logo.getBlob();
  const position = { left: 28, top: 520.9 };
  const logoImageSize = { width: 202, height: 87 };
  page.insertImage(logoBlob, position.left, position.top, logoImageSize.width, logoImageSize.height);
  const objectList = page.getPageElements();
  page.group(objectList);
  slide.saveAndClose();

  // LARGE = 1600 px
  const obj = Slides.Presentations.Pages.getThumbnail(
    presentationId,
    page.getObjectId(),
    {
      "thumbnailProperties.thumbnailSize": "LARGE",
      "thumbnailProperties.mimeType": "PNG",
    }
  );
  const url = obj.contentUrl.replace(/=s\d+/, "=s" + size.width);
  const resultImageBlob = UrlFetchApp.fetch(url)
    .getBlob()
    .setName("Result_map.png");
  DriveApp.getFileById(presentationId).setTrashed(true);
  return resultImageBlob
}
```

一つだけ問題があるのですが、上記のプログラムでは画像が最大1600ピクセルにしかならず、結構解像度が低くなっちゃうかもです。多分もっと良い方法があると思うのですが今回はとりまこれで行きます。

### パーソナルレコードなどの更新を記録する関数

せっかくなのでパーソナルレコードの更新が入った時と最長走行距離が更新された時に特別な文言をツイートできるようにします。

以下のプログラムの`retMessage`をフラグとしており、フラグの`true` or `false`で更新の有無を確認しています。

```JavaScript
function updatePersonalStravaStats(distance, gain, type) {
  let retMessage = {
    'updateDistance': false,
    'updateElevGain': false
  };
  let longestDistance = '';
  let highestGain = '';
  const userProperties = PropertiesService.getUserProperties();
  switch (type) {
    case 'Ride':
      longestDistance = userProperties.getProperty('longestRide');
      highestGain = userProperties.getProperty('biggestElevGain');
      longestDistance = Number(longestDistance);
      highestGain = Number(highestGain);
      if (distance > longestDistance) {
        console.log(`最長${type}の更新がありました．`)
        distance = String(distance);
        userProperties.setProperties({
          'longestRide': distance
        });
        retMessage.updateDistance = true;
      }
      if (gain > highestGain) {
        console.log(`${type}で最高獲得標高の更新がありました．`)
        gain = String(gain);
        userProperties.setProperties({
          'biggestElevGain': gain
        });
        retMessage.updateElevGain = true;
      }
      break;
    case 'Run':
      longestDistance = userProperties.getProperty('longestRun');
      highestGain = userProperties.getProperty('highestRunElevGain');
      longestDistance = Number(longestDistance);
      highestGain = Number(highestGain);
      if (distance > longestDistance) {
        console.log(`最長${type}の更新がありました．`)
        distance = String(distance);
        userProperties.setProperties({
          'longestRun': distance
        });
        retMessage.updateDistance = true;
      }
      if (gain > highestGain) {
        console.log(`${type}で最高獲得標高の更新がありました．`)
        gain = String(gain);
        userProperties.setProperties({
          'highestRunElevGain': gain
        });
        retMessage.updateElevGain = true;
      }
      break;
    default:
      break;
  }
  console.log(retMessage)
  return retMessage
}

// 手動でプロパティを変更，設定する場合に実行
// 普段はコメントアウト
// function updateStravaStatsManually() {
//   const userProperties = PropertiesService.getUserProperties();
//   userProperties.setProperties({
//     'longestRide': '最長ライドの距離',
//     'biggestElevGain': 'ライドでの最高獲得標高',
//     'longestRun': '最長ランニング',
//     'highestRunElevGain': 'ランニング時の最高獲得標高',
//   });
//   console.log('Strava側の最高データをGASプロパティに上書きしました．')
// }
```

我ながらひどいコードを書いたもんだ…

あとはGAS側の関数実行のトリガーを自由に設定してあげれば良いだけですね。

## 最後に

思わぬ副産物だったのですが、[Strava公式アカウント](https://twitter.com/Strava)にメンションしてたら毎回いいねを付けてもらえるようになりました。「見てるよ～ / 応援してるよ～」って感じの反応を貰えると嬉しいですね。

もし良ければ[Strava](https://www.strava.com/athletes/25375006)か[Twitter](https://twitter.com/n_a_b_e_t_a_s_o)でもフォローしてもらえるとトレーニングの励みになります。それでは良きトレーニングライフを～！

[^1]: [ソース](https://developers.strava.com/guidelines/)
