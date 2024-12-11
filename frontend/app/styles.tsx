import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    search: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 54,
        left: 16.5,
        right: 16.5,
    }
});

export default styles;