import {toast} from 'react-toastify';

const index = options => {
  const align = options.align ?? 'CENTER';
  return toast[options.type](`${options.text1}\n${options.text2}`, {
    position:
      toast.POSITION[
        `${options.position.toUpperCase()}_${align.toUpperCase()}`
      ],
    autoClose: options.visibilityTime,
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    pauseOnFocusLoss: false,
  });
};

/**
 * Example options object to be passed to Toast() function above looks like below:
 * {
        type: 'success', // or 'error', 'info', 'warning'
        position: 'bottom', // or 'top'
        text1: 'Hey!',
        text2: `This is a Toast.`,
        visibilityTime: 3000, // number of milliseconds
    }
 */

export default index;
