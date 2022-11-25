import {Dimensions} from 'react-native';

// 设备屏幕的dp
const deviceWidthDp = Dimensions.get('window').width;

// UI 默认给图是 640
const uiWidthPx = 750;

function pxToDp(uiElementPx) {
  return (uiElementPx * deviceWidthDp) / uiWidthPx;
}

export default pxToDp;
