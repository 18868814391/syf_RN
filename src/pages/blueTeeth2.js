import {View,Text,SafeAreaView,Button,FlatList,TouchableOpacity,StyleSheet} from "react-native";
import pxToDp from "../utils/pxToDp";
import {useEffect,useState} from 'react';
import { BleManager } from 'react-native-ble-plx';

const BlueTeeth2 = (props) => {
  const [list, setList] = useState([]);
  let manager = new BleManager();

  const startScan = () => {
    console.log('startScan')
    let arr=[]
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
          console.log('thisiserror',error)
          return
      }
      if (device) {
        let flag=true
        arr.forEach((v)=>{
          if(v.name==device.name){
            flag=false
          }
        })
        if(flag){
          arr.push(device)
        }
        console.log('thisisdevice',device)
        setList(arr)
      }
    });
}

const stopScan=()=>{
  console.log('stopScan')
  manager.stopDeviceScan();
}

  const renderItem = (item) => {
    const color = item.connected ? 'green' : '#fff';
    return (
        <TouchableOpacity activeOpacity={0.7}>
            <View>
               <View>
                   <Text style={styles.name}>{item.localName||item.name}</Text>
                   <View style={styles.bView}>
                       <Text style={styles.btext}>RSSI: {item.rssi}</Text>
                       <Text style={styles.btext}>{item.id}</Text>
                   </View>
               </View>
            </View>
        </TouchableOpacity>
    );
}


  return (<SafeAreaView style={{flex:1}}>
    <View style={styles.header}>
        <Button
        title="扫描"
            onPress={startScan}
            style={{backgroundColor:'#1890FF',flex:1,marginHorizontal:pxToDp(2)}}
        >
            扫描
        </Button>
        <Button
        title="停止扫描"
            onPress={stopScan}
            style={{backgroundColor:'#F21A1A',flex:1,marginHorizontal:pxToDp(2)}}
        >
            停止扫描
        </Button>
        {/*#46A9A8*/}
        <Button
        title="选项"
            onPress={() => {setVisible(true)}}
            style={{backgroundColor:'#46A9A8',flex:1,marginHorizontal:pxToDp(2)}}
        >
            选项
        </Button>
    </View>
    <FlatList
        extraData={list}
        data={list}
        renderItem={({ item }) => renderItem(item) }
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingVertical:pxToDp(12)}}
        style={{flex:1}}
    />
</SafeAreaView>);
}

const styles = StyleSheet.create({
  header: {
      backgroundColor: '#f9f9f9',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: pxToDp(5),
  },
  row:{
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between',
      borderBottomColor:'#999',
      borderBottomWidth:StyleSheet.hairlineWidth,
      paddingHorizontal:pxToDp(12),
      paddingVertical:pxToDp(15)
  },
  bView:{
      flexDirection: 'row',
      alignItems:'center',
      marginTop:pxToDp(8)
  },
  name:{fontSize: pxToDp(12), textAlign: 'left', color: '#333333',fontWeight:'500'},
  btext:{fontSize: 10, textAlign: 'left', color: '#333333',marginRight:pxToDp(12)}
})
export {BlueTeeth2};