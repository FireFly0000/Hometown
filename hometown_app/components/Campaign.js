import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';


const styles = StyleSheet.create({
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
  });

const CampaignsCard = ({campaign}) => {
    const select = (campaign) => {
        console.log(campaign)
    }

    return (
        <TouchableOpacity style = {styles.card} onPress={select(campaign)}>
                <Text> Subject: {campaign.subject}</Text>
                <Text> Message: {campaign.message}</Text>
                <Text> Scheduled to Send: {campaign.scheduled_date}</Text>
        </TouchableOpacity> 
    )
}

export {CampaignsCard}