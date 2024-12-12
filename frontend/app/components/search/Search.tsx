import { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { SearchBar } from 'react-native-elements';
import styles from "./styles";
import SearchResultInterface from "@/app/types/SearchResultInterface";
import searchApi from "@/app/services/SearchApi";
import SearchResults from "./SearchResults";
import { searchBarPlaceholderText } from "@/app/utils/strings";

export default function Search({ style }: { style: StyleProp<ViewStyle> }) {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<SearchResultInterface[] | null>(null);

  const changeText = (text: string) => {
    setValue(text);
    if (text.length == 0) {
      setResults(null);
    } else {
      setResults(searchApi(text));
    }
  };  

  return (
    <View style={style}>
      <SearchBar
        containerStyle={styles.container}
        inputContainerStyle={
          results != null
            ? styles.searchedInputContainer
            : styles.inputContainer
        }
        inputStyle={styles.input}
        placeholder={searchBarPlaceholderText}
        onChangeText={changeText}
        value={value}
        clearIcon={{
          color: "black",
          size: 24,
        }}
        rightIconContainerStyle={styles.rightIconContainer}
        searchIcon={() => {}}
        lightTheme={true}
      />

      <SearchResults results={results} />
    </View>
  );
}
