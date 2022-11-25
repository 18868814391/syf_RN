import {Text, View, Button} from 'react-native';
import {useEffect} from 'react';
export function List({navigation}) {
  let _focus = navigation.addListener('focus', () => {
    console.log('iamIn');
  });
  navigation.addListener('blur', () => {
    console.log('iamLeave');
  });
  useEffect(() => {
    return () => {
      console.log('WillUnmount');
    };
  });
  useEffect(() => {
    console.log('DidMount');
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>ListScreen</Text>
      <Button onPress={() => navigation.goBack()} title="Go BACK" />
      <Button onPress={() => navigation.push('List')} title="push List" />
      <Button onPress={() => navigation.popToTop()} title="popToTop" />
      <Button
        onPress={() =>
          navigation.navigate('Detail', {
            id: 86,
            otherParam: 'anything you want here',
          })
        }
        title="Go Detail"
      />
    </View>
  );
}
