import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableHighlight, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import ListRow from './ListRow';

export default function BottomSheetDisplay() {
	const snapPoints = useMemo(() => ['100%', '50%', '70%'], []);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	return (


		<BottomSheetModalProvider>
			<TouchableHighlight onPress={() => { }}>
				<View>
					<Icon name="circle"
						size={30}
						color='#FF0000'
						onPress={handlePresentModalPress}
					>
					</Icon>

				</View>
			</TouchableHighlight>

			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			>
				<BottomSheetView style={styles.contentContainer}>
					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.text}>{data}</Text>
						<TouchableHighlight onPress={() => { }}>
							<View>
								<Icon name="refresh"
									size={30}
									color='#FF0000'
									onPress={handlePresentModalPress}
									
								>
								</Icon>

							</View>
						</TouchableHighlight>
					</View>



					<ListRow></ListRow>

				</BottomSheetView>
			</BottomSheetModal>
		</BottomSheetModalProvider>

	);
}

const styles = StyleSheet.create({
	list: {
		flex: 4, // the number of columns you want to devide the screen into
		marginHorizontal: "auto",
		width: 400,

		height: 10
	},
	container: {
		flex: 1,
		paddingTop: 22,
	},
	containerSheet: {
		width: "100%",
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center'
	},
	containerHeadline: {
		fontSize: 24,
		fontWeight: '600',
		padding: 20
	},
	item: {
		flex: 1,
		maxWidth: "25%", // 100% devided by the number of rows you want
		alignItems: "center",

		// my visual styles; not important for the grid
		padding: 10,
		backgroundColor: "rgba(249, 180, 45, 0.25)",
		borderWidth: 1.5,
		borderColor: "#fff"
	},
	row: {
		flexDirection: "row"
	},
	"1col": {
		backgroundColor: "lightblue",
		borderColor: "#fff",
		borderWidth: 1,
		flex: 1
	},
	"2col": {
		backgroundColor: "green",
		borderColor: "#fff",
		borderWidth: 1,
		flex: 2
	},
	"3col": {
		backgroundColor: "orange",
		borderColor: "#fff",
		borderWidth: 1,
		flex: 3
	},
	"4col": {
		flex: 4
	},
	text: {
		fontSize: 30,
		paddingLeft: 10,
		marginRight: 'auto',

	}
});