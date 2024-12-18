import { mockBusArrival } from "@/app/utils/mockData";
import { View, StyleSheet, StatusBar, Text, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        height: 60,
        marginVertical: 8,
        flex: 1,
        justifyContent: "center",
    },
    arrival:{
        backgroundColor: 'green',
        flex:1,
    },
    blank:{
        flex:1,

    },
    title: {
        fontSize: 32,
        textAlign:'center',
    },
});

const Item = ({ serviceNo }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{serviceNo}</Text>
    </View>
);



export default function ListRow() {

    return (

        <View style={{ flex: 1, flexDirection: "row" }}>
            <FlatList

                data={mockBusArrival}
                renderItem={({ item }) =>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Item serviceNo={item.serviceNo} />
                        <Text style={styles.blank}>blank</Text>
                        <View style={{flex:1,}}><Button onPress={() => null} title="12 mins"/></View>
                        <Text style={styles.arrival}>button</Text>
                        <View style={{
                            backgroundColor: '#f9c2ff',
                            padding: 20,
                            marginVertical: 8,
                            marginHorizontal: 16,
                            flex: 1,
                        }}><Text>hellow</Text></View>

                    </View>


                }
                keyExtractor={item => item.busStopNo}
            />

        </View>
    );
}