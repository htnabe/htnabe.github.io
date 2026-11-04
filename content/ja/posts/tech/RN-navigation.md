---
title: "【React Native】useNavigationで画面遷移情報を外部から参照する方法"
date: 2021-10-31T01:23:43+09:00
tags: [React Native, React Navigation, Expo, React Navigation]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

## 実現したいこと

今回は下記のようなディレクトリ構成を考え、 `FirstScreen` → `SecondScreen` → `ThirdScreen`の画面遷移を行うのですが、その際の画面遷移の情報の受け渡しの仕方をまとめます。

```
root/
┣ App.js
┗ Screens/
　　┣ FirstScreen.js
　　┣ SecondScreen.js
　　┗ ThirdScreen.js
```

## 利用するモジュールについて

今回は`React Navigation`を使うのですが、具体的には`useNavigation`を利用します。公式マニュアルは[こちら](https://reactnavigation.org/docs/use-navigation/)です。

`useNavigation`のマニュアルを翻訳すると、下記のような説明になります。

> useNavigationは、ナビゲーションオブジェクトにアクセスするためのフックです。navigation propをコンポーネントに直接渡すことができない場合や、深くネストした子にpropを渡したくない場合に便利です。

ということで、多くの場合、これ1つで間違いなくnavigationオブジェクト（すなわち画面遷移の情報）にアクセスできます。

## 実例

### 開発環境

- Expo SDK 42
- React Navigation 6.×

### プログラム

↓のGitHubのレポジトリからクローンしても試せます。
{{< blogcard url="https://github.com/htnabe/ReactNavigation-Example/tree/main">}}

レポジトリを利用しない場合、事前に以下のコマンドで必要なモジュールをインストールしてください。

```
yarn add @react-navigation/stack
yarn add @react-navigation/native
yarn add react-native-gesture-handler
expo install react-native-safe-area-context
```

- App.js

```
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// スクリーンの読み込み
import FirstScreen from './Screens/FirstScreen';
import SecondScreen from './Screens/SecondScreen';
import ThirdScreen from './Screens/ThirdScreen';

const Stack = createStackNavigator();

export default function lectureApp() {
  return (
    < NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="first" component={FirstScreen} />
        <Stack.Screen name="second" component={SecondScreen} />
        <Stack.Screen name="third" component={ThirdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

```

- FirstScreen.js

```
import { StyleSheet, View, Button } from "react-native";
import React from "react";

export default function firstScreen({ navigation }) {
  return (
    <View style={styles.screenContainer}>
      <Button
        title="Go to second screen"
        onPress={() => {
          navigation.navigate('second' );
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
  }
})

```

- SecondScreen.js

```
import { StyleSheet, View, Button } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';

export default function firstScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.screenContainer}>
      <Button
        title="Go to third screen"
        onPress={() => {
          navigation.navigate('third');
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
  }
})

```

- ThirdScreen.js

```
import { StyleSheet, View, Button } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';

export default function firstScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.screenContainer}>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
  }
})

```

### 解説

`FirstScreen`ではnavigation情報をpropsとして`{navigation}`で参照しています。
一方、`SecondScreen`と`ThirdScreen`ではuseNavgationを利用した画面遷移を行っています。

今回紹介した例のような単純な画面遷移ではuseNavigationのメリットをほとんど享受できませんが、useNavigationは複雑にネストされた画面遷移を実現する際には非常に強力なフックです（実際、最近助けられました…）。

## まとめ

島根大学の講義情報やイベント情報を集めるためのスマートフォンアプリをAndroid, ~~iOSの両方~~でリリースしてるのですが、useNavigationを[このアプリ](https://github.com/htnabe/SUEP)内でも利用していま~~す~~した。

React Nativeを触り始めたてのころ、ネストされたナビゲーション内でナビゲーション情報を上手く引き出せないことがありました。その当時は力技で解決したのですが、ここ最近になってようやくこれの存在を知ったのでまとめておきました。

個人的にはReact Nativeの画面遷移のチュートリアルにこれを追加してほしいな～と思っている次第です。
