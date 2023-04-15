import { Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';

import {CampaignsCard} from '../components/Campaign'

import React from 'react';
import {styles} from './styles';

import Ionicons from '@expo/vector-icons/Ionicons';
import { ViewInvitationsPage } from './view_invite_page';

const viewPorttoOriginalRatioWidth = Dimensions.get('window').width / 428;
const viewPorttoOriginalRatioHeight = Dimensions.get('window').height / 926;

function ViewCampaignsPage({navigation}){
    console.log ("inside")
    return (
      <View style={styles.backgroundContainer}>
        <View style={{  
          alignItems: "center"
        }}>
          <Text style={styles.titleStyle}>
              Campaigns
          </Text>
        </View>
        

        <View style={{
          alignItems: "center",
          padding: 40,
          flex: 0.2,
          backgroundColor: 'transparent'
        }}>
          <TouchableOpacity
                style={styles.submitButton}
                onPress={() => navigation.navigate('InvitationPage')}>
                <Text>Pending</Text>
            </TouchableOpacity>

          <TouchableOpacity
                style={styles.submitButton}
                onPress={() => ('')}>
                <Text>Scheduled</Text>
            </TouchableOpacity>
        </View>

      

      <View style={{
        alignItems: "center",
          padding:50,
          flex: 1,
          width: '100%',
          backgroundColor: '#ededed'
      }}>
        {campaigns_list?.map(campaign =>
          <CampaignsCard key = {campaign.id} campaign = {campaign} />
        )}
      </View>

      
        <View style={{  
        alignItems: "center",
        padding: 10
        }}>
          <TouchableOpacity
            style={styles.campaignButton}
            onPress={() => navigation.navigate('CreateCampaignPage')}>
              <Ionicons 
                name="add"
                size={50 * viewPorttoOriginalRatioWidth}
                color="white"
                style={{alignSelf: 'center', textAlign: 'center', justifyContent: 'center', alignItems: 'center', left: 1.5 * viewPorttoOriginalRatioWidth}}       
              />

          </TouchableOpacity>

          <Text style= {styles.sectionStyle}>
            Create New
          </Text>
        </View>
      </View>)

      
  }
export {ViewCampaignsPage}