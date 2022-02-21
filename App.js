import * as React from "react";
import { useCallback, useState } from "react";
import { ScrollView, Text, View, TextInput, Pressable, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "./components/Header";
import styles from "./style/style";
import RadioButton from "./components/RadioButton";
import Footer from "./components/Footer";

export default function App(props) {
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(0);
  const { title = "Calculate" } = props;

  //several constants for bottles 
  const [openBottle, setOpenBottle] = useState(false);
  const [valueBottle, setValueBottle] = useState(null);
  const [itemsBottle, setItemsBottle] = useState([
    { label: "1 bottle", value: 1 },
    { label: "2 bottles", value: 2 },
    { label: "3 bottles", value: 3 },
    { label: "4 bottles", value: 4 },
    { label: "5 bottles", value: 5 },
  ]);

  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState(null);
  const [itemsTime, setItemsTime] = useState([
    { label: "1 hour", value: 1 },
    { label: "2 hours", value: 2 },
    { label: "3 hours", value: 3 },
    { label: "4 hours", value: 4 },
    { label: "5 hours", value: 5 },
  ]);
  // Calculate function including defining variables
  function calculation() {
    let endResult = 0;
    var litres;
    var grams;
    var burned;
    var leftGrams;
  // calculation

      litres = valueBottle * 0.33;
      grams = litres * 8 * 4.5;
      burned = weight / 10;
      leftGrams = grams - valueTime * burned;
    if (gender === "male") {
      endResult = leftGrams / (weight * 0.7);
    } else {
      endResult = leftGrams / (weight * 0.6);
    }
    setResult(endResult);

    
    if (endResult < 0) {
      let negativeResult = 0;
      setResult(negativeResult);
    } else {
      setResult(endResult);
    }
  
    const showAlert = () => {
      Alert.alert("WARNING!", "Your weight is missing.");
    };
    if (weight == 0) {
      showAlert(0);
    }
  }

  function getTextColor() {
    if (result < 0.3) {
      return styles.greenResult;
    } else if (0.6 > result > 0.3) {
      return styles.yellowResult;
    } else if (result > 0.6) {
      return styles.redResult;
    }
  }

  DropDownPicker.setListMode("SCROLLVIEW");

  const onOpenTime = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpenBottle = useCallback(() => {
    setOpen(false);
  }, []);

  // Genders constants
  const genders = [
    {
      label: "Female", value: "female",
    },
    {
      label: "Male", value: "male",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.weight}>Weight:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setWeight(text)}
        keyboardType="number-pad"
        placeholder="type in kilograms"
      ></TextInput>
      <View style={{ zIndex: 10 }}>
        <Text style={styles.bottle}>Bottle:</Text>
        <DropDownPicker
          style={styles.picker}
          open={openBottle}
          onOpen={onOpenBottle}
          value={valueBottle}
          items={itemsBottle}
          setOpen={setOpenBottle}
          setValue={setValueBottle}
          setItems={setItemsBottle}
          placeholder="1 bottle"
        />
      </View>
      <Text style={styles.time}>Time:</Text>
      <View style={{ zIndex: 9 }}>
        <DropDownPicker
          style={styles.picker}
          open={openTime}
          onOpen={onOpenTime}
          value={valueTime}
          items={itemsTime}
          setOpen={setOpenTime}
          setValue={setValueTime}
          setItems={setItemsTime}
          placeholder="1 hour"
        />
      </View>
      <Text style={styles.gender}>Gender:</Text>
      <RadioButton
        genders={genders}
        onPress={(value) => {
          setGender(value);
        }}
      />
      <Text style={getTextColor()}>{result.toFixed(2)}</Text>
      <Pressable style={styles.button} onPress={calculation}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
      <Footer />
    </ScrollView>
  );
}
