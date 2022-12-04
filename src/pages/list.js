import {
  Text,
  View,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ToastAndroid,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import pxToDp from '../utils/pxToDp';
import {useEffect, useState} from 'react';
import {httpNet} from '../utils/request';
// import useCallbackState from '../utils/customHooks';
const List = ({navigation}) => {
  let kw = '';
  const [isLoading, setLoading] = useState(true);
  const [isFinish, setFinish] = useState(false);
  const [start_page, setPage] = useState(-1);
  const [keyWord, setKeyWord] = useState('');
  const [data, setData] = useState([]);
  const [tab, setTab] = useState({});

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
    getTabs();
  }, []);
  const getTabs = async () => {
    const result = await httpNet('/yii/web/index.php?r=blog/tabs', {
      tab: [
        'js',
        'vue',
        'php',
        'yii',
        'nginx',
        'mysql',
        'nuxt',
        'linux',
        'node',
        'flutter',
        'RN',
        'electron',
        'echarts',
        '浙里办',
        'three',
      ],
    });
    setTab(result.data);
  };
  const fetchData = async () => {
    if (isFinish) {
      // ToastAndroid.show('没有更多了!', ToastAndroid.SHORT);
      return false;
    }
    let dd = start_page;
    dd++;
    setPage(dd);
    ToastAndroid.show('加载中', ToastAndroid.SHORT);
    const result = await httpNet('/upload/BlogList.php', {
      start_page: dd,
      pages: 25,
    });
    console.log('reqSuccess')
    setLoading(false);
    let listData = data.concat(result.data);
    setData(listData);
    if (listData.length >= result.total_page * 1) {
      setFinish(true);
    }
  };
  const reFresh=()=>{
    setFinish(false)
    setPage(-1);
    setData([])
    setKeyWord('')
    setTimeout(()=>{
      fetchData()
    },500)
  };
  const onLoad = () => {
    fetchData();
  };
  const onChangeText = v => {
    kw = v;
    setKeyWord(v);
  };
  const onSearch = async d => {
    setData([]);
    const result = await httpNet('/yii/web/index.php?r=blog/search', {
      keyword: d ? d : keyWord,
    });
    setFinish(true);
    setData(result.data);
  };
  const tabSearch = d => {
    console.log(kw);
    onChangeText(d);
    onSearch(kw);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableHighlight onPress={() =>
          navigation.navigate('Detail', {
            id: item.id,
            otherParam: item.title,
          })
        }>
        <View style={styles.item}>
          <Text>{item.title}</Text>
        </View>        
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inpBox}>
        <TextInput
          style={styles.inp}
          value={keyWord}
          onChangeText={text => onChangeText(text)}
        />
        <TouchableHighlight onPress={() => onSearch('')}>
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>搜索</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.tabs}>
        <TouchableHighlight onPress={() => reFresh()}>
            <View style={styles.tab}>
              <Text>
                全部
              </Text>
            </View>
          </TouchableHighlight>
        {Object.keys(tab).map(key => {
          return (
            <TouchableHighlight key={key} onPress={() => tabSearch(key)}>
              <View style={styles.tab} key={key}>
                <Text>
                  {key}:{tab[key]}
                </Text>
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
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
      {/* <Button
        onPress={() =>
          navigation.navigate('Detail', {
            id: 86,
            otherParam: 'anything you want here',
          })
        }
        title="Go Detail"
      /> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  inpBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: pxToDp(160),
    height: pxToDp(80),
    padding: 10,
    backgroundColor: '#f4511e',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnTxt: {
    color: '#fff',
    textAlign: 'center',
  },
  inp: {
    width: pxToDp(500),
    height: pxToDp(80),
    backgroundColor: '#fff',
    elevation: 1.5,
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  tabs: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tab: {
    padding: 5,
    elevation: 1.5,
    backgroundColor: '#fff',
    margin: 5,
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
