import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || "");
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleUsernameUpdate = async () => {
    if (!username.trim()) {
      Alert.alert("Username cannot be empty.");
      return;
    }

    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { username });
      setEditMode(false);
      Alert.alert("Success", "Username updated!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Avatar Placeholder */}
      <View style={styles.avatar}>
        <Ionicons name="person-circle-outline" size={100} color="#ccc" />
      </View>

      {/* Username */}
      <View style={styles.row}>
        <Text style={styles.label}>Username</Text>
        {editMode ? (
          <>
            <TextInput
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleUsernameUpdate}>
              <Ionicons name="checkmark-circle-outline" size={24} color="green" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.value}>{username}</Text>
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <Ionicons name="create-outline" size={20} color="#333" />
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Email */}
      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
    paddingTop: 60
  },
  avatar: {
    alignItems: "center",
    marginBottom: 30
  },
  row: {
    marginBottom: 25
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 5
  },
  logoutBtn: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    justifyContent: "center"
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8
  }
});
