import {useRef, useState} from 'react';
import {Animated, PanResponder} from 'react-native';
import {ifWebSmallLandscapeMode} from '../utils/utils';
import useCommonParams from './useCommonParams';

const useAnimatedSidebar = () => {
  const [showView, setShowView] = useState(false);
  const [animatedValue] = useState(new Animated.Value(-2000));
  const {isLandscapeMode} = useCommonParams();

  const swipeThreshold = 50; // Adjust the threshold as needed
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (event, gestureState) => {
        // Allow the responder capture if it's a vertical gesture
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
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
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // Check for left swipe
        if (gestureState.dx < -swipeThreshold) {
          // Your logic for left swipe
          // logger('swipe left');
          toggleSidePanel(false);
        }
        // Check for right swipe
        else if (gestureState.dx > swipeThreshold) {
          // Your logic for right swipe
          // logger('swipe right');
          toggleSidePanel(true);
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
      useNativeDriver: false,
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
