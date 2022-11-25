import {Text, View, Button} from 'react-native';
export function Home({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('List')} title="Go List" />
    </View>
  );
}
