import { View, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CircleButton({ onPress }) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.circleButton} onPress={onPress}>
                <MaterialIcons name="add" size={24} color="#25292e" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({

    buttonContainer: {
        width: 84,
        height: 84,
        borderRadius: 42,
        marginHorizontal: 60,
        borderWidth: 4,
        borderColor: "#ffd33d",
        padding: 3
    },

    circleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 42,
    }
    
});