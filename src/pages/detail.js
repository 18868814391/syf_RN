import {
  Text,
  View,
  Button,
  FlatList,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import {httpNet} from '../utils/request';
import {useEffect, useState} from 'react';
import RenderHtml from 'react-native-render-html';
import React from 'react';
const source = {
  html: `
<p style='text-align:center;font-weight:bold'>
  Hello World!
</p>`,
};
export function Detail({route, navigation}) {
  const {width} = useWindowDimensions();
  const {id, otherParam} = route.params;
  const [detail, setDetail] = useState({});
  useEffect(() => {
    console.log('DidMount');
    getDetail();
  }, []);
  const getDetail = async () => {
    console.log(id, otherParam);
    ToastAndroid.show('加载中', ToastAndroid.SHORT);
    const result = await httpNet('/upload/BlogDetail.php', {
      id: id,
    });
    setDetail(result.data);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>{detail.title}</Text>
          <Text>{detail.updatatime}</Text>
          <Text>{detail.adm}</Text>
          <RenderHtml
            contentWidth={width}
            source={{
              html: detail.content,
            }}
          />

          <Text>id: {id}</Text>
          <Text>otherParam: {otherParam}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 42,
  },
});
