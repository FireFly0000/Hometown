import { Text, View, TextInput, TouchableOpacity, Image, Dimensions} from 'react-native';


import React from 'react';
import {styles} from './styles';

import supabase from '../config/supabaseClient';

import Ionicons from '@expo/vector-icons/Ionicons';

const viewPorttoOriginalRatioWidth = Dimensions.get('window').width / 428;
const viewPorttoOriginalRatioHeight = Dimensions.get('window').height / 926;


function ViewJointCampaignsPage({navigation}){
   


    return (
        <View style={styles.backgroundContainer}>
            <View style={styles.titleStyle}           
            >               
                <Text style={styles.titleStyle}>
               
                    Joint Campaign
                </Text>      
            </View>
         

            <View style={styles.searchBar}>
                 {/* Search icon  */}
                <Ionicons style= {[styles.searchIcon, {top: 52 * viewPorttoOriginalRatioHeight, right: 150 * viewPorttoOriginalRatioWidth, zIndex: 1}]}
                    name="search"
                    size={23 * viewPorttoOriginalRatioWidth}
                    color="gray"
            
                />

                {/* Search text */}
                <TextInput
                    style={[styles.input, {paddingHorizontal: 47 * (Dimensions.get('window').width / 428)}]}
                   
                    placeholder="Search for businesses"
               
                ></TextInput>

            </View>
          
            <View style={{
                paddingHorizontal: 90 * viewPorttoOriginalRatioWidth,
                paddingVertical: 90 * viewPorttoOriginalRatioHeight,   
              
       
            }}>
                <Text style={[styles.sectionStyle, {alignSelf: 'flex-start', position: 'absolute', right: 40, top: 10}]}>
                    Businesses Near You 
                    
                    <Ionicons 
                    name="md-location-sharp"
                    size={23 * (Dimensions.get('window').width / 428)}
                    color="black"
                    />

                </Text>                

            </View> 

            
            <View style={{
                flex: 1,
                flexDirection: 'column',
                flexwrap: 'wrap',
                paddingVertical: 100 * viewPorttoOriginalRatioHeight,
                paddingHorizontal: 100 * viewPorttoOriginalRatioWidth,
             
                

            }}>
                
                <Text style={[styles.sectionStyle, {position: 'absolute', left: 135 * viewPorttoOriginalRatioWidth}]}>
                    Business Type
                </Text>

                <View style={{
                    flex: 0.5,
                    flexDirection: 'row',
                  
                }}>
                <TouchableOpacity style= {styles.businessTypeItem}>
                    <Ionicons 
                        name="restaurant-outline" 
                        size={40 * (Dimensions.get('window').width / 428)} 
                        color="tomato"
                    />
                    <Text style={styles.businessTypeItemText}>Food</Text>


                </TouchableOpacity>

                <TouchableOpacity style= {styles.businessTypeItem}>
                    <Ionicons 
                        name="gift-outline" 
                        size={40 * (Dimensions.get('window').width / 428)} 
                        color="tomato"
                    />
                    <Text style={styles.businessTypeItemText}>Shopping</Text>


                </TouchableOpacity>

                <TouchableOpacity style= {styles.businessTypeItem}>
                    <Ionicons 
                        name="cafe-outline" 
                        size={40 * (Dimensions.get('window').width / 428)} 
                        color="tomato"
                    />
                    <Text style={styles.businessTypeItemText}>Cafe</Text>


                </TouchableOpacity>
                </View>
                


                <View style={{
                    flex: 0.5,
                    flexDirection: 'row',
                  
                }}>
                <TouchableOpacity style= {styles.businessTypeItem}>
                    <Ionicons 
                        name="car-outline" 
                        size={40 * (Dimensions.get('window').width / 428)} 
                        color="tomato"
                    />
                    <Text style={styles.businessTypeItemText}>Automotive</Text>


                </TouchableOpacity>

                <TouchableOpacity style= {styles.businessTypeItem}>
                    <Ionicons 
                        name="headset-outline" 
                        size={40 * (Dimensions.get('window').width / 428)} 
                        color="tomato"
                    />
                    <Text style={styles.businessTypeItemText}>Entertainment</Text>


                </TouchableOpacity>

                <TouchableOpacity style= {styles.businessTypeItem}>
                    <Ionicons 
                        name="hammer-outline" 
                        size={40 * (Dimensions.get('window').width / 428)} 
                        color="tomato"
                    />
                    <Text style={styles.businessTypeItemText}>Services</Text>


                </TouchableOpacity>
                </View>
            
            </View>   

        
    </View>)
  }
export {ViewJointCampaignsPage}


