import { SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';

import ColorBox from '../components/ColorBox';

const ColorPalette = ({ route }) => {
  const { colors, paletteName } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={colors}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
        )}
        ListHeaderComponent={<Text style={styles.text}>{paletteName}</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ColorPalette;
