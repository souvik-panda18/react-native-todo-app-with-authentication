import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  orderBy
} from "firebase/firestore";

const TodoScreen = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(updatedTasks);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async () => {
    if (!task.trim()) {
      Alert.alert("Please enter a task.");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        text: task,
        completed: false,
        userId: user.uid,
        createdAt: new Date()
      });
      setTask("");
      Keyboard.dismiss();
    } catch (error) {
      Alert.alert("Error adding task", error.message);
    }
  };

  const toggleComplete = async (taskId, currentStatus) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      completed: !currentStatus
    });
  };

  const handleDelete = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleComplete(item.id, item.completed)}>
        <Ionicons
          name={item.completed ? "checkbox" : "square-outline"}
          size={24}
          color="#333"
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.taskText,
          { textDecorationLine: item.completed ? "line-through" : "none" }
        ]}
      >
        {item.text}
      </Text>

      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash-outline" size={22} color="#d11a2a" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a new task..."
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginRight: 10
  },
  addButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 10
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "space-between"
  },
  taskText: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16
  }
});
