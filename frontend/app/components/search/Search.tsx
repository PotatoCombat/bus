import { useState } from "react";
import { StyleProp, TouchableHighlight, View, ViewStyle } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import styles from "./styles";
import SearchResultInterface from "@/app/types/SearchResultInterface";
import searchApi from "@/app/services/SearchApi";
import SearchResults from "./SearchResults";
import { searchBarPlaceholderText } from "@/app/utils/strings";
import SearchResultDisplay from "./SearchResultDisplay";
import { Colors } from "@/app/styles";

export default function Search({ style }: { style: StyleProp<ViewStyle> }) {
  const [value, setValue] = useState("");
  const [selectedResult, setSelectedResult] = useState<SearchResultInterface | null>(null);
  const [results, setResults] = useState<SearchResultInterface[] | null>(null);

  const changeText = (text: string) => {
    setValue(text);

    if (text.length == 0) {
      setResults(null);
    } else {
      setResults(searchApi(text));
    }
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
              color: "black",
              size: 24,
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
            underlayColor={Colors.underlay.primary}
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
