import { View, ScrollView} from 'react-native';


import React, {useEffect, useState} from 'react';

import {styles} from './styles';

import supabase from '../config/supabaseClient';
import InvitationsCard from '../components/Invitation';

function ViewInvitationsPage({navigation}){
    let temp_list = []
    const [invitations_list, setList] = useState(null)
    const [flag, setFlag] = useState(false)
    
    const changeFlag = () =>{
      setFlag(!flag)
    }
  
    useEffect(() => {
      const load_i = async ()=>{
        let{data: Business_owners, error} = await supabase
        .from('Business_owners')
        .select('*')
        .eq('id', user_id)
        
        temp_list = Business_owners[0]['campaign_invitations']
        
        for(i in temp_list){
          temp_list[i].id = i
        }
        await setList(temp_list)
      }
      load_i()
  
    }, [flag])
    return(
    <View style={styles.ListContainer}>
      <ScrollView>
        {invitations_list?.map((invitation) => {
          return <InvitationsCard key = {invitation.id} invitation = {invitation} user_id = {user_id} navigation = {navigation} changeFlag = {changeFlag}/>
        })}
      </ScrollView>
    </View>
      )
  }

  export {ViewInvitationsPage}