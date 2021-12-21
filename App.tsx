/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

// This is our placeholder component for the tabs
// This will be rendered when a tab isn't loaded yet
// You could also customize it to render different content depending on the route

const UserItem = ({fullname, email}) => (
  <>
    <Text>{fullname}</Text>
    <Text>{email}</Text>
  </>
);

const LazyPlaceholder = ({route}) => (
  <View style={styles.scene}>
    <Text>Loading {route.title}…</Text>
  </View>
);

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'first', title: 'First'},
      {key: 'second', title: 'Second'},
    ],
    dataSource: [
      {key: 1, name: 'const abc item'},
      {key: 2, name: 'const def item'},
    ],
  };

  componentDidMount() {
    this.getRemoteUsers();
  }

  getRemoteUsers = () => {
    const url = 'https://randomuser.me/api/?results=100';
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({data: res.results});
      })
      .catch(error => {
        console.log('get data error from: ' + url + ' error:' + error);
      });
  };

  renderNativeItem = item => {
    const name = item.name.first + ' ' + item.name.last;
    return <UserItem fullname={name} email={item.email} />;
  };

  FirstRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#ff4081'}]}>
      <Text>Item 1</Text>
    </View>
  );

  SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
      <FlatList
        data={this.state.dataSource}
        renderItem={({item}) => this.renderNativeItem(item)}
      />
    </View>
  );

  _handleIndexChange = (index: any) => this.setState({index});

  _renderLazyPlaceholder = ({route}) => <LazyPlaceholder route={route} />;

  render() {
    return (
      <TabView
        lazy
        navigationState={this.state}
        renderScene={SceneMap({
          first: this.FirstRoute,
          second: this.SecondRoute,
        })}
        renderLazyPlaceholder={this._renderLazyPlaceholder}
        onIndexChange={this._handleIndexChange}
        initialLayout={{width: Dimensions.get('window').width}}
        style={styles.container}
      />
    );
  }
}

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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
