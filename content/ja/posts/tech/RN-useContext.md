---
title: "React NativeでuseContextを使ってstateを変更する方法【React Native + Expo】"
date: 2022-03-01T23:31:08+09:00
tags: [React Native, useContext, Expo]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
draft: false
---

## 実現したいこと

親のコンポネント内で定義されている状態変数を別ファイルから`useContext`を使って変更したい。

## 具体例

今回は、簡素な例ですがモーダルの出現と消滅を状態変数で管理している場合を考えます。具体的には、`App.js`内で`useState`を用いて定義された状態変数を`CustomModal.js`側で書き換えたいと思います。

### ファイルとフォルダの配置

```
root/
┣ App.js
┣ ShowModalContext.js
┗ component/
　　┗ CustomModal.js
```

### こんな感じに表示される

{{<rawhtml>}}

<div data-snack-id="@htnabe/usecontextexample" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#fbfcfd;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.dev/embed.js"></script>
{{</rawhtml>}}

### 解説

- ShowModalContext.js

ここでは`createContext`を用いてcontextで参照するデフォルトの値を設定しています。

```
import { createContext } from 'react';

export const ShowModalContext = createContext({});
```

- App.js

`ShoModalContext.js`で定めた変数を呼び出し、`<コンテキスト.Provider value={子コンポーネントに渡したい値}>`とすることで子コンポーネントからも状態変数の参照を行えます。

```
import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import CustomModal from './components/CustomModal';
import { ShowModalContext } from './ShowModalContext';
export default function App() {
  const [showModalVisible, setModalVisibility] = useState(false);

  const value = {
    showModalVisible,
    setModalVisibility,
  };

  const showModal = () => {
    setModalVisibility(true);
    console.log(showModalVisible);
  };

  return (
    <>
      <View style={styles.centeredView}>
        <Pressable style={styles.button} onPress={showModal}>
          <Text>Show Modal</Text>
        </Pressable>
      </View>
      {showModalVisible && (
        <ShowModalContext.Provider value={value}>
          <CustomModal />
        </ShowModalContext.Provider>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: 'tomato',
  },
});
```

- CustomModal.js

そして今回の子コンポーネントであるこのファイルでは`ShowModalContext`を呼び出し、`useContext`を用いることで状態変数をそのまま弄ることができるようになります。[^1]

```
import { useContext } from 'react';
import { Text, StyleSheet, Modal, Pressable } from 'react-native';
import { ShowModalContext } from '../ShowModalContext';

export default function CustomModal() {
  const context = useContext(ShowModalContext);

  const closeModal = () => {
    context.setModalVisibility(!context.showModalVisible);
  };

  return (
    <Modal animationType="none" transparent={false} onRequestClose={closeModal}>
      <Pressable style={styles.button} onPress={closeModal}>
        <Text style={styles.textStyle}>Hide Modal</Text>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#F194FF',
  },
});

```

[^1]: 念のための説明ですが、`const { showModalVisible, setModalVisibility } = useContext(ShowModalContext);`という書き方もできます。
