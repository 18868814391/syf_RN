import {Text, View, Button, StyleSheet,PermissionsAndroid,NativeModules,TouchableHighlight} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';
import pxToDp from '../utils/pxToDp';
let FlashLight = NativeModules.FlashLight
const Home = ({navigation}) => {
  const [openFlash, setOpenFlash] = useState(true);
  const [showClender, setShowClender] = useState(false);
  const openClender=()=>{
    setShowClender(!showClender)
  }
  const openLight=()=>{
    FlashLight.switchState(openFlash, () => {}, (message) => {
      console.error(message)
    })
    setOpenFlash(!openFlash)
  }
  const handleDateChange=(event,date)=>{
    if(event.type === "set"){
      setShowClender(false)
    }else{
      setShowClender(false)
    }
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <TouchableHighlight onPress={async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigation.navigate('ScanQRCode')
        } else {
          console.log('拒绝');
          return
        }
      }}>
      <View  style={styles.btns} title='扫一扫' >
        <Text>扫一扫</Text>
      </View>      
    </TouchableHighlight>

    <TouchableHighlight onPress={() => openLight()} >
      <View  style={styles.btns} title='打开闪光灯' >
        <Text>{openFlash?'打开':'关闭'}闪光灯</Text>
      </View>      
    </TouchableHighlight>
   
    {/* <TouchableHighlight onPress={() => FlashLight.switchState(false, () => {
      }, (message) => {
        console.error(message)
      })} >
      <View  style={styles.btns} title='关闭闪光灯' >
        <Text>关闭闪光灯</Text>
      </View>      
    </TouchableHighlight> */}
    <TouchableHighlight onPress={() => openClender()} >
      <View style={styles.btns}>
        {
          showClender&&(
            <RNDateTimePicker
              testID="dateTimePicker"
              mode="date"
              value={new Date()}
              display="default"
              onChange={(e,d)=>handleDateChange(e,d)}
            />            
          )
        }
        <Text>打开日历</Text>
      </View>      
    </TouchableHighlight>
    <TouchableHighlight onPress={async () => {
        navigation.navigate('BlueTeeth')
      }}>
      <View  style={styles.btns} >
        <Text>蓝牙连接</Text>
      </View>      
    </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {width: pxToDp(250), height: pxToDp(250), backgroundColor: 'powderblue'},
  btns:{
    width: pxToDp(160),
    height: pxToDp(80),
    padding: 10,
    backgroundColor: '#f4511e',
    textAlign: 'center',
    textAlignVertical: 'center',    
    backgroundColor: '#fff',
    elevation: 1.5,
    marginVertical: 25,
    marginHorizontal: 16,
  }
});
export {Home};
