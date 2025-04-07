import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function Index() {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [flag, setFlag] = useState("🇮🇳");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (phoneNumber.length === 0) {
      Alert.alert("Please enter a phone number");
      return;
    }
    if (!/^\d{7,15}$/.test(phoneNumber)) {
      Alert.alert("Invalid phone number");
      return;
    }

    const fullNumber = `${countryCode.replace("+", "")}${phoneNumber}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${fullNumber}?text=${encodedMessage}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) Linking.openURL(url);
        else Alert.alert("WhatsApp not installed");
      })
      .catch((err) => console.error(err));
  };

  return (
    <LinearGradient colors={["#0FB4B8", "#A7F6F2"]} style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.innerContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* Logo */}
          <View style={{ alignItems: "center", marginBottom: 24 }}>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 36,
                fontWeight: "bold",
              }}
            >
              Chat Ease
            </Text>
            <Text style={{ color: "#fff", fontSize: 18, marginBottom: 10 }}>
              Send Message to WhatsApp without saving number
            </Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setIsPickerVisible(true)}
              style={styles.countryCodeBox}
            >
              <Text style={styles.flag}>{flag}</Text>
              <Text style={styles.code}>{countryCode}</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Phone number"
              style={styles.phoneInput}
              keyboardType="number-pad"
              value={phoneNumber}
              maxLength={15}
              onChangeText={setPhoneNumber}
              placeholderTextColor="#aaaaaa"
            />
          </View>

          {/* Message input */}
          <TextInput
            placeholder="Enter your message (Optional)"
            style={styles.messageBox}
            multiline
            numberOfLines={4}
            maxLength={1000}
            value={message}
            onChangeText={setMessage}
            placeholderTextColor="#aaaaaa"
          />
          {/* WhatsApp Button */}
          <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
            <Text style={styles.buttonText}>Open WhatsApp</Text>
          </TouchableOpacity>

          {/* Country Code Picker */}
          <CountryPicker
            lang="en"
            show={isPickerVisible}
            onBackdropPress={() => setIsPickerVisible(false)}
            pickerButtonOnPress={(item) => {
              setCountryCode(item.dial_code);
              setFlag(item.flag);
              setIsPickerVisible(false);
            }}
            style={{ modal: { height: 400 } }}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  countryCodeBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "white",
  },
  flag: {
    fontSize: 20,
    marginRight: 5,
  },
  code: {
    fontSize: 16,
    color: "#000",
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "white",
    color: "#000",
  },
  messageBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
    width: "100%",
    backgroundColor: "white",
    color: "#000",
  },
  // buttonTextWrapper: {
  //   paddingVertical: 15,
  //   alignItems: "center",
  //   borderRadius: 10,
  //   backgroundColor: "#fff",
  // },
  button: {
    // backgroundColor: "#25D366",
    backgroundColor: "#0FB4B8",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
