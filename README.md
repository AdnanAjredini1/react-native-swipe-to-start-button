# react-native-swipe-to-start

# 🚀 React Native Swipe Button

A beautiful, animated swipe button for React Native using `react-native-reanimated` and `react-native-gesture-handler`. Great for onboarding screens, confirmations, and call-to-actions like "Get Started".






![Demo GIF](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTd0OG56NW11ODNueThvZ3ZmaXFnODV0MWtmZWx4NXNzNjFuajhtNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DjKvcNm4M0FkG650LQ/giphy.gif
)


---

## ✨ Features

- Smooth swipe gesture with spring animation
- Fully customizable
- React Navigation compatible
- Built with `Reanimated v3` + `Gesture Handler v3`

---

## 📦 Installation

```bash
npm install react-native-swipe-to-start
# or
npm install react-native-swipe-to-start-button
# or
yarn add react-native-swipe-to-start
```

---






## 🧩 Usage

```js
import SwipeButton from "react-native-swipe-to-start/SwipeButton";

export default function App() {
  const handleStart = () => console.log("Swipe started");
  const handleEnd = () => console.log("Swipe finished");

  return (
    <SwipeButton
      buttonText="Swipe to Continue"
      onSwipeStart={handleStart}
      onSwipeEnd={handleEnd}
    />
  );
}

```

---

## 🛠 Props

| Prop           | Type     | Description                   |
|----------------|----------|-------------------------------|
| `buttonText`   | string   | Label shown in the center     |
| `onSwipeStart` | function | Called when swipe starts      |
| `onSwipeEnd`   | function | Called when swipe completes   |
| `containerStyle` | object | Override container styles     |
| `textStyle`    | object   | Override text style           |
