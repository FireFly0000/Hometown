import { Text, View, TextInput, TouchableOpacity, ScrollView, Pressable} from 'react-native';

import React, {useEffect, useState} from 'react';

import supabase from '../config/supabaseClient';

import {styles} from './styles'

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';


async function load_campaigns (){ 
    global.campaigns_list = [];
    let{data: campaigns, error} = await supabase
    .from('scheduled_campaigns')
    .select('*')
    
    for(i in campaigns){
      if(campaigns[i]['business_id'] == user_id){
        global.campaigns_list.push(campaigns[i])   
      }
    }
  }

function HomePage({route, navigation}) {
    const [password, setPassword] = useState(route.params.pw);
    const [zip_code, setZipcode] = useState(route.params.zip_code);
    const [business_name, setBusinessName] = useState(route.params.business_name);
    const [business_type, setBusinessType] = useState(route.params.business_type);
    const [passwordVisible, setPasswordVisible] = useState(true);

  
    const attemptUpdates = async () => {
      const {error} = await supabase.
      from('Business_owners')
      .update({
        'password': password,
        'zip_code': zip_code,
        'business_name': business_name,
        'business_type': business_type
      })
      .eq('id', user_id)
      if (error){
        alert(error)
      }
      else{
        alert("Submitted Updated Information")
      }
    }
  
  
    const handleChangePassword = (text) => {
      setPassword(text)
    }
  
    const handleChangeZipcode = (text) => {
      setZipcode(text)
    }
  
    const handleChangeBusinessName = (text) => {
      setBusinessName(text)
    }
  
    const handleChangeBusinessType = (text) => {
      setBusinessType(text)
    }
  
  
    const owner_customer = async () =>{
      let {data: owners_customers, error} = await supabase
      .from('owners_customers')
      .select('*')
  
      return owners_customers
    }
  
    const all_customers = async () =>{
      let{data: all_customers, error} = await supabase
      .from('all_customers')
      .select('*')
  
      return all_customers
    }
    useEffect(() =>{
      const load_customers = async ()=>{
        customer_list = [];
        owners_customers = await owner_customer()
          for(item in owners_customers){
            if(owners_customers[item]['business_id'] == user_id){
              let c_id = owners_customers[item]['customer_id']
              all_customer = await all_customers()
                for(c in all_customer){
                  if(c_id == all_customer[c]['id']){
                    customer_list[customer_list.length] = all_customer[c]
                  }
                } 
            }
          }
      }
      load_campaigns()
      load_customers()
    }, [re_render])
  
    return (
      <View style={styles.businessBackground}>
      <ScrollView>
        <View style={{  
          alignItems: "center",
          backgroundColor: '#FFFFFF',
        }}>
        {/* <View style={{
          flex:1,
          backgroundColor: "#FFFFFF",
          alignItems: "center"
        }}> */}
          <Text style={styles.titleStyle}>
            Business Info
          </Text>

          <Text style={[styles.sectionStyle]}>
            Profile

         
          </Text>
        
          <Text style={styles.infoHeader}>
            Username
          </Text>
          
          <Text
            style={styles.businessInfo}
          >{route.params.user_name}</Text>

          <Text style={styles.infoHeader}>
            Password
          </Text>
          
          {/* <TextInput
            style={styles.businessInfo}
            value={password}
            onChangeText={handleChangePassword}>
          </TextInput> */}

          <View style={{flexDirection: 'column', alignContent: 'center', justifyContent: 'center'}}>
            <TextInput
              style={styles.businessInfo}
              value={password}
              // secureTextEntry={true}
              secureTextEntry={passwordVisible}
              onChangeText={handleChangePassword}
           
            >
              
            </TextInput>
            <Pressable style={{position:'absolute', alignSelf: 'flex-end', right:30}}  onPress={() => setPasswordVisible(!passwordVisible)}>
                 <Ionicons name={passwordVisible? "eye-outline" : "eye-off-outline"} size={24} color="black"/>
             
            </Pressable>
          </View>

          <Text style={styles.infoHeader}>
            Business Name 
          </Text>
          
          <TextInput
            style={styles.businessInfo}
            value={business_name}
            onChangeText={handleChangeBusinessName}
          ></TextInput>

          <Text style={styles.infoHeader}>
            Zip Code
          </Text>
          
          <TextInput
            style={styles.businessInfo}
            keyboardType="number-pad"
            value={zip_code.toString()}
            onChangeText={handleChangeZipcode}>
          </TextInput>

          <Text style={styles.infoHeader}>
            Business Type
          </Text>
          
          <TextInput
            style={styles.businessInfo}
            value={business_type}
            onChangeText={handleChangeBusinessType}>
          </TextInput>


          <TouchableOpacity
              style={[styles.submitButton, {backgroundColor: "tomato"}]}
              onPress={attemptUpdates}>
              <Text style={{color: 'white', fontWeight: 'bold', borderColor: 'tomato'}}>Submit Updates</Text>
          </TouchableOpacity>
        </View>
        
        
        <View style={{
          flex:1,
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          justifyContent: "center"
        }}>
     
          {/* <TouchableOpacity
              style={styles.submitButton}
              onPress={() => navigation.navigate('CreateCampaignPage')}>
              <Text>Create Campaign</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
              style={styles.submitButton}
              onPress={() => navigation.navigate('CampaignPage')}>
              <Text>Campaigns</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
              style={styles.submitButton}
              onPress={() => navigation.navigate('CustomerPage')}>
              <Text>Customers</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.submitButton}
              onPress={() => navigation.navigate('InvitationPage')}>
              <Text>Invitations</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    );
  }

export {HomePage, load_campaigns}