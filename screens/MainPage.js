import { StyleSheet, FlatList, StatusBar, Text, View, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ToDoElement from '../components/ToDoElement';

export default function MainPage() {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("tasks")
      if (value !== null) {
        setTasks(JSON.parse(value))
      }
    } catch (err){
      console.log(err);
    }
  }
  


  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getData();
  }, [])
  useEffect(() => {
    async function storeItems(){
      const stringifiedTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks", stringifiedTasks)
    }
    storeItems();
  }, [tasks.length])
  
  

  const [text, setText] = useState("")

  const handleAddPress = () => {
    if (text.length !== 0){
        setTasks([...tasks, text]);
    }
    setText("");
  }


  const handleDelPress = (index) => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.toDoList}>
        <FlatList 
          style={{width: "100%"}}
          data={tasks}
          renderItem={({item, index}) => (
            <ToDoElement text={item} onPress={() => {handleDelPress(index)}}/>
          )}
        />
      </View>
      <View style={styles.textSubmitContainer}>
        <TextInput 
          style={styles.textBox}
          placeholder="Add ToDo..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAddPress}
        />
        <Button title='Add' onPress={handleAddPress}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toDoList: {
    height: "85%",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  textSubmitContainer:{
    height: "15%",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textBox:{
    borderWidth: 1,
    borderColor: "darkblue",
    width: "70%",
    height: 50,
    padding: 8,
  }
});
