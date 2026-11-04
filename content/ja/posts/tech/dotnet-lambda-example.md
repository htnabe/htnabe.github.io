---
title: "ASP.NET Core Web API を AWS Lambdaでストレスなく動かす"
date: 2025-11-22T05:51:30Z
draft: true
show_date: true
toc: true
tags: [C#, ASP.NET Core, Web API, AWS, Lambda]
categories: [Tech]
thumbnail: ""
---

## はじめに

- 想定読者
  - C#でWeb APIをサーバーレスアーキテクチャで開発してみたい方
  - Lambda関数のデプロイ、結合試験に失敗するのにうんざりな方
- 結論
  - AWS Lambda上でASP.NET Core Web APIの動作が可能
  - Lambda関数用にリファクタせずに、サーバーありきなWeb APIサーバーの書き方で実装が可能です

Lambda関数を実装する際に、API GWでのルーティングと関数の処理内容を一括して扱えるようになると熱いですよね（個人の意見）！

AWS Lambda上でC# Web APIを動かす公式手順や記事はありますが、使い勝手については自分でいろいろ試した方が良いかと思って記事にまとめました。

参考：

{{<blogcard url="https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/lambda-csharp.html">}}

なお、現状Lambda上で動くASP.NETアプリケーションを作り始めるには次の選択肢があると思います（抜けがあるかもですが）。

- ASP.NET Core Web APIサーバーアプリで始めてLambda Web Adapterにデプロイ
  - コンテナサイズや実行時間の制限があるものの、一番楽そうに見える
    - 実際に運用したことがないのでデメリットについてはエアプ
- `dotnet new lambda.EmptyFunction` コマンドで始める
  - 特に言うことがない
- `dotnet new serverless.AspNetCoreWebAPI` コマンドで始める :point_left: 今回はこれを試した
  - 特定のアプリからしかアクセスされないようなサーバーを作るならこれが一番楽だと思います

## AWS LambdaでWeb APIを動かす基本概念

- LambdaでWeb APIを動かす仕組み
- Lambda Web Adapterの役割
- ASP.NET CoreアプリケーションとLambdaの接続方法

## 開発環境の準備

- .NET SDKのインストール
- Visual StudioまたはVS Codeの設定
- AWS CLIおよびAWS Toolkitの準備

## ASP.NET Core Web APIプロジェクトの作成

- `dotnet new webapi`によるプロジェクト生成
- 必要なパッケージの追加
- Web Adapterの導入と設定

## Lambda用にビルドとパッケージング

- Lambdaターゲットへのビルド手順
- 必要な設定ファイルやプロジェクト変更のポイント
- デプロイ用アーカイブ作成の流れ

## デプロイと動作確認

- AWS CLIまたはAWS Management Consoleを使ったデプロイ
- API Gatewayとの連携設定
- PostmanなどでHTTPリクエストによる動作確認
- CloudWatch Logsでのログ確認

## 運用・Tips

- デプロイ後のトラブルシューティング
- パフォーマンス改善のポイント
- Lambdaでのバージョン管理とステージング

## まとめ

- AWS Lambda上でC# Web APIを動作させる基本手順の整理
- 次のステップとして本番環境デプロイやCI/CD自動化の検討
