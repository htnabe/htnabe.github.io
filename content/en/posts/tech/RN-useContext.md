---
title: "How to Change State with useContext in React Native [React Native + Expo]"
date: 2022-03-01T23:31:08+09:00
tags: [React Native, useContext, Expo]
categories: [Tech]
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1638970951/NabeBlog/React-icon_l1ec3b.webp"
draft: false
---

## What We Want to Achieve

We want to use `useContext` from a separate file to modify a state variable defined in a parent component.

## Concrete Example

As a simple example, consider a case where modal visibility is managed via a state variable. Specifically, we want to modify a state variable defined in `App.js` with `useState` from within `CustomModal.js`.

### File and Folder Structure

```
root/
┣ App.js
┣ ShowModalContext.js
┗ component/
　　┗ CustomModal.js
```

### What It Looks Like

{{<rawhtml>}}

<div data-snack-id="@htnabe/usecontextexample" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#fbfcfd;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.dev/embed.js"></script>
{{</rawhtml>}}

### Explanation

- ShowModalContext.js

Here, `createContext` is used to set the default value that will be accessed via context.

```
import { createContext } from 'react';

export const ShowModalContext = createContext({});
```

- App.js

By importing the variable defined in `ShowModalContext.js` and wrapping with `<Context.Provider value={value to pass to child components}>`, child components can access the state variable.

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

In this child component file, by importing `ShowModalContext` and using `useContext`, we can directly manipulate the state variable.[^1]

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

[^1]: Just to clarify, you can also destructure it as `const { showModalVisible, setModalVisibility } = useContext(ShowModalContext);`.
