---
title: "Multiple Selection with CheckBox Inside a FlatList"
date: 2021-10-05T12:06:17+09:00
draft: false
tags: [React Native, Flatlist, CheckBox, Expo, React Native Elements]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

## Development Environment

- Expo SDK 42
- React Native Elements 3.4.2

## What We Want to Achieve

The behavior I implemented this time is shown in the video below.
{{<rawhtml>}}

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
<iframe src="https://res.cloudinary.com/takenoko/video/upload/w_800,f_auto/v1631543025/NabeBlog/RN-flatlist-checkbox_tgmfyc.mp4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen title="Video"></iframe>
</div>
{{</rawhtml>}}

You can try it yourself by following the `installation` steps in the repository below.

{{< blogcard url="https://github.com/htnabe/ReactNative-Flatlist-Chechbox-Example" >}}

## Key Modules and Why I Chose Them

For this project I chose `React Native Elements`'s `CheckBox`. Other candidates included [react-native-bouncy-checkbox](https://github.com/WrathChaos/react-native-bouncy-checkbox) and [react-native-checkbox](https://github.com/react-native-checkbox/react-native-checkbox), but I went with `React Native Elements` because it reliably satisfies:

- Can be managed with yarn
- Works correctly on both iOS and Android

{{< blogcard url="https://reactnativeelements.com/docs/components/checkbox" >}}

## Implementation Approach

After researching, I found two main approaches:

1. Reference the `id` or similar field of the JSON data passed to FlatList, select the item to check, and re-render
2. Add a `checked` field to the incoming data and re-render when `checked` becomes `true`

For approach 1, the video below is a helpful reference.

{{< youtube lFaklQ-7CXU >}}

### Overview of the Chosen Approach

I went with approach 2. For example, given the following data:

```
[{
    "時間割所属": "教育学部",
    "開講": "前期",
    "時間割コード": "M532001",
    "科目": "生活構成研究",
    "担当": "Teacher A",
}]
```

We add a `checked:` field:

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

This is handled around line 12 of `App.js` in the GitHub repository above.

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

The logic that toggles `checked` between `true` and `false` when a CheckBox is tapped is handled around line 23 of `App.js`:

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

Finally, `isChecked` is set as `extraData` on the FlatList so that every time `isChecked` changes, a re-render is triggered. This is handled around line 47 of `App.js`:

```
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.時間割コード}
        style={styles.list}
        extraData={isChecked}
      />
```

## Known Issues

With both approaches described above, every item in the FlatList re-renders whenever `isChecked` changes, which can make the UI sluggish.

Using the `useMemo` hook should help with this (I'll get around to it eventually).
