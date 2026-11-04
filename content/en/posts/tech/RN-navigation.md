---
title: "[React Native] How to Access Screen Navigation Info Externally with useNavigation"
date: 2021-10-31T01:23:43+09:00
tags: [React Native, React Navigation, Expo, React Navigation]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
---

## What We Want to Achieve

In this example, we will use the following directory structure and implement screen navigation from `FirstScreen` → `SecondScreen` → `ThirdScreen`, summarizing how to pass navigation information between screens.

```
root/
┣ App.js
┗ Screens/
　　┣ FirstScreen.js
　　┣ SecondScreen.js
　　┗ ThirdScreen.js
```

## About the Modules Used

We will use `React Navigation`, specifically the `useNavigation` hook. The official documentation is [here](https://reactnavigation.org/docs/use-navigation/).

Translating the `useNavigation` documentation, the description reads as follows:

> useNavigation is a hook that gives access to the navigation object. It is useful when you cannot pass the navigation prop directly to your component, or if you do not want to pass it through deeply nested children.

In most cases, this single hook is all you need to reliably access the navigation object (i.e., the screen navigation information).

## Example

### Development Environment

- Expo SDK 42
- React Navigation 6.×

### Code

You can also try this by cloning the following GitHub repository:
{{< blogcard url="https://github.com/htnabe/ReactNavigation-Example/tree/main">}}

If you are not using the repository, install the required modules beforehand with the following commands:

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

### Explanation

In `FirstScreen`, navigation information is accessed via props as `{navigation}`.
In contrast, `SecondScreen` and `ThirdScreen` use `useNavigation` for navigation.

In simple navigation examples like this one, you barely feel the benefit of `useNavigation`, but it is an extremely powerful hook for deeply nested navigation scenarios (and it actually saved me recently...).

## Summary

I have released a smartphone app for Android ~~and iOS~~ to collect lecture and event information for Shimane University, and I have also used `useNavigation` in [that app](https://github.com/htnabe/SUEP).

When I first started with React Native, I struggled to extract navigation information from within nested navigators. I brute-forced my way through it at the time, but I only recently learned about `useNavigation`, so I wanted to document it.

Personally, I'd love to see this added to the standard React Native navigation tutorial.
