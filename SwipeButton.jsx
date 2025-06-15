import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const { width } = Dimensions.get("screen");

const buttonWidth = width * 0.9;

export default function SwipeButton({
  containerStyle,
  textStyle,
  buttonText,
  onSwipeStart,
  onSwipeEnd,
  icon,
}) {
  const translateX = useSharedValue(0);
  const containerWidth = useSharedValue(0);
  const isSwiped = useSharedValue(false);
  const maxSwipeDistance = buttonWidth - 20 - 70;

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      if (onSwipeStart) runOnJS(onSwipeStart)();
    })
    .onUpdate((e) => {
      if (!isSwiped.value) {
        if (e.translationX > 0) {
          translateX.value = Math.min(e.translationX, maxSwipeDistance);
        }
      } else {
        translateX.value = maxSwipeDistance + e.translationX;
      }
    })
    .onEnd((e) => {
      if (!isSwiped.value && e.translationX > maxSwipeDistance * 0.7) {
        translateX.value = withSpring(maxSwipeDistance);
        isSwiped.value = true;
        if (onSwipeEnd) runOnJS(onSwipeEnd)();
      } else if (isSwiped.value && e.translationX < -maxSwipeDistance * 0.3) {
        translateX.value = withSpring(0);
        isSwiped.value = false;
      } else {
        translateX.value = withSpring(isSwiped.value ? maxSwipeDistance : 0);
      }
    });

  const swipeAreaStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const textOpacityStyle = useAnimatedStyle(() => ({
    opacity: 1 - Math.min(translateX.value / maxSwipeDistance, 1),
  }));

  return (
    <View style={{ borderRadius: 45, overflow: "hidden", alignSelf: "center" }}>
      <GestureHandlerRootView
        style={[styles.container, containerStyle]}
        onLayout={(e) => {
          containerWidth.value = e.nativeEvent.layout.width;
        }}
      >
        <View style={{ position: "absolute", right: 20, flexDirection: "row" }}>
          <SimpleLineIcons name="arrow-right" size={24} color="#bdbaba" />
          <SimpleLineIcons
            name="arrow-right"
            size={24}
            color=" 
          #727070"
          />
          <SimpleLineIcons name="arrow-right" size={24} color="black" />
        </View>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.swipeArea, swipeAreaStyle]}>
            {icon ?? <Ionicons name="checkmark" size={34} color="black" />}
          </Animated.View>
        </GestureDetector>

        <Animated.View style={[styles.textContainer, textOpacityStyle]}>
          <Text style={[styles.text, textStyle]}>
            {buttonText || "Get Started"}
          </Text>
        </Animated.View>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: buttonWidth,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    position: "relative",
    overflow: "hidden",
  },

  swipeArea: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: "#FED955",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 10,
    zIndex: 2,
  },
  textContainer: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
