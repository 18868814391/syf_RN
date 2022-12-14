import React, {FunctionComponent, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    PermissionsAndroid,
    Alert,
    NativeModules,
    Button,
    NativeEventEmitter, FlatList, TouchableHighlight, Linking, SafeAreaView, TouchableOpacity, ScrollView
} from "react-native";

import BleManager from "react-native-ble-manager";
import pxToDp from "../utils/pxToDp";


const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


const BlueTeeth = (props) => {

    const [isScanning, setIsScanning] = useState(false);
    const peripherals = useRef(new Map()).current;
    const [list, setList] = useState([]);
    const [visible,setVisible]=useState(false)

    useEffect(()=>{

        const initfn=async ()=>{
            try {
                const result = await BleManager.start({showAlert: true});
                console.log('result====', JSON.stringify(result))
                if (!result) {
                    BleManager.checkState();
                    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
                    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
                    bleManagerEmitter.addListener('BleManagerConnectPeripheral',handleConnectPeripheral);
                    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
                    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
                    bleManagerEmitter.addListener("BleManagerDidUpdateState",handleDidUpdateState )

                    return (() => {
                        console.log('unmount');
                        bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
                        bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan);
                        bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
                        bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
                        bleManagerEmitter.removeListener("BleManagerDidUpdateState",handleDidUpdateState )
                    })
                } else {
                  console.log('??????????????????????????????????????????????????????')

                }
            }catch (e) {
                console.log('e',e)
            }
        }

        initfn()

    },[])

    const handleDiscoverPeripheral = (peripheral) => {
        if (!peripheral.name) {
            peripheral.name = '????????????';
        }
        console.log('???????????????',peripheral)
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
    }

    const startScan = () => {
        console.log('startScan')
        if (!isScanning) {
            BleManager.scan([], 60, false).then((results) => {
                console.log('Scanning...',results);
                setIsScanning(true);
            }).catch(err => {
              console.log('???????????????')
                console.error('err',err);
            });
        }
    }

    const stopScan=()=>{
        BleManager.stopScan().then(() => {
            // Success code
            console.log("Scan stopped");
        }).catch(err=>{
            console.log('err',err)
        })
    }

    const handleStopScan = () => {
        console.log('Scan is stopped=============xx====');
        setIsScanning(false);
    }
    const handleDisconnectedPeripheral = (data) => {
        console.log('data=========',JSON.stringify(data))
        console.log('???????????? BLE ?????????????????????')
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            setList(Array.from(peripherals.values()));
        }
        console.log('Disconnected from ' + data.peripheral);
    }
    const handleUpdateValueForCharacteristic = (data) => {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }

    const onOpenBluetooth = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('App-Prefs:root=Bluetooth')
        } else {
            BleManager.enableBluetooth().catch(() =>{})
        }
    }

    const handleDidUpdateState=args=>{
        console.log('handleDidUpdateState',args)
        if(args.state==='off'){
            Alert.alert(
                '???????????????',
                '?????????????????????????????????????????????',
                [
                    { text: '??????' },
                    { text: '????????????', onPress: onOpenBluetooth }
                ]
            )
            // Toast.fail('?????????????????????????????????????????????')
        }else if(args.state==='on'){
          console.log('???????????????')
        }
    }

    const handleConnectPeripheral=args=>{
      console.log('???????????? BLE ????????????')
        console.log('handleConnectPeripheral',args)
    }

    const testPeripheral = (peripheral) => {
        console.log(peripheral)
        if (peripheral){
            if (peripheral.connected){
                BleManager.disconnect(peripheral.id)
            }else{
                stopScan() // ?????????????????????
                setTimeout(()=>{
                  console.log('??????????????????...')
    
                    BleManager.connect(peripheral.id).then(() => {
                        let p = peripherals.get(peripheral.id);
                        console.log('p===',p)
                        if (p) {
                            p.connected = true;
                            peripherals.set(peripheral.id, p);
                            setList(Array.from(peripherals.values()));
                        }
                  
                        setTimeout(()=>{
                            BleManager.retrieveServices(peripheral.id).then(peripheralData=>{
      
                                Alert.alert('??????????????????', '????????????????????????????????????', [
                                    { text: '??????' },
                                    { text: '?????????' }
                                ])
                            })
                        },500)
                        console.log('Connected to ' + peripheral.id);
                    }).catch((error) => {
                        console.log('Connection error', error);
                    });
                },500)
            }
        }

    }

    const renderItem = (item) => {
        const color = item.connected ? 'green' : '#fff';
        return (
            <TouchableOpacity onPress={() => testPeripheral(item) } activeOpacity={0.7}>
                <View style={[styles.row, {backgroundColor: color}]}>
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

    const hideDialog=()=>{
      setVisible(false)
    }

    const cleanAllDevices=async()=>{
        for(let i=0;i<deviceList.length;i++){
            try {
                await BleManager.disconnect(deviceList[i].id)
            }catch (e) {
            }
        }
        _dispatch({
            type:'connectedDevice/cleanAll'
        })
        setList([])
        peripherals.clear()
    }

  return (<SafeAreaView style={{flex:1}}>
      <View style={styles.header}>
          <Button
          title="??????"
              onPress={startScan}
              style={{backgroundColor:'#1890FF',flex:1,marginHorizontal:pxToDp(2)}}
          >
              ??????
          </Button>
          <Button
          title="????????????"
              onPress={stopScan}
              style={{backgroundColor:'#F21A1A',flex:1,marginHorizontal:pxToDp(2)}}
          >
              ????????????
          </Button>
          {/*#46A9A8*/}
          <Button
          title="??????"
              onPress={() => {setVisible(true)}}
              style={{backgroundColor:'#46A9A8',flex:1,marginHorizontal:pxToDp(2)}}
          >
              ??????
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
};

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

export {BlueTeeth};
