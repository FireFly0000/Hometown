import { StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    ListContainer:{
      flex: 1,
      backgroundColor: 'B1F2FF',
      paddingTop: 70 * (Dimensions.get('window').height / 926),
      paddingRight: 15 * (Dimensions.get('window').width / 428),
      paddingLeft: 15 * (Dimensions.get('window').width / 428),
    },
    backgroundContainer:{
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      paddingTop: 70 * (Dimensions.get('window').height / 926),
    },
    titleStyle:{
      fontSize: 40 * (Dimensions.get('window').width / 428),
      fontWeight: "bold",
    },
    sectionStyle:{
      fontSize: 20 * (Dimensions.get('window').width / 428),
      fontWeight: "bold",
    },
    submitButton:{
      alignItems: 'center',
      backgroundColor:'#D3D3D3',
      paddingVertical: 10 * (Dimensions.get('window').height / 926),
      paddingHorizontal: 10 * (Dimensions.get('window').width / 428),
      marginBottom: 10 * (Dimensions.get('window').height / 926),
      borderRadius: 10 * (Dimensions.get('window').width / 428),
      borderWidth: 1.5 * (Dimensions.get('window').width / 428),
      borderColor: '#D3D3D3',
      width: 232 * (Dimensions.get('window').width / 428), 
    },
    input: {
      fontWeight: 'bold',
      backgroundColor:'#FFFFFF',
      height: 40 * (Dimensions.get('window').height / 926),
      marginHorizontal: 20 * (Dimensions.get('window').width / 428),
      marginVertical: 20 * (Dimensions.get('window').height / 926),
      minWidth: 350 * (Dimensions.get('window').width / 428),
      paddingHorizontal: 10 * (Dimensions.get('window').width / 428),
      paddingVertical: 10 * (Dimensions.get('window').height / 926),
      borderRadius: 10,
      borderWidth: 1.5 * (Dimensions.get('window').width / 428),
      borderColor: '#D3D3D3'
    },
    businessBackground:{
      flex: 1,
      flexDirection: "column",
      paddingTop: 70,
      backgroundColor: '#FFFFFF'
    },
    businessInfo:{
      backgroundColor:'#FFFFFF',
      // height: 20,
      // margin: 6,
      // minWidth: 350,
      height: 40 * (Dimensions.get('window').height / 926),
      marginHorizontal: 10 * (Dimensions.get('window').width / 428),
      marginVertical: 10 * (Dimensions.get('window').height / 926),
      minWidth: 350 * (Dimensions.get('window').width / 428),
      paddingHorizontal: 10 * (Dimensions.get('window').width / 428),
      paddingVertical: 10 * (Dimensions.get('window').height / 926),
      borderRadius: 10 * (Dimensions.get('window').width / 428),
      borderWidth: 1.5  * (Dimensions.get('window').width / 428),
      borderColor: '#D3D3D3'
    },

    campaignButton:{
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'tomato',
      paddingHorizontal: 10 * (Dimensions.get('window').width / 428),
      paddingVertical: 10 * (Dimensions.get('window').height / 926),
      marginBottom: 10 * (Dimensions.get('window').height / 926),
      borderRadius: 60 * (Dimensions.get('window').width / 428),
      width: 70 * (Dimensions.get('window').width / 428),
    },
    searchBar: {
      alignItems: 'center',   
    },
    searchIcon: {
      backgroundColor: 'transparent'
    },

    backButton:{
      alignItems: 'center', 
      backgroundColor: 'gray'
    },
    skipButton:{
      color: 'gray',
      alignSelf: 'flex-end',
      fontSize: 25 * (Dimensions.get('window').width / 428),
      backgroundColor: 'transparent'
    },
    // onboardingImage: { 
    //  backgroundColor: 'transparent',
    //  alignItems: 'center',

    // },

    infoHeader: {
      fontSize: 20 * (Dimensions.get('window').width / 428),
      fontWeight: "bold",
      alignSelf: 'flex-start',
      marginTop: 20 * (Dimensions.get('window').height / 926),
      marginLeft: 43 * (Dimensions.get('window').width / 428),
    },

    onboardingTitle: {
      // flex: 0.1, 
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 5,
    
    },
    onboardingImage: {
      alignItems: 'center',
   
   

    },
    businessTypeItem: {
      backgroundColor: '#EBEBEB',
      width: 105 * (Dimensions.get('window').width / 428),
      aspectRatio: 1,
      padding: 20 * (Dimensions.get('window').width / 428),
      marginBottom: 10 * (Dimensions.get('window').height / 926),
      marginHorizontal: 15 * (Dimensions.get('window').width / 428),
      alignItems: 'center',
      borderRadius: 20
    },
    businessTypeItemText: {
      fontSize: 11 * (Dimensions.get('window').width / 428),
      fontWeight: 'bold',
      textAlign: 'center'


    },
  
    

  });

  export {styles}