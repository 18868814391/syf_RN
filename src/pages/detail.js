import {Text, View, Button,ToastAndroid} from 'react-native';
import {httpNet} from '../utils/request';
import {useEffect, useState} from 'react';
export function Detail({route, navigation}) {
  const {id, otherParam} = route.params;
  const [detail, setDetail] = useState({});
  useEffect(() => {
    console.log('DidMount');
    getDetail();
  }, []);
  const getDetail=async ()=>{
    console.log(id, otherParam)
    ToastAndroid.show('加载中', ToastAndroid.SHORT);
    const result = await httpNet('/upload/BlogDetail.php', {
      id: id
    });
    setDetail(result.data)
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{detail.title}</Text>
      <Text>id: {id}</Text>
      <Text>otherParam: {otherParam}</Text>
    </View>
  );
}
