import {Text, View} from 'react-native';

import React from 'react';
import {styles} from './styles';


function ViewCustomersPage({navigation}){
    return(<View style={styles.backgroundContainer}>
        {customer_list.map(customer =>
        <Text key = {customer.id}> {customer.email_address} {customer.phone_number}</Text>
        )}
      </View>)
  }
export {ViewCustomersPage}