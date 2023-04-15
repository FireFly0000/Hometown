import {View} from 'react-native';

import { registerRootComponent } from 'expo';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';

import { SplashScreen } from './SplashScreen';
import { OnboardingPage } from './Onboarding_page';


import { HomePage } from './home_page';
import { LoginPage } from './login_page'
import { ForgotPasswordPage } from './forgotpass_page';
import { SignUpPage } from './sign_up_page';
import { CreateCampaignPage } from './create_campaign_page'
import { ViewCampaignsPage } from './view_campaign_page';
import { ViewJointCampaignsPage } from './view_jointcampaigns_page';

import { SendInvitationsPage } from './send_invite_page';
import { ViewInvitationsPage } from './view_invite_page';
import { ViewCustomersPage } from './view_customer_page';

import Ionicons from '@expo/vector-icons/Ionicons';

const loginName = "Login";
const campaignName = "Campaigns";
const jointCampaignName = "Joint Campaigns";

global.user_id = '';
global.current_user = '';
global.customer_list = []
global.campaigns_list = [];
global.re_render = false

const App= () => {
  const navigationRef = React.useRef();
  //const Stack = createNativeStackNavigator();
  
  const Tab = createBottomTabNavigator();

  return (
  <View style={{flex:1}}>
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        // initialRouteName="LoginPage"
        initialRouteName="SplashScreen"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
          let iconName;
          
          if (route.name === 'HomePage') {
            iconName = focused ? 'home' : 'home';
          }
          else if (route.name === 'Campaigns') {
            iconName = focused ? 'megaphone' : 'megaphone' ;
          }
          else if (route.name === 'Joint Campaigns') {
            iconName = focused ? 'people' : 'people' ;
          }
          else if (route.name === 'Log out') {
            iconName = focused ? 'arrow-back' : 'arrow-back' ;
          }
          return <Ionicons name={iconName} size={size} color={color} />
          },

          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          unmountOnBlur: true
        })}>

        <Tab.Screen 
          name="Login" 
          component={LoginPage}
          options= {{
            tabBarButton: () => null, 
            tabBarStyle: {display: 'none'}
          }} 
        />
         <Tab.Screen 
          name="ForgotPasswordPage" 
          component={ForgotPasswordPage}
          options= {{
            tabBarButton: () => null, 
            tabBarStyle: {display: 'none'}
          }} 
        />
  
        <Tab.Screen name="HomePage" component={HomePage} />
        <Tab.Screen name="Campaigns" component={ViewCampaignsPage} /> 
        <Tab.Screen name="Joint Campaigns" component={ViewJointCampaignsPage} />
        <Tab.Screen name="Log out" component={LoginPage} 
         options= {{
          tabBarStyle: {display: 'none'}
        }}/>

        <Tab.Screen 
        name="OnboardingPage" 
        component={OnboardingPage} 
        options= {{
          tabBarButton: () => null,
          tabBarStyle: {display: 'none'}
        }}
        
        />
        <Tab.Screen 
        name="SplashScreen" 
        component={SplashScreen} 
        options= {{
          tabBarButton: () => null, 
          tabBarStyle: {display: 'none'}
        }}
        /> 

        <Tab.Screen 
        name="InvitationPage" 
        component={ViewInvitationsPage}
        options= {{
          tabBarButton: () => null,    
        }} 

        />

        <Tab.Screen 
        name="CustomerPage" 
        component={ViewCustomersPage}
        options= {{
          tabBarButton: () => null,    
        }} 
        />
     
        {/* <Tab.Screen 
        name ="SignUpPage"  
        component={SignUpPage} 
        options= {{
          tabBarButton: () => null, 
          tabBarStyle: {display: 'none'}
        }} 
        /> */}
      
        <Tab.Screen 
        name="CreateCampaignPage" 
        component={CreateCampaignPage} 
        options= {{
          tabBarButton: () => null,    
        }} 

        />
     
        <Tab.Screen 
        name="SendInvitationPage" 
        component={SendInvitationsPage}
        options= {{
          tabBarButton: () => null,    
        }} 
        
        />   

      </Tab.Navigator>
      

    </NavigationContainer>  


  </View>
  );
};

export default App;
registerRootComponent(App);