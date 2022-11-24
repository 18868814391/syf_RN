// StackRouter.js
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text,View,Button} from 'react-native';
const Stack = createNativeStackNavigator();
function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button 
        onPress={() => navigation.navigation.navigate('List')} 
        title="Go List">
      </Button>
    </View>
  );
}
function ListScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ListScreen</Text>
    </View>
  );
}
function DetailScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>DetailScreen</Text>
    </View>
  );
}
export default function StackRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home"
          options={{
            title: '首页',
            headerStyle: {
                height: 80,
                backgroundColor: '#fe5c33',
            },
        }}
      >
        {(props) => <HomeScreen {...props} extraData={123} />}
      </Stack.Screen>
      <Stack.Screen name="List">
        {(props) => <ListScreen {...props} extraData={'iamData'} />}
      </Stack.Screen>
      <Stack.Screen
          name="Detail"
          component={DetailScreen}
      />
    </Stack.Navigator>
  );
}