import {useRef, useState} from 'react';
import {Animated, PanResponder} from 'react-native';
import {ifWebSmallLandscapeMode, isWeb} from '../utils/utils';
import useCommonParams from './useCommonParams';

const useAnimatedSidebar = () => {
  const [showView, setShowView] = useState(false);
  const [animatedValue] = useState(new Animated.Value(-2000));
  const {isLandscapeMode} = useCommonParams();

  const swipeThreshold = 50; // Adjust the threshold as needed
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => {
        // Check if the user clicks away from sidebar to an extent towards the right
        if (
          event.nativeEvent.pageX >
          (isLandscapeMode ? (ifWebSmallLandscapeMode() ? 280 : 350) : 280)
        ) {
          // Trigger your function here
          toggleSidePanel(false);
        }
        return true;
      },
      onMoveShouldSetPanResponder: (event, gestureState) => {
        const {dx, dy} = gestureState;
        return Math.abs(dx) > Math.abs(dy); // returns true if horizontal swipe
      },
      onPanResponderMove: (event, gestureState) => {
        const {dx, dy} = gestureState;
        if (Math.abs(dx) > Math.abs(dy)) {
          // Check for left swipe
          if (dx < -swipeThreshold) {
            // Your logic for left swipe
            toggleSidePanel(false);
          }
          // Check for right swipe
          else if (dx > swipeThreshold) {
            // Your logic for right swipe
            toggleSidePanel(true);
          }
        }
      },
      onPanResponderRelease: () => {
        // Reset any animations or states after the gesture ends
      },
    }),
  ).current;
  function toggleSidePanel(isOpen) {
    const show =
      typeof isOpen === 'boolean' && isOpen !== undefined && isOpen !== null
        ? isOpen
        : !showView;
    setShowView(show);
    Animated.timing(animatedValue, {
      toValue: !show ? -1000 : 0,
      duration: 300,
      useNativeDriver: isWeb ? false : true,
    }).start();
  }

  function hideSidePanelOnOutsideClick() {
    if (showView) {
      toggleSidePanel(false);
    }
  }

  return {
    showView,
    animatedValue,
    toggleSidePanel,
    hideSidePanelOnOutsideClick,
    panResponder,
  };
};

export default useAnimatedSidebar;
