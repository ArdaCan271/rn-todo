import { StyleSheet, StatusBar, Text, View, Button, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ToDoElement(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.toDoText} adjustsFontSizeToFit>{props.text}</Text>
      <View style={styles.deleteIcon}><TouchableOpacity onPress={props.onPress}><Ionicons name='trash' size={26} color="gray"/></TouchableOpacity></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: "85%",
    margin: 15,
    marginBottom: 0,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "skyblue",
    backgroundColor: '#c2f5ff',
    flexDirection: "row",
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 12,
    justifyContent: 'space-between',
  },
  toDoText: {
    fontSize: 16,
    maxWidth: "90%"
  },
  deleteIcon: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center"
  }
});
