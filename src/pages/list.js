import {
  Text,
  View,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {useEffect, useState} from 'react';
import {httpNet} from '../utils/request';

const List = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [isFinish, setFinish] = useState(false);
  const [start_page, setPage] = useState(-1);
  const [data, setData] = useState([]);

  let _focus = navigation.addListener('focus', () => {
    console.log('RouterIn');
  });
  navigation.addListener('blur', () => {
    console.log('RouterLeave');
  });
  useEffect(() => {
    return () => {
      console.log('WillUnmount');
    };
  });
  useEffect(() => {
    console.log('DidMount');
    setLoading(true);
    fetchData();
  }, []);
  const fetchData = async () => {
    if (isFinish) {
      ToastAndroid.show('没有更多了!', ToastAndroid.SHORT);
      return false;
    }
    let dd = start_page;
    dd++;
    setPage(dd);
    console.log('start_pagestart_pagestart_page', dd);
    ToastAndroid.show('加载中', ToastAndroid.SHORT);
    const result = await httpNet('/upload/BlogList.php', {
      start_page: dd,
      pages: 25,
    });
    setLoading(false);
    let listData = data.concat(result.data);
    setData(listData);
    if (listData.length >= result.total_page * 1) {
      setFinish(true);
    }
  };
  const onLoad = () => {
    console.log('iaminload');
    fetchData();
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text>{item.title}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        onEndReachedThreshold={0.1}
        onEndReached={onLoad}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* {data.map(item => (
        <View style={styles.item}>
          <Text key={item.id}>{item.title}</Text>
        </View>
      ))} */}
      {/* <Button onPress={() => navigation.goBack()} title="Go BACK" />
      <Button onPress={() => navigation.push('List')} title="push List" />
      <Button onPress={() => navigation.popToTop()} title="popToTop" /> */}
      <Button
        onPress={() =>
          navigation.navigate('Detail', {
            id: 86,
            otherParam: 'anything you want here',
          })
        }
        title="Go Detail"
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#fff',
    elevation: 1.5,
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export {List};
