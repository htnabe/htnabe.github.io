---
title: "[TypeScript] Example: Getting Object Literal Values from Strings and Numbers"
date: 2024-03-07T21:49:20+09:00
draft: false
tags: [TypeScript]
categories: [Tech]
show_date: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1709909393/tech/tech-logos/ts-icon_nr2gbf.svg"
---

Skipping the preamble — here are the code examples first.

## Example: Getting a Value from a String

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

### Example: Getting a Value from a Number

Consider the same `Status` object as before.

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

## Why I Wrote This Article

String enums in TypeScript — something every TypeScript user will encounter eventually.

{{<blogcard url="https://typescriptbook.jp/reference/values-types-variables/enum/enum-problems-and-alternatives-to-enums">}}

When dealing with them, many developers use union types or object literals, as introduced on the page above (I do the same at work).

There are cases where you want to map the properties of such an object literal to strings displayed in the UI, or to numeric values returned from a Web API request.

One straightforward approach is to use a switch statement to map the corresponding strings or numbers, like this:

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

This may work fine in some cases, but you can easily imagine how maintainability goes :shit: & :shit: as more properties are added to `Status`. I simply wanted to avoid that.

### Bonus

Depending on the program's specification, providing a fallback like `invalid` can feel slightly unsatisfying.

However, with this implementation, you can handle Web API responses that "should always return a known value, but occasionally return something unexpected" — as an accidental bonus.

For example, the `/api/cat/meme` endpoint is supposed to return only `ﾊｯﾋﾟｰﾊｯﾋﾟｰ` or `ﾁﾋﾟﾁﾋﾟﾁｬﾊﾟﾁｬﾊﾟ`, but (for reasons) sometimes returns `ﾊｧ?` — this implementation handles such cases without throwing an error.

- The TypeScript icon was sourced from [here](https://skillicons.dev).

[Update] 2024/5/31: Fixed an error in the logic for getting values from strings.
