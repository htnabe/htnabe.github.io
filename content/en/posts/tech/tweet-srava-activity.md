---
title: "Auto-Tweeting Strava Activities Using the Strava API"
date: 2022-12-02T11:47:09+09:00
draft: false
tags: [Strava API, Twitter API, Google Apps Script]
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1670325438/NabeBlog/strava_post_thumbnail_jbviy5.webp"
categories: [Tech]
show_date: true
toc: true
---

Update: I deleted my Twitter account on January 25, 2023. This has no effect on the content of this article.

## Goal and Motivation

Automatically tweet cycling and running data on a schedule, as shown below.

- Cycling

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1670325438/NabeBlog/strava_post_thumbnail_jbviy5.webp" alt="サイクリングのアクティビティのツイートイメージ">}}

- Running

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1674637159/NabeBlog/strava-activity-image2_vch71j.webp" alt="ランニングのアクティビティのツイートイメージ">}}

Similar things can be done easily with IFTTT or Zapier, and I actually used those automation tools previously. However, due to their limited flexibility:

- Displaying the route on Google Maps seems to require using the Google Maps API directly
- The distance unit is somehow only meters (I want 10 km to display as 10 km, not 10000 m)
- Limited data is available, and fields like calorie burn may not be accessible

...these were small but persistent frustrations — the kind where you just can't quite scratch the itch.

## Main Specification

The specification is as shown in the diagram below.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1669950365/NabeBlog/process-of-tweet-strava-activity_uvvxjg.webp" alt="image-of-prcessing">}}

### Why I Don't Tweet Activities in Real Time

Strava actually has a built-in webhook capability by default. The official page is [here](https://developers.strava.com/docs/webhooks/).

So tweeting activities in real time is technically possible, but I chose not to implement it because **there may be activities I don't want to share**.

I think this is a pretty common scenario — accidentally uploading a 100m micro-activity, or uploading one that reveals your exact home location lol.

Since I don't have the nerve to expose my home address at the street-number level, and I want the ability to delete odd activities beforehand, I went with the above specification.

## Reference Articles and Technical Details

The articles I referenced are as follows:

{{<blogcard url="https://dev.classmethod.jp/articles/strava-api-introduction/">}}
{{<blogcard url="https://www.benlcollins.com/spreadsheets/strava-api-with-google-sheets/">}}

I don't think there are any particularly tricky points, and I imagine this won't be widely needed, but I will explain the code anyway.

~~Some parts are unoptimized, but please forgive me~~

If you implement this, make sure to enable the following libraries and services in the Google Apps Script editor beforehand:

- Oauth1
- Oauth2
- DocsServiceApp
- ImgApp
- Google Slide

However, if you do not need to edit the map image, Oauth1 and Oauth2 alone will suffice.

### Authentication Code for Strava and Twitter

The Strava API supports authentication via OAuth 2.0. After adding the OAuth2 library to GAS, use the following code to request access to Strava data.

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

The same process is done for the Twitter API. Since the image upload API used here only supports OAuth 1.0, the Twitter API authentication uses OAuth1.

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

### Main Program (Tweet Function, etc.)

The main tweet function processes in the following order:

1. Check if there are new activities in the past 24 hours
1. Extract and format the key data
1. Generate the route map image
1. Upload only the image to Twitter first to obtain the `media_id_string`
1. Specify the image with `media_id_string` and tweet it along with the key data

The code is as follows:

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

### Function to Fetch Strava Data

This is the `callStravaActivities` function called by the main function. It fetches Strava data from the past 24 hours. Note that Strava timestamps are in seconds, not milliseconds.

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

### Function to Generate the Route Map Image

This is the `createMapImage` function called by the main function.

I thought `setPathStyle` could be used to set the route color, but for some reason I could not get it to work — I'll address this eventually.

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

### Function to Overlay the Strava Logo on the Map Image

Reading the Strava API terms of service, any application using the Strava API must include specific text or imagery in all distributable media to indicate that it uses the Strava API.

The following is a quote[^1]:

> All apps must display the "Powered by Strava" logo or "Compatible with Strava" logo on all websites, apps and any distributable media such as images, videos or prints. No variations or modifications are acceptable.

Since I am posting ride data and map images directly to Twitter, I am adding a "Powered by Strava" image to the corner of the map.

The Strava logo and related images are stored in Google Drive.

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

One issue is that the program above caps the image at 1600 pixels, which may result in fairly low resolution. There is probably a better approach, but this will do for now.

### Function to Record Personal Record Updates

I also wanted to tweet a special message when a personal record or longest distance is updated.

The `retMessage` variable in the following code acts as a flag, using `true` or `false` to indicate whether a record was updated.

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

Even I cringe at how bad this code is...

All that's left is to set up the GAS trigger to run the function on a schedule.

## Closing

An unexpected perk was that mentioning the [official Strava account](https://twitter.com/Strava) got me a like every time. Getting that kind of "we see you / we're cheering you on" response is really motivating.

If you're interested, following me on [Strava](https://www.strava.com/athletes/25375006) or [Twitter](https://twitter.com/n_a_b_e_t_a_s_o) would be a great motivation for my training. Have a great training life!

[^1]: [Source](https://developers.strava.com/guidelines/)
