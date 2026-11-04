---
title: "【OpenAPI】TypeScript+ReactとASP.NET Web API間でデータをやり取りする"
date: 2023-12-16T10:36:35+09:00
draft: false
tags: [OpenAPI, OpenAPI Generator, TypeScript, React, .NET, Web API, C#]
categories: [Tech]
show_date: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1709292863/NabeBlog/%E6%A7%8B%E6%88%90%E5%9B%B3_jawmcl.webp"
---

## はじめに

[TypeScriptアドベントカレンダー](https://qiita.com/advent-calendar/2023/typescript)24日目の記事です。残念ながらTypeScriptの要素は2割くらいしかありません（すまん）。

この記事では、ローカル環境でTS + Reactで作ったフロントエンドとASP.NETで作ったバックエンド間のデータのやり取りをする例を紹介します。デプロイ先についての検討や各資源の管理方法については述べません。

現実的な例で言うと、「C#で書かれた既存のWeb APIサーバーを使って新たにWebアプリを作りたいけど、フロントサイドの技術者がTS/JSしか使えないとき」みたいな感じでしょうか。稀によくある（無い）。

### 完成形

↓のようにボタン押下時にリクエストを送り、戻ってきたデータをそのまま表示します。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1703506543/NabeBlog/try-movie_l0olvj.gif" alt="試作品">}}

構成は次の通りシンプルです[^1]。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1709292863/NabeBlog/%E6%A7%8B%E6%88%90%E5%9B%B3_jawmcl.webp" alt="構成">}}

実際のプログラムなどは↓のレポジトリで公開しています（また、開発環境は`devcontainer`で公開しています）。

{{<blogcard url="https://github.com/htnabe/OpenAPI-React-TypeScript-.NET-Example">}}

### 最終的なディレクトリ構成

```
root
┣ /front
┃ ┗ /openAPI
┗ /webAPI
```

今回は特にDockerも使うことなく、Windows11上にプロジェクトを作りました。自動生成されるインターフェイスを含むフォルダを`/openAPI`と名付けています。

今回適当なディレクトリ構成にしていますが、Gitで管理されている場合は`openAPI`フォルダ自体をsubmoduleとして導入することになるんじゃないかと思います。モノレポにして運用する方法もあるかと思いますが、その辺りはまあ皆さんのチームの状況を踏まえて決めればよいと思います（適当）（要するにケースバイケース）。

## 手順

### Web APIのプロジェクトを作成

powershellでもコマンドプロンプトでも何でも良いのですが、`dotnet`コマンドを打てるターミナルを用意してください。次のコマンドで localhost:1234/weatherForecast のようなエンドポイントを持つAPIを作れます。出力先フォルダ名はwebapiとします。

```
dotnet new webapi -o webapi
```

生成された`Program.cs`を見てみると、次のように`weatherForecast`APIが自動生成されているのが分かります。今回はこのエンドポイントをそのまま使います。

```
app.MapGet("/weatherforecast", () =>
{
  var forecast = Enumerable.Range(1, 5).Select(index =>
      new WeatherForecast
      (
          DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
          Random.Shared.Next(-20, 55),
          summaries[Random.Shared.Next(summaries.Length)]
      ))
      .ToArray();
  return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

...省略

// NOTE: ご丁寧にrecordで定義してくれている
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
  public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
```

:warning: ここでNugetの参照先がMicrosoft Visual Studio Offline Packages になっていると、パッケージが見つからない旨のエラーが出ます。エラーが出た場合は、onlineのパッケージをグローバルで参照するように次のコマンドで変更してください。[^2]

```
dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
```

### OpenAPIスキーマファイルの生成

.NETのWeb APIプロジェクトでは、コードやスキーマファイルの自動生成用ライブラリとして`Swashbuckle`や`NSwag`が主に用いられています。Miscrosoftの公式ドキュメントでもこれら二つが取り上げられています。

{{<blogcard url="https://learn.microsoft.com/ja-jp/aspnet/core/tutorials/getting-started-with-nswag?view=aspnetcore-8.0&tabs=visual-studio-code">}}

今回は近年主流になっている`NSwag`を使ってスキーマファイルを生成します。詳細は上記のドキュメントを読んでください。

まず`NSwag`を追加します。

```
dotnet add package NSwag.AspNetCore
```

次の呪文を追加します。

```
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApiDocument(); // ここを追加

... 省略

if (app.Environment.IsDevelopment())
{
    // Add OpenAPI 3.0 document serving middleware
    // Available at: http://localhost:<port>/swagger/v1/swagger.json
    app.UseOpenApi(); // ここを追加

    // Add web UIs to interact with the document
    // Available at: http://localhost:<port>/swagger
    app.UseSwaggerUi();  // ここを追加
}

```

サーバーのポート番号を指定するには`Properties/launchi.json`のapplicationUrlを編集します。今回は適当に5200番にしておきました。

```
"applicationUrl": "http://localhost:5200",
```

この状態で、`dotnet run`コマンドでサーバーを起動します。`localhost:5200/swagger`に移ると、↓のようにSwagger UIが表示されると思います。
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1707572633/NabeBlog/NSwag_swagger_page_gosykr.png" alt="Swagger UI" caption="Swagger UI">}}

上記で上手くいかない場合は↓の記事を参照してください。

- https://learn.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-8.0&tabs=visual-studio-code

先ほどの図中に表示されていた、「/swagger/v1/swagger.json」の部分をクリックすると、自動生成されたjsonファイル（OpenAPIのスキーマファイル）の中身を見ることができます。そのjsonファイルを保存しておいてください。

### スキーマファイルの自動生成について（WIP）

.NET Core Web APIのプロジェクトでは、`NSwag.MSBuild`を使うことでプロジェクトのビルド時などにOpenAPIのスキーマファイルを自動生成することが可能です。下記の記事でも説明されているような方法を取ることで、ローカル側にスキーマファイルを自動生成することができます。

- [ASP.NET Core Web API と NSwag を使って OpenAPI 定義を自動生成する](https://blog.shibayan.jp/entry/2020/05/19/173429)

`NSwag.MSBuild`のドキュメントは[こちら](https://github.com/RicoSuter/NSwag/wiki/NSwag.MSBuild)。

しかしながら2024/2月現在、NSwag.MSBuildの最新バージョン`14.0.3`では.NET 8.0環境（恐らく7.0でも）でCLIに不具合が生じており、この機能を使うことができません（少なくとも私の環境では）。恐らく`14.1`以上のバージョンからは修正されると思いますので、修正されたらこの記事でも対応しようと思います。

詳細は↓のissueに上がっています。

{{<blogcard url="https://github.com/RicoSuter/NSwag/issues/4678">}}

### Reactアプリの作成

`Vite`を使ってちゃちゃっと動くアプリを作成します。`npm`コマンドが動く状態で、以下のコマンドでReactアプリを作成・動作確認します。今回フォルダ名は`front`としました。

```
npm create vite@latest
cd front
npm install
npm run dev
```

アプリの実行先のURLに飛ぶと次のような画面が表示されます。

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702995602/NabeBlog/%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D_bnbkqz.webp" alt="動作確認" caption="動作確認">}}

確認出来たら`src`フォルダ内の`App.tsx`を↓の様にまっさらにしておきます。

```
import "./App.css";

function App() {
  return <></>;
}

export default App;
```

### OpenAPI Generatorでプログラムを自動生成

今回は数あるコードジェネレータの中でも老舗の[OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator)を使います。次のコマンドでDevDependencyとしてインストールします。

```
npm install @openapitools/openapi-generator-cli -D
```

`front`（Reactのフォルダ）内の`src`フォルダ内に`openapi`フォルダを作成し、フォルダ内に移動します。

```
cd ./front/src && mkdir openapi && cd openapi
```

ここはどのような方法でも構いませんが、先ほどダウンロードしておいた`swagger.json`を、作成した`openapi`フォルダに移動させておきます。

```
mv path/to/swagger.json ./
```

`openapi`フォルダ内で`swagger.json`を元にTypeScript + axiosに見合ったAPIリクエスト用のプログラムを生成させます。次のコマンドを実行してけれ。

```
npx @openapitools/openapi-generator-cli generate -i swagger.json -g typescript-axios
```

上手くいけば幾つかファイルが生成されると思います。ひとまずTypeScriptのファイルだけが重要なので他のファイルは無視してください。生成されたプログラムはChatGPTに読ませれば使い方とか全て説明してくれると思うので、この記事では説明しません。

### リクエスト送ってみるﾝｺﾞ！

`api.ts`で定義されている次の関数を使ってリクエストを送ってみます。

```
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWeatherForecast(options?: any): AxiosPromise<Array<WeatherForecast>> {
            return localVarFp.getWeatherForecast(options).then((request) => request(axios, basePath));
        },
    };
};
```

この関数を使って↓みたいな書き方でレスポンスを得られる事が分かります。

```
const response = DefaultApiFactory().getWeatherForecast()
```

あとAPIサーバー側でCORSの設定も忘れていたので以下の様に追加しました。`アプリのポート番号`の部分を実際のポート番号に書き換えてください。

- 「CORSって何？」っていう方は[こちら](https://javascript.keicode.com/newjs/what-is-cors.php)
- ASP.NET Web APIでのCORSの設定の詳細は[こちら](https://learn.microsoft.com/ja-jp/aspnet/core/security/cors?view=aspnetcore-8.0)

```
// CORSの設定を追加
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
   policy =>
   {
     policy.WithOrigins("http://localhost:Reactアプリのポート番号").AllowAnyHeader().AllowAnyMethod();
   });
});

... 略

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

// ここも必要
app.UseCors(MyAllowSpecificOrigins);
```

ということで、最終的に以下のようなコードでリクエストを送信・データの表示を行えるようになりました:tada:

```
// 最終的なフロント側のコード

import { useState } from "react";
import "./App.css";
import { DefaultApiFactory, WeatherForecast } from "./../openapi/api";

function App() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const fetchData = async () => {
    try {
      const response = await DefaultApiFactory().getWeatherForecast();
      setForecasts(response.data);
    } catch (error) {
      console.log(`Featching data failed. ${error}`);
    }
  };

  return (
    <>
      <button onClick={() => fetchData()}>リクエストするﾝｺﾞ～</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature</th>
            <th>TemperatureF</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast, index) => {
            // なぜかforecast.Date等がundefinedになってしまう謎
            // 仕方なく各値を取り出している
            const [date, tempC, tempF, summary] = Object.values(forecast);
            return (
              <tr key={index}>
                <td>{date}</td>
                <td>{tempC}</td>
                <td>{tempF}</td>
                <td>{summary}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
```

~~`forecast.data`等のプロパティの値がundefinedになってしまう謎に出会ってしまったため、仕方なく`Object.values`メソッドでお茶を濁しました。本当に分からん。教えてえろい人。~~

- ASP.NET Core のデフォルトの JSON シリアライザーである `System.Text.Json` の命名規則によって自動的にcamelCaseに書き換えられていたようです
  - これを回避するには、例えばC#側でNewtonsoft.JsonのPropertyName属性を使ってよしなにプロパティとjsonデータを紐づける方法があります（今回の記事の主役ではないので割愛）

とりまこれでうまく動きました。めでたし。

## まとめなんてない

- 巨人（OpenAPI Generator）の型に乗って行け
- APIサーバー側でトークンベースのユーザー認証を付けた時とか、送受信するデータの検証を行うようなときにどんなプログラムが生成されるのか、たわし気になります！

[^1]: 画像参照元：[ここ](https://commons.wikimedia.org/wiki/File:.NET_Core_Logo.svg)と[ここ](https://ja.m.wikipedia.org/wiki/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:React-icon.svg)

[^2]: 参考にしたのは[ここ](https://learn.microsoft.com/ja-jp/dotnet/core/tools/dotnet-nuget-add-source)と[ここ](https://rksoftware.hatenablog.com/entry/2021/12/06/010852)
