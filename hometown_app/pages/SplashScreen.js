
import { Text, View, TextInput, TouchableOpacity, Animated, StatusBar} from 'react-native';

import React, {useEffect, useState} from 'react';

import LottieView from 'lottie-react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {styles} from './styles'


function SplashScreen({navigation}) {  
    setTimeout(() => {
        navigation.navigate('OnboardingPage')
    }, 3000); 
    return (
        <View style={[styles.backgroundContainer, {backgroundColor: 'tomato'}]}>
            
               
            {/* <LottieView> */}
            <View style= {{
                flex: 0.8,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                
                <Ionicons name="home" size={300} color="white"/>


                <Text style={[styles.titleStyle, {color: 'white', justifyContent: 'center', alignSelf: 'center'}]}>Hometown</Text>

            </View>
               
            {/* </LottieView> */}

          
        
       
        </View>

    );

}

export {SplashScreen}








