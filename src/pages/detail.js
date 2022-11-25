import {Text, View, Button} from 'react-native';
export function Detail({route, navigation}) {
  const {id, otherParam} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>DetailScreen</Text>
      <Text>id: {id}</Text>
      <Text>otherParam: {otherParam}</Text>
    </View>
  );
}
