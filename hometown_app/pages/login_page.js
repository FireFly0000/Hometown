import { Text, View, TextInput, TouchableOpacity, Image, Pressable, Dimensions} from 'react-native';

import React, {useState} from 'react';

import supabase from '../config/supabaseClient';

import {styles} from './styles'

import Ionicons from '@expo/vector-icons/Ionicons';

function LoginPage({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const windowWidth = Dimensions.get('window').width;
  
    const getUsers = async () => {
      let { data: Business_owners, error } = await supabase
      .from('Business_owners')
      .select('*')
  
      return Business_owners
    }
  
    const attemptLogin = () => {
      global.user_id = '';
      global.current_user = '';
      global.customer_list = []
      global.campaigns_list = [];
      global.re_render = false
      getUsers()
      .then((Business_owners) => {
        var matched = false;
        var business_item = {}
        for (item in Business_owners){
          if(Business_owners[item]['username'] == username){
            if(Business_owners[item]['password'] == password){
              var matched = true;
              user_id = Business_owners[item]['id'];
              business_item = Business_owners[item]
              current_user = business_item['username']
              break;
            }
          }
        }
        if(matched){
          console.log(business_item)
          navigation.navigate('HomePage',{
            user_name: business_item['username'], 
            pw: business_item['password'],
            business_name: business_item['business_name'],
            zip_code: business_item['zip_code'],
            business_type: business_item['business_type'],
          })
        }
        else{
          alert("Incorrect username or password")
        }
      })    
    }
  
    const handleChangeUsername = (text) => {
      setUsername(text)
    }
  
    const handleChangePassword = (text) => {
      setPassword(text)
    }
    return (
      <View style={styles.backgroundContainer}>
        <View style={{
          flex:0.7,
          justifyContent: 'center',
          padding: 40,
       
        }}>
        <Text style={styles.titleStyle}>{"Hometown"}</Text>
        </View>
        

        <View style={{
          flex:1,
          backgroundColor: 'transparent'
        }}>
          <Text style={[styles.sectionStyle, {paddingHorizontal: 25, fontSize: 23}]}>{"Login"}</Text>

          <Text style={[{paddingHorizontal: 25, fontSize: 15, paddingVertical: 5, color: 'gray'}]}>{"Please sign in to continue"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={handleChangeUsername}/>

          <View style={{flexDirection: 'column', alignContent: 'center', justifyContent: 'center'}}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              // secureTextEntry={true}
              secureTextEntry={passwordVisible}
              onChangeText={handleChangePassword}
           
            >
              
            </TextInput>
            <Pressable style={{position:'absolute', alignSelf: 'flex-end', right:30}}  onPress={() => setPasswordVisible(!passwordVisible)}>
                 <Ionicons name={passwordVisible? "eye-outline" : "eye-off-outline"} size={24} color="black"/>
             
            </Pressable>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={{
                color: '#000000', 
                alignSelf: 'flex-end', 
                position: 'absolute',
                right: 25 
             
                
              }} onPress={() => navigation.navigate('ForgotPasswordPage')}>
                Forgot Password?
              </Text>
              
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={{
          flex:1,
          backgroundColor: 'transparent'
        }}>
          <TouchableOpacity
              style={[styles.submitButton, {paddingVertical: 15, backgroundColor: 'tomato', borderColor: 'tomato'}]}
              onPress={attemptLogin}>
              <Text style={{color: 'white'}}>Login</Text>
          </TouchableOpacity>

 
          {/* <TouchableOpacity
              style={styles.submitButton}
              onPress={() => navigation.navigate('SignUpPage')}>
              <Text>Sign up</Text>
          </TouchableOpacity> */}
        </View>
        </View>
    );
  }

export {LoginPage}