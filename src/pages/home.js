import {Text, View, Button, StyleSheet,PermissionsAndroid} from 'react-native';
import pxToDp from '../utils/pxToDp';
const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

    <Button title='扫一扫' onPress={async () => {
            ///手机好像都会自带询问弹窗；下面注释的部分不用写。
            ///如果你之前已经允许过了，后续就不会再次调出手机自带的询问弹窗。
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              // {
              //   title: '摄像头权限', 
              //   message: '应用想获取你的摄像头权限',
              //   buttonNegative: '拒绝',
              //   buttonPositive: '允许',
              // },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('你现在已经有了摄像头的权限');
              navigation.navigate('ScanQRCode')
              ///路由跳转到ScanQRCode的页面
            } else {
              console.log('拒绝');
              return
            }
          }} />
      <Text>Home Screen</Text>
      <View style={styles.box}>
        <Text>Box</Text>
      </View>
      <Button onPress={() => navigation.navigate('List')} title="Go List" />
    </View>
  );
};
const styles = StyleSheet.create({
  box: {width: pxToDp(250), height: pxToDp(250), backgroundColor: 'powderblue'},
});
export {Home};
