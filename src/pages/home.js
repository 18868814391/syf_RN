import {Text, View, Button, StyleSheet} from 'react-native';
import pxToDp from '../utils/pxToDp';
const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
