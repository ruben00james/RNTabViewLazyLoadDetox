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
  ]);
  const [data, setData] = useState([
    {key: 1, name: 'const abc item'},
    {key: 2, name: 'const def item'},
  ]);

  useEffect(() => {
    getRemoteUsers();
  }, []);

  const getRemoteUsers = () => {
    const url = 'https://randomuser.me/api/?results=100';
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setData(res.results);
      })
      .catch(error => {
        console.log('get data error from: ' + url + ' error:' + error);
      });
  };

  const UserItem = ({fullname, email}) => (
    <>
      <Text>{fullname}</Text>
      <Text>{email}</Text>
    </>
  );

  const FirstRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#ff4081'}]}>
      <Text>Item 1</Text>
    </View>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
      <FlatList data={data} renderItem={({item}) => renderNativeItem(item)} />
    </View>
  );

  const renderNativeItem = item => {
    const name = item.name.first + ' ' + item.name.last;
    return <UserItem fullname={name} email={item.email} />;
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
  // item: {
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
});

export default App;
