import { Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';


import React, {useState} from 'react';

import supabase from '../config/supabaseClient';

import CalendarPicker from 'react-native-calendar-picker';

import { load_campaigns } from './home_page';

import {styles} from './styles';

import Holidays from 'date-holidays';

import Ionicons from '@expo/vector-icons/Ionicons';

const viewPorttoOriginalRatioWidth = Dimensions.get('window').width / 428;
const viewPorttoOriginalRatioHeight = Dimensions.get('window').height / 926;


function CreateCampaignPage({navigation}){
    const [subject, setSubject] = useState(undefined);
    const [body, setBody] = useState(undefined);
    const [selectedDate, setDate] = useState(undefined);
    const start_date = selectedDate ? new Date(selectedDate) : new Date();
    const [showHolidayText, setHolidayVisibility] = useState(false);
    const [holidayName, setHolidayName] = useState('');
  
    const hd = new Holidays('US');
    const holidays = hd.getHolidays();
    var customDatesStyles = [];
  
    for (item in holidays){
      customDatesStyles.push({
        date: holidays[item]['date'],
        style: {backgroundColor: '#ffb5b7'}
      });
    }
  
    const datesAreOnSameDay = (first, second) =>
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate(); 
  
    const handleChangeDate = (date) => {
      setDate(date)
      var isHoliday = false;
      for (item in holidays){
        if (datesAreOnSameDay(new Date(holidays[item]["date"]), new Date(date))){
          isHoliday = true;
          setHolidayName(holidays[item]["name"]);
          setHolidayVisibility(true);
          break;
        }
      }
      if (!isHoliday){
        setHolidayName('');
        setHolidayVisibility(false)
      }
    }
  
    const sendCampaign = async () => {
      if (!subject || subject == ''){
        alert ('Subject cannot be empty')
        return;
      }
  
      if (!body || body == ''){
        alert ('Body cannot be empty')
        return;
      }
      
      if (!selectedDate){
        alert ('No date selected')
        return
      }
      var dateObj = new Date(selectedDate)
      dateObj.setHours(0,0,0,0)
  
      var todayDate = new Date()
      todayDate.setHours(0,0,0,0)
  
      if(dateObj < todayDate){
        alert ('Notification date cannot be in the past')
        return;
      }
      const ymd = `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${('0' + (dateObj.getDate())).slice(-2)}`
      const { data, error } = await supabase
      .from('scheduled_campaigns')
      .insert([
        { "business_id": user_id, "scheduled_date": ymd, "subject": subject, "message": body, "current": true},
      ])
      alert('Campaign scheduled')
      load_campaigns()
      navigation.navigate('SendInvitationPage', {subject: subject})
    };
  
    return (
    <View style={styles.backgroundContainer}>
      <View style= {styles.titleStyle}>
        <Text style = {[styles.titleStyle, {textAlign: 'center'}]}>
        <TouchableOpacity onPress={() => navigation.navigate('Campaigns')}>
          <Ionicons 
            name="arrow-back-outline" 
            size={50 * viewPorttoOriginalRatioWidth} 
            color="black"
          />
        </TouchableOpacity>
        Create Campaign</Text> 
       
        
      </View>


      <TextInput style={styles.input} value={subject} onChangeText={setSubject} placeholder = "Subject"/>
      <TextInput style={styles.input} value={body} onChangeText={setBody} placeholder = "Body"/>
      <View style={styles.container}>
          <CalendarPicker onDateChange={handleChangeDate} 
          customDatesStyles={customDatesStyles}/>
          <View>
            <Text>SELECTED DATE: { start_date.toDateString() }</Text>
            {showHolidayText && <Text>HOLIDAY: { holidayName }</Text>}
          </View>
          
        </View>
      
        <TouchableOpacity style={[styles.submitButton, {marginVertical: 40 * viewPorttoOriginalRatioHeight, backgroundColor: 'tomato', borderColor: 'tomato'}]} onPress={sendCampaign}> 
        <Text style={{fontWeight: 'bold', color: 'white'}}>send campaign</Text> 
        </TouchableOpacity>
      </View>)
  }

export {CreateCampaignPage}