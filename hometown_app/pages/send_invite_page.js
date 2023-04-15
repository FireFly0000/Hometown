import { Text, View, TextInput, TouchableOpacity} from 'react-native';

import React, {useState} from 'react';

import supabase from '../config/supabaseClient';
import Ionicons from '@expo/vector-icons/Ionicons';

import {styles} from './styles'

function SendInvitationsPage ({route, navigation}){
    const [invite_username, setInviteUsername] = useState('');
  
    const sendInvitation = async ( )=> {
      let { data: Business_owners, error } = await supabase
      .from('Business_owners')
      .select('*')
      not_existed = true;
  
      let{ data: current_campaign, cerror} = await supabase
      .from('scheduled_campaigns')
      .select('id')
      .eq('current', true)
  
      for (i in Business_owners){
        if(Business_owners[i]['username'] == invite_username){
          let current_invitations = []
          if(Business_owners[i]['campaign_invitations'] != null){  
            current_invitations = [...Business_owners[i]['campaign_invitations']]
          }
          else{
            current_invitations = []
          }
          
          console.log(current_campaign[0]['id'])
          current_invitations[current_invitations.length] = {"from": current_user, "subject": route.params.subject ,"cid": current_campaign[0]['id']}
          const { data, error } = await supabase
          .from('Business_owners')
          .update(
            {campaign_invitations: current_invitations}
          )
          .eq('username', invite_username)
          not_existed = false;
        }
      }
      if(not_existed){
        alert("Username does not exist")}
    }
    const goToHomePage = async () =>{
      let { data: Business_owners, error } = await supabase
      .from('Business_owners')
      .select('*')
      .eq('id', user_id)
  
      let {data , cerror} = await supabase
      .from('scheduled_campaigns')
      .update({current: false})
      .eq('current', true)
  
      navigation.navigate('HomePage', {
        user_name: Business_owners[0]['username'],
        pw: Business_owners[0]['password'],
        business_name: Business_owners[0]['business_name'],
        business_type: Business_owners[0]['business_type'],
        zip_code: Business_owners[0]['zip_code'],
      }
      )
    }
  
    return(
      <View style = {styles.backgroundContainer}>
      <TextInput style={styles.input} placeholder="Username" onChangeText={setInviteUsername}/>
      <TouchableOpacity style={styles.submitButton} onPress={sendInvitation}>
        <Text>
          
          Invite user
          <Ionicons 
                        name="person-add-outline" 
                        size={15}
                       
                      
          />
          </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={goToHomePage}>
        <Text>Done</Text>
      </TouchableOpacity>
      </View>
    )
  }

export {SendInvitationsPage}