import Toast from 'react-native-toast-message';

const index = options => {
  return Toast.show(options);
};

/**
 * Example options object to be passed to Toast() function above looks like below:
 * {
        type: 'success', // or 'error', 'info'
        position: 'bottom', // or 'top'
        text1: 'Hey!',
        text2: `This is a Toast.`,
        visibilityTime: 3000, // number of milliseconds
    }
 */
export default index;
