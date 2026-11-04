---
title: "【TypeScript】文字列と数値からオブジェクト型リテラルの値を取得する例"
date: 2024-03-07T21:49:20+09:00
draft: false
tags: [TypeScript]
categories: [Tech]
show_date: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1709909393/tech/tech-logos/ts-icon_nr2gbf.svg"
---

前置きは置いておいて先にプログラムの例を以下に示す。

## 文字列から取り出す例

```
// enumの代わりにオブジェクトリテラルで変数を定義
const Status = {
    invalid : -1,
    good : 0,
    bad : 1,
} as const;

/** Statusのプロパティの文字列を指定して値を取得する */
function getStatusFromString(statusStr: string): number{
    const status:string[] = Object.keys(Status);
    if(status.includes(statusStr)){
        return Status[statusStr as keyof typeof Status];
    }
    return Status.invalid;
}

// 例
const goodStatus= getStatusFromString("good");
const invalidStatus = getStatusFromString("xxxx");

console.log(`typeof goodStatus: ${typeof goodStatus}. value: ${goodStatus}`);
console.log(`typeof invalidStatus: ${typeof invalidStatus}. value: ${invalidStatus}`);

// typeof goodStatus: number. value: 0
// typeof invalidStatus: number. value: -1
```

### 数値から取り出す例

先ほどと同様に`Status`について考える。

```
const Status = {
    invalid : -1,
    good : 0,
    bad : 1,
} as const;

/** 数値を指定してStatusのプロパティ名を取得する */
function getEnumKeyFromValue<T extends number>(statusNum: T): string{
    const keys: string[] = Object.keys(Status);
    const result: string | undefined = keys.find(key => Status[key] === statusNum)
    return result === undefined ? keys[0] : result
}

// 例
const goodStatus= getEnumKeyFromValue(0);
const invalidStatus = getEnumKeyFromValue(1111);

console.log(`Typeof goodStatus: ${typeof goodStatus}. value: ${goodStatus}`);
console.log(`Typeof invalidStatus: ${typeof invalidStatus}. value: ${invalidStatus}`);
// Typeof goodStatus: string. value: good
// Typeof invalidStatus: string. value: invalid
```

## 何でこの記事を書いたの？

TypeScriptを使っている方なら誰しもが通るであろうTSでの文字列列挙型。

{{<blogcard url="https://typescriptbook.jp/reference/values-types-variables/enum/enum-problems-and-alternatives-to-enums">}}

これを扱う際に上記のページでも紹介されているようにユニオン型やオブジェクトリテラルを使うことが多いと思う（実際に自分も仕事ではそうしている）。

このオブジェクト型リテラルのプロパティそのものをUI上に表示する文字列と紐づけたい場合や、Web APIリクエストで取得した数値と紐づけたい場合がある。

そういった例に対応する場合、単純に対応する文字列や数値をswitch文で指定する場合もあると思う。例えば↓のような感じとか。

```
function getStatusWordFromValue(value: number): string{
  switch (value) {
    case Status.bad:
      return "bad";
    case Status.good:
      return "good";
    default:
      return "invalid"
  }
}
```

これで問題ない場合もあると思うのだが、今後この`Status`のプロパティが増えていったときに保守性が:shit: & :shit:になることを容易に想像できると思う。単にそれを避けたかった。

### おまけ

プログラムの仕様にも依るだろうけど、`invalid`みたいなステータスを用意するのはﾁｮｯﾄ不服ではある。

ただ、今回みたいな実装をすると、「基本的には値が決まっているはずだけど、たまに予期しない値が返ってくる」みたいなWeb APIリクエストにも対応できる（というかできてしまう）

例えば`/api/cat/meme`エンドポイントからは、原則`ﾊｯﾋﾟｰﾊｯﾋﾟｰ`か`ﾁﾋﾟﾁﾋﾟﾁｬﾊﾟﾁｬﾊﾟ`の文字列しか返ってこないはずだけど（大人の事情で）たまに`ﾊｧ?`が返ってきてしまう、みたいな場合にもプログラム上はエラーを出さずに対応できる。

※TypeScriptのアイコンは[ここ](https://skillicons.dev)から取得

【追記】2024/5/31: 文字列から求める処理に誤りがあったため修正
