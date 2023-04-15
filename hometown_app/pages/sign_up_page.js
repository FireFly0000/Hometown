import { Text, View, TextInput, TouchableOpacity, Image} from 'react-native';

import React, {useState} from 'react';

import supabase from '../config/supabaseClient';
import {styles} from './styles'

function SignUpPage({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [businessName, setBusinessName] = useState('');
  
    const InsertUser = async () => {
      const { data, error } = await supabase
      .from('Business_owners')
      .insert([
        { "username": username, "password": password, "business_name": businessName },
      ])
    }
  
    const getUsers = async () => {
      let { data: Business_owners, error } = await supabase
      .from('Business_owners')
      .select('*')
  
      return Business_owners         
    }
  
    const handleChangeUsername = (text) => {
      setUsername(text)
    }
  
    const handleChangePassword = (text) => {
      setPassword(text)
    }
  
    const handleSetBusinessName = (text) => {
      setBusinessName(text)
    }
    
    const attemptSignUp = async => {
      if (username == '' || password == '' || businessName == ''){
        alert('These fields cannot be left blank:\n'
        + 'Business Name\n'
        + 'Username\n'
        + 'Password')
        return;
      }
      getUsers()
      .then((Business_owners) => {
        var exists = false;
        for (item in Business_owners){
          if(Business_owners[item]['username'] == username){
            alert("Username already exists")
            exists = true;
            break;
          }
        }
        if (!exists)
          InsertUser()
      })    
    }
  
    return (
      <View style={styles.backgroundContainer}>
        <View style={{
          flex:1,
          backgroundColor: "#FFFFFF"
        }}>
        <Text style={styles.titleStyle}>{"Sign Up"}</Text>
        </View>
  
        <View style={{
          flex:3,
          backgroundColor: "#FFFFFF"
        }}>
        <Image source={require('../assets/home.png')} style={{ width: 250, height: 215 }}/>
        </View>
  
        <View style={{
          flex:4,
          backgroundColor: "#FFFFFF"
        }}>
          <TextInput
            style={styles.input}
            placeholder="Business Name"
            onChangeText={handleSetBusinessName}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={handleChangeUsername}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={handleChangePassword}>
          </TextInput>
        </View>
  
        <View style={{
          flex:2,
          backgroundColor: "#FFFFFF"
        }}>
          <TouchableOpacity
              style={styles.submitButton}
              onPress={attemptSignUp}
              >
              <Text>Submit</Text>
          </TouchableOpacity>
        </View>
  
      </View>
    )
  }

export {SignUpPage}