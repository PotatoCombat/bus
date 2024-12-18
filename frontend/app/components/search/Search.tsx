import { useState } from "react";
import { Platform, StyleProp, TouchableHighlight, View, ViewStyle } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import styles from "./styles";
import SearchResultInterface from "@/app/types/SearchResultInterface";
import searchApi from "@/app/services/SearchApi";
import SearchResults from "./SearchResults";
import { searchBarPlaceholderText } from "@/app/utils/strings";
import SearchResultDisplay from "./SearchResultDisplay";
import { Colors, Sizing } from "@/app/styles";

export default function Search({ style }: { style: StyleProp<ViewStyle> }) {
  const [value, setValue] = useState("");
  const [selectedResult, setSelectedResult] = useState<SearchResultInterface | null>(null);
  const [results, setResults] = useState<SearchResultInterface[] | null>(null);

  const changeText = (text?: string) => {
      setValue(text ? text : '');
      setResults(text ? searchApi(text) : null);
  };

  const handleClickSearchButton = () => {
    setSelectedResult(null);
  };

  return (
    <View style={style}>
      {selectedResult == null ? (
        <>
          <SearchBar
            containerStyle={styles.searchBarContainer}
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
              name: (Platform.OS === 'android') ? 'clear' : 'close-circle',
              color: "rgba(0, 0, 0, 255)",
              size: Sizing.icons.x25,
            }}
            rightIconContainerStyle={styles.rightIconContainer}
            searchIcon={() => {}}
            lightTheme={true}
          />

          <SearchResults
            results={results}
            setSelectedResult={setSelectedResult}
          />
        </>
      ) : (
        <View style={styles.rowContainer}>
          <SearchResultDisplay
            selectedResult={selectedResult}
            setSelectedResult={setSelectedResult}
          />

          <TouchableHighlight
            onPress={handleClickSearchButton}
            style={styles.buttonIconContainer}
            activeOpacity={0.6}
            underlayColor={Colors.neutral.s100}
          >
            <View>
              <Icon name="search" />
            </View>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}
