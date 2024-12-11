import { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { SearchBar } from 'react-native-elements';
import styles from "./styles";

export default function Search({ style }: { style: StyleProp<ViewStyle> }) {
  const [value, setValue] = useState("");

  return (
    <View style={style}>
      <SearchBar
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="Search bus number"
        onChangeText={(text) => setValue(text)}
        value={value}
        clearIcon={{ color: "black", size: 24 }}
        searchIcon={() => {}}
        lightTheme={true}
      />
    </View>
  );
}
