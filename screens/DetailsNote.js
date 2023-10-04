import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Alert } from 'react-native'

import appFirebase from '../credenciales';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

const db = getFirestore(appFirebase);

export default function DetailsNote(props) {

  const [nota, setNota] = useState({})

  const getOneNote = async (id) => {
    try {
      const docRef = doc(db, 'notas', id);
      const docSnap = await getDoc(docRef);
      setNota(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOneNote(props.route.params.noteId)
  }, [])

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, 'notas', id))
    Alert.alert('Exito', 'Nota eliminada con exito')
    props.navigation.navigate('Notes')
  }


  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Titulo: {nota.title}</Text>
        <Text style={styles.text}>Detalle: {nota.detail}</Text>
        <Text style={styles.text}>Fecha: {nota.fecha}</Text>
        <Text style={styles.text}>{nota.hora}</Text>

        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => deleteNote(props.route.params.noteId)}
        >
          <Text style={styles.textDelete}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  buttonDelete: {
    backgroundColor: '#871375',
    borderColor: '#FC4F08',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textDelete: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
})
