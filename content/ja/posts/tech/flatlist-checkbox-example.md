---
title: "Flatlist内でCheckBoxを使って複数選択する方法"
date: 2021-10-05T12:06:17+09:00
draft: false
tags: [React Native, Flatlist, CheckBox, Expo, React Native Elements]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

## 開発環境

- Expo SDK 42
- React Native Elements 3.4.2

## 実現したい動作

今回実装しようとした動作は↓動画に示したものです。
{{<rawhtml>}}

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
<iframe src="https://res.cloudinary.com/takenoko/video/upload/w_800,f_auto/v1631543025/NabeBlog/RN-flatlist-checkbox_tgmfyc.mp4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen title="Video"></iframe>
</div>
{{</rawhtml>}}

実際の動作は下のレポジトリの`installation`の手順で試せます。

{{< blogcard url="https://github.com/htnabe/ReactNative-Flatlist-Chechbox-Example" >}}

## 主要なモジュールと選考理由

今回は`React Native Elements`の`CheckBox`を選びました。`CheckBox`の候補としては[react-native-bouncy-checkbox](https://github.com/WrathChaos/react-native-bouncy-checkbox)、[react-native-checkbox](https://github.com/react-native-checkbox/react-native-checkbox)等が上がるのですが、今回は

- yarnでパッケージ管理が可能
- IOS, Android の両者で問題なく動作

を確実に満たすモジュールとして`React Native Elements`のものを選びました。

{{< blogcard url="https://reactnativeelements.com/docs/components/checkbox" >}}

## 実装方法について

実装方法を検索したところ、主に二つの方法があることが分かりました。

1. FlatListに渡っているJSONデータのid等を参照し、チェックマークを付けるデータを選択・再レンダーする方法
2. 渡ってくるデータに`checked`などの項目を追加して`checked=true`となった時点で再レンダーする方法

一つ目の方法については下の動画が参考になると思います。

{{< youtube lFaklQ-7CXU >}}

### 採用した方法についてのおおまかな説明

今回は上記二つ目の方法を採用しました。例えば下のようなデータを用意し、

```
[{
    "時間割所属": "教育学部",
    "開講": "前期",
    "時間割コード": "M532001",
    "科目": "生活構成研究",
    "担当": "Teacher A",
}]
```

これに`checked: `の項目を追加します。

```
[{
    "時間割所属": "教育学部",
    "開講": "前期",
    "時間割コード": "M532001",
    "科目": "生活構成研究",
    "担当": "Teacher A",
    "checked": false,
}]
```

この処理は先ほどのGitHubレポジトリにある`App.js`の12行目周辺で行っています。

```
// checked=falseを初期値として代入
  getListData = async() => {
    await d1_Data.forEach(value => value.checked = false);
    console.log('データにfalseを追加')
    setdata(d1_Data);
  }

  // マウント時のみ実行される
  useEffect( () => {
    getListData();
  }, [])
```

CheckBoxをタップしたときに`checked=true/false`を切り替えるのですが、その処理は`App.js`の23行目周辺で行っています。

```
// 時間割コードが一致した要素に対してchecked=trueに変更
checkMark = (classId) => {
    const classIdNumber = data.findIndex((id) => id.時間割コード == classId);
    let newData = data;
    newData[classIdNumber].checked = !newData[classIdNumber].checked ;
    setdata(newData);
    setisChecked(!isChecked);
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.wrapText}>
        <Text>{item.科目}</Text>
        <CheckBox
          checked={item.checked}
          onPress={() => checkMark(item.時間割コード)}
        />
      </View>
    </View>
  );
```

最後に、FlatList側の`extraData`に`isChecked`を定めておき、`isChecked`の値が変わるたびに再レンダーがかかるようにしています。具体的には`App.js`の47行目周辺でこの処理を行っています。

```
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.時間割コード}
        style={styles.list}
        extraData={isChecked}
      />
```

## 問題点

上記の二つの方法を紹介しましたが、どちらにしても`isChecked`が変わるたびにFlatList内の全ての要素が再レンダーされるので動作が重くなってしまいます。

`useMemo`フックを使えば割とましになると思います（気が向いたらそこまでやる）。
