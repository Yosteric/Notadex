import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { ListItem, Avatar } from '@rneui/themed';
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title';
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';

import appFirebase from '../credenciales';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function Notes(props) {

  const [lista, setLista] = useState([])

  // Logica para llamar la lista de documentos
  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'notas'));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { title, detail, fecha, hora } = doc.data();
          docs.push({
            id: doc.id,
            title,
            detail,
            fecha,
            hora,
          })
        })
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    }
    getLista()
  }, [lista])

  return (
    <ScrollView>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Crear')} >
          <Text style={styles.textButton}>Agregar una nueva nota</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contenedor}>
        {lista.map( (not)=> {
          return(
            <ListItem
              key={not.id}
              bottomDivider
              onPress={()=>{props.navigation.navigate('Detail', {
                noteId: not.id
              })}}
            >
              <ListItemChevron />

              <ListItemContent>
                <ListItemTitle style={styles.title}>{not.title}</ListItemTitle>
                <ListItemSubtitle>{not.fecha}</ListItemSubtitle>
              </ListItemContent>
            </ListItem>
          )
          })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#871375',
    borderColor: '#FC4F00',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  textButton: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
  contenedor: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    fontWeight: 'bold'
  }
})
