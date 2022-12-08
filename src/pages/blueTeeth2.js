import {
  View,
  Text,
} from "react-native";
import { BleManager } from 'react-native-ble-plx';
let manager = new BleManager();
manager.startDeviceScan(null, null, (error, device) => {
  if (error) {
      console.log(error)
      return
  }
  if (device) {
      
        console.log(device)

  }
});
const BlueTeeth2 = (props) => {
  return (
    <View>
      <Text>1245</Text>
    </View>
  )
}
export {BlueTeeth2};