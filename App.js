import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import firebase from './src/firebaseConnection';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


console.disableYellowBox=true;

function HomeScreen() {
  const navigation = useNavigation();

  async function logout() {
    await firebase.auth().signOut();
    navigation.navigate('Login');
  }

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button 
      title='Deslogar'
      onPress={logout}
      />

    </View>
  ); 
}

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  async function cadastrar() {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( (value) => {
      alert('Usuário criado: ' + value.user.email);
    })
    .catch( (error) => {
      if(error.code === 'auth/weak-password') {
        alert('Sua senha deve ter pelo menos 6 caracteres');
        return;
      }
      if(error.code === 'auth/invalid-email') {
        alert('Email invalido');
        return;
      }else {
        alert('Ops algo deu errado');
        return;
      }
    })

    setEmail('');
    setPassword('')
  }
  
  async function logar() {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( (value) => {
      alert('Bem Vindo: ' + value.user.email);
      navigation.navigate('Home');
    })
    .catch( (error) => {
      alert('Ops algo deu errado');
      return;
    });

    setEmail('');
    setPassword('');
  }
  return(
    <View style={styles.container}>
      <Text style={styles.texto}>Email</Text>
      <TextInput
      style={styles.input}
      onChangeText={(texto) => setEmail(texto)}
      value={email}
      />

      <Text style={styles.texto}>Senha</Text>
      <TextInput
      style={styles.input}
      onChangeText={(texto) => setPassword(texto)}
      value={password}
      />

      <Button 
      title='Acessar'
      onPress={logar}
      />

      <Button 
      title='Cadastrar'
      onPress={cadastrar}
      />


    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  texto: {
    fontSize: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 45,
    fontSize: 17
  },
  
});