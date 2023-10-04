import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Platform, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from './../node_modules/@react-navigation/routers/src/CommonActions';


import appFirebase from '../credenciales';
import {getFirestore, collection, addDoc, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore';
const db = getFirestore(appFirebase);

export default function CreateNote(props) {

  const initialState = {
    title: '',
    detail: '',
  }

  const [date, setDate] = useState(new Date(1598051790000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('empty');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [estado, setEstado] = useState(initialState);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setShow(false);
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime =
      "Hora: " + tempDate.getHours() + " minutos: " + tempDate.getMinutes();
    setText(fDate + " " + fTime);
    setFecha(fDate);
    setHora(fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  }
  const showTimepicker = () => {
    showMode('time');
  }

  const handleChangeText = (value, name) => {
    setEstado({ ...estado, [name]: value });
  }

  const saveNote = async() => {

    try {
      if (estado.title === '' || estado.detail === '') {
        Alert.alert('¡IMPORTANTE!', 'Debes rellenar el campo requerido')
      }
      else {
        const nota = {
          title: estado.title,
          detail: estado.detail,
          fecha: fecha,
          hora: hora,
        }
        await addDoc(collection(db, 'notas'), {
          ...nota
        })
        Alert.alert('Exito', 'guardado con exito')
        props.navigation.navigate("Notes")
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(nota);
  }

  return (
    <SafeAreaView style={styles.contenedorPadre} >
      <View style={styles.tarjeta} >
        <View style={styles.contenedor} >
          <TextInput
            placeholder='Ingresa el titulo'
            style={styles.textInput}
            value={estado.title}
            onChangeText={(value) => handleChangeText(value, 'title')}
          />
          <TextInput
            placeholder='Ingresa el detalle'
            style={styles.textInput}
            multiline={true}
            numberOfLines={4}
            value={estado.detail}
            onChangeText={(value) => handleChangeText(value, 'detail')}
          />

          {/* Contenedor de fecha */}
          <View style={styles.InputDate}>
            <TextInput
              placeholder="5/5/2023"
              style={styles.textDate}
              value={fecha}
            />
            <TouchableOpacity
              style={styles.buttonDate}
              onPress={showDatepicker}
            >
              <Text style={styles.subtitle} >Fecha</Text>
            </TouchableOpacity>
          </View>

          {/* Contenedor de hora */}
          <View style={styles.InputDate}>
            <TextInput
              placeholder="Hora: 6 minutos: 30"
              style={styles.textDate}
              value={hora}
            />
            <TouchableOpacity
              style={styles.buttonDate}
              onPress={showTimepicker}
            >
              <Text style={styles.subtitle} >Hora</Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={mode}
              is24Hour={true}
              display='default'
              onChange={onChange}
              minimumDate={new Date("2023-1-1")}
            />
          )}

          {/* Boton para enviar los datos */}
          <View>
            <TouchableOpacity
              style={styles.buttonSend}
              onPress={saveNote}
            >
              <Text style={styles.textBtnSend}>
                Guardar una nueva nota
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedorPadre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tarjeta: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contenedor: {
    padding: 20,
  },
  textInput: {
    borderColor: 'slategray',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  InputDate: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  buttonDate: {
    backgroundColor: '#871375',
    borderRadius: 5,
    padding: 10,
    width: '30%',
    height: '90%',
    marginTop: 10,
    marginLeft: 10,
  },
  textDate: {
    borderColor: 'slategray',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
  },
  buttonSend: {
    backgroundColor: '#871375',
    borderColor: '#FC4F00',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textBtnSend: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
})
