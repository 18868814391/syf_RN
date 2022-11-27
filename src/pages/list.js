import {Text, View, Button} from 'react-native';
import {useEffect,useState} from 'react';
import { httpNet } from '../utils/request'
export function List({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  let _focus = navigation.addListener('focus', () => {
    // console.log('iamIn');
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
    setLoading(true)
    const fetchData=async ()=>{
      const result = await httpNet('/upload/BlogList.php',{"start_page":0,"pages":25})
      setLoading(false)
      setData(result.data);
      console.log(result.data)
      console.log('`````````````````````````````````````')
      console.log(data)
    }
    fetchData()
  }, []);
  const renderItem=(data)=>{
    return(
      <View>
        <Text>123</Text>
        <Text>{data}</Text>
      </View>
    )
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {
        !isLoading?renderItem():<Text>'loading'</Text>
      }
      {data.map(item => (
        <Text key={item.id}>
          {item.title}
        </Text>
      ))}
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
