
import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View, Dimensions } from 'react-native';


const TabOneScreen: React.FC<{}> = (props: any) => {
  return (
    <ScrollView style={styles.container}>
      <ListRow title={"Hello World"} onPress={() => {
        props.navigation.navigate('Hello World');
      }} />
      <ListRow title={"Hello World2"} onPress={() => {
        props.navigation.navigate('Hello World2');
      }} />
      <ListRow title={"Logo"} onPress={() => {
        props.navigation.navigate('Logo');
      }} />
      <ListRow title={"Hue"} onPress={() => {
        props.navigation.navigate('Hue');
      }} />
      <ListRow title={"ReactLogo"} onPress={() => {
        props.navigation.navigate('ReactLogo');
      }} />
      <ListRow title={"SkiaLogo"} onPress={() => {
        props.navigation.navigate('SkiaLogo');
      }} />
      <ListRow title={"Card"} onPress={() => {
        props.navigation.navigate('Card');
      }} />
      <ListRow title={"PathGradient"} onPress={() => {
        props.navigation.navigate('PathGradient');
      }} />
      <ListRow title={"TelegramLock"} onPress={() => {
        props.navigation.navigate('TelegramLock');
      }} />
      <ListRow title={"SkiaShader"} onPress={() => {
        props.navigation.navigate('SkiaShader');
      }} />
      <ListRow title={"ShaderUniforms"} onPress={() => {
        props.navigation.navigate('ShaderUniforms');
      }} />
      <ListRow title={"Plot"} onPress={() => {
        props.navigation.navigate('Plot');
      }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  rowContainer: {
    width: Dimensions.get("window").width,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'white'
  },
});

export default TabOneScreen;

interface ListRowProps {
  title: string;
  onPress: () => void;
}

const ListRow: React.FC<ListRowProps> = (props) => {
  const {title, onPress} = props;
  return (
    <>
      <TouchableOpacity style={styles.rowContainer} onPress={onPress}>
        <Text style={{
          flex: 1,
          fontSize: 16,
          fontWeight: 'bold',

        }}>{title}</Text>
      </TouchableOpacity>
      <View style={{
        width: Dimensions.get("window").width - 20,
        height: .5,
        marginLeft: 20,
        backgroundColor: '#e9e9e9'
      }} />
    </>
  )
}
