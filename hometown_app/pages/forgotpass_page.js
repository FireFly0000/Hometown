//react native page button
import { Dimensions, Text, View, TextInput, TouchableOpacity, Animated, SafeAreaView, Pressable} from 'react-native';

import React, {useEffect, useState, useRef} from 'react';


import Ionicons from '@expo/vector-icons/Ionicons';
import {styles} from './styles'
import LottieView from 'lottie-react-native';

function ForgotPasswordPage({navigation}) {   
    return (
        <View style={styles.backgroundContainer}>
    
           <View style= {styles.titleStyle}>
             <Text 
                style={[styles.titleStyle, {
                 
                textAlign:'center', 
               
                }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Ionicons 
                        name="arrow-back-outline" 
                        size={50} 
                        color="black"
                    />
                    </TouchableOpacity>
                    Forgot Password</Text>
            
            </View>

           
           
        </View>

         
               
 
    );

}

export {ForgotPasswordPage}





