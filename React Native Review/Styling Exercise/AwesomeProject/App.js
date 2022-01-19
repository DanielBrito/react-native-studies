import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Here are some boxes of different colors</Text>
      </View>
      <View style={[styles.box, styles.cyanBox]}>
        <Text style={styles.text}>Cyan #2aa198</Text>
      </View>
      <View style={[styles.box, styles.blueBox]}>
        <Text style={styles.text}>Blue #268bd2</Text>
      </View>
      <View style={[styles.box, styles.magentaBox]}>
        <Text style={styles.text}>Magenta #d33682</Text>
      </View>
      <View style={[styles.box, styles.orangeBox]}>
        <Text style={styles.text}>Orange #cb4b16</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  box: {
    padding: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cyanBox: {
    backgroundColor: '#2aa198',
  },
  blueBox: {
    backgroundColor: '#268bd2',
  },
  magentaBox: {
    backgroundColor: '#d33682',
  },
  orangeBox: {
    backgroundColor: '#cb4b16',
  },
});

export default App;
