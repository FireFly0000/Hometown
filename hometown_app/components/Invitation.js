import React, { useState }  from 'react';
import { StyleSheet ,Text, View, TouchableOpacity} from 'react-native';
import supabase from '../config/supabaseClient';


const styles = StyleSheet.create({
    submitButton:{
      alignItems: 'center',
      borderWidth: 1,
      backgroundColor:'#D3D3D3',
      marginBottom: 10,
      padding: 10,
      marginRight: 10,
      left: 10,
      borderRadius: 10
    },
    card: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        flexWrap: 'wrap'
    },
    from: {
        maxWidth: '80%',
        fontSize: 24,
        fontWeight: 'bold',
        flexWrap: 'wrap',
    },
    buttonLists:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 10,
        flexWrap: 'wrap'
    }
  });

const InvitationsCard = ({invitation, user_id, navigation, changeFlag}) => {
    const accept = async () =>{
        let participants = [];
        let {data: campaigns, error} = await supabase
        .from('scheduled_campaigns')
        .select('*')
        .eq('id', invitation.cid)

        if(campaigns[0]['collaborators'] != null)
            participants = campaigns[0]['collaborators']

        participants.push(user_id)

        const {data, uerror} = await supabase
        .from('scheduled_campaigns')
        .update({collaborators: participants})
        .eq('id', invitation.cid)

        let {data: old_invitations, derror} = await supabase
        .from('Business_owners')
        .select('campaign_invitations')
        .eq('id', user_id)

        let new_invitations = old_invitations[0]['campaign_invitations']
        console.log(new_invitations[0])
        for(i in new_invitations){
            if(new_invitations[i]['cid'] == invitation.cid){
                new_invitations.splice(i, 1);
            }
        }

        if(new_invitations == []){
            new_invitations = null;
        }
        const {update_invitations_data, update_invitations_error } = await supabase
        .from('Business_owners')
        .update({campaign_invitations: new_invitations})
        .eq('id', user_id)
        changeFlag();

    }
  
    const decline = async () =>{
        let {data: old_invitations, derror} = await supabase
        .from('Business_owners')
        .select('campaign_invitations')
        .eq('id', user_id)

        let new_invitations = old_invitations[0]['campaign_invitations']
        console.log(old_invitations)
        for(i in new_invitations){
            if(new_invitations[i]['cid'] == invitation.cid){
                new_invitations.splice(i, 1);
            }
        }

        if(new_invitations == []){
            new_invitations = null;
        }
        const {update_invitations_data, update_invitations_error } = await supabase
        .from('Business_owners')
        .update({campaign_invitations: new_invitations})
        .eq('id', user_id)
        changeFlag();
    }
    return (
        <View style = {styles.card}>
            <Text style = {styles.from}> From: {invitation.from}</Text>
            <Text style = {styles.from}> Subject: {invitation.subject}</Text>
            <View style = {styles.buttonLists}>   
                <TouchableOpacity style={styles.submitButton} onPress={accept}>
                    <Text>accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={decline}>
                    <Text>decline</Text>
                </TouchableOpacity>
            </View> 
        </View>
    )
}

export default InvitationsCard