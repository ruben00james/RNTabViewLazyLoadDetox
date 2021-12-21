/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

// This is our placeholder component for the tabs
// This will be rendered when a tab isn't loaded yet
// You could also customize it to render different content depending on the route

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
    {key: 'third', title: 'Third'},
  ]);
  const [dataFirst, setDataFirst] = useState([]);
  const [dataSecond, setDataSecond] = useState([]);
  const [dataThird, setDataThird] = useState([]);
  // const [data, setData] = useState([
  //   {
  //     email: 'janjanssen@test.com',
  //     name: [
  //       {
  //         first: 'Jan',
  //         last: 'Janssen',
  //       },
  //     ],
  //   },
  // ]);

  useEffect(() => {
    getRemoteUsers(1);
    getRemoteUsers(2);
    getRemoteUsers(3);
  }, []);

  const getRemoteUsers = (listNumber: number) => {
    const url = 'https://randomuser.me/api/?results=100';
    fetch(url)
      .then(res => res.json())
      .then(res => {
        switch (listNumber) {
          case 1:
            setDataFirst(res.results);
            break;
          case 2:
            setDataSecond(res.results);
            break;
          case 3:
            setDataThird(res.results);
            break;
        }
      })
      .catch(error => {
        console.log(`get data error from: ${url} error:${error}`);
      });
  };

  const FirstRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#ff4081'}]}>
      <FlatList
        data={dataFirst}
        renderItem={({item}) => renderNativeItem(item)}
        keyExtractor={item => item.email}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
      <FlatList
        data={dataSecond}
        renderItem={({item}) => renderNativeItem(item)}
        keyExtractor={item => item.email}
      />
    </View>
  );

  const ThirdRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
      <FlatList
        data={dataThird}
        renderItem={({item}) => renderNativeItem(item)}
        keyExtractor={item => item.email}
      />
    </View>
  );

  const renderNativeItem = item => {
    const name = item.name.first + ' ' + item.name.last;
    return (
      <Text style={styles.item}>
        {name} - {item.email}
      </Text>
    );
  };

  const LazyPlaceholder = ({route}) => (
    <View style={styles.scene}>
      <Text>Loading {route.title}…</Text>
    </View>
  );

  const handleIndexChange = (index: any) => setIndex(index);

  const renderLazyPlaceholder = ({route}) => <LazyPlaceholder route={route} />;

  return (
    <TabView
      lazy
      navigationState={{index, routes}}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
      })}
      renderLazyPlaceholder={renderLazyPlaceholder}
      onIndexChange={handleIndexChange}
      initialLayout={{width: Dimensions.get('window').width}}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 4,
  },
});

export default App;
