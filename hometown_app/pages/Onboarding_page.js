import { 
Dimensions, 
Text, 
View, 
Image,
StatusBar,
TextInput, 
TouchableOpacity, 
Animated, 
List,
SafeAreaView,
FlatList, 
Pressable,
useWindowDimensions} from 'react-native';

import React, {useEffect, useState, useRef} from 'react';


import Ionicons from '@expo/vector-icons/Ionicons';
import {styles} from './styles'


import LottieView from 'lottie-react-native';

const image1 = require('../assets/85489-business-front.json');

const viewPorttoOriginalRatioWidth = Dimensions.get('window').width / 428;
const viewPorttoOriginalRatioHeight = Dimensions.get('window').height / 926;

function OnboardingPage({navigation}) {  
   
    const animation = useRef(null);
    // useEffect(() => {
    //      animation.current.play();
    // }, []);

    const handleLayout= () => {
        animation.current.play();

  };



    const data = [
        {
            id: 1,
            title: 'Welcome to Hometown',
            description: 'Grow your business',
            animation: require('../assets/85489-business-front.json')  
        },    
        {
            id: 2,
            title: 'Create a campaign',
            description: 'Easily create a campaign to connect with customers and promote your business',
            animation: require('../assets/119722-phone-notification.json')
        },
        {
            id: 3,
            title: 'Collaborate with other businesses',
            description: 'Create a joint campaign with other businesses in your area',
            animation: require('../assets/97990-business-segment.json')
        },
    ]


    const Item = ({item, index, title}) => (
       
        
        <View style={[styles.backgroundContainer, {width}]}>
            <TouchableOpacity
                style={[styles.skipButton, {position: 'absolute', top: 20, right: 20, width}]}
                onPress={() => navigation.navigate('Login')}   
            >
                <Text style = {[styles.skipButton]}>Skip</Text>
            </TouchableOpacity>
            
            <View style={[styles.onboardingTitle, {width}]}>
                <Text style={[styles.onboardingTitle]}>{item.title}</Text>
                <Text style ={{
                    fontSize: 20 * viewPorttoOriginalRatioWidth,
                    textAlign: 'center',
                    paddingHorizontal: 10 * viewPorttoOriginalRatioWidth,
                    paddingVertical: 10 * viewPorttoOriginalRatioHeight,
                    color: 'gray'
                }}>
                    {item.description}
                </Text>
                    <LottieView
                        autoplay= {true}           
                        ref={animation}
                        style={{
                            maxwidth: windowWidth,
                            maxHeight: Dimensions.get('window').height,
                            height: 200 * viewPorttoOriginalRatioHeight                       
                        }}
                      
                        loop= {true}
                        speed= {0.7}
                        source={item.animation} 
                        onAnimationFinish={() => console.log('finished')}

                        onLayout={handleLayout}


                    />  
            </View>
            

            {/* <View style={[styles.onboardingImage, {width, justifyContent: 'center'}]}>  */}
                    
           
           {/* </View> */}
           
              
         
        </View>
        
      );
    
 
    const windowWidth = Dimensions.get('window').width;
    const { width } = useWindowDimensions();

    const [isPressed, setIsPressed] = useState(false);



    function handlePressIn() {
        setIsPressed(!isPressed);
    }

  

    const [opacity, setOpacity] = useState(100);

    function handleOpacity(x) {
        setOpacity(x);
    }

  

    return (
        <View style={styles.backgroundContainer}>
            <FlatList
                data={data}
                // renderItem={({item}) => <Item item={item} />}
                renderItem={({ item, index }) => 

              
                
                <View style={[styles.backgroundContainer, {width}]}>
                    <TouchableOpacity
                        style={[styles.skipButton, {position: 'absolute', top: 20 * viewPorttoOriginalRatioHeight, right: 20 * viewPorttoOriginalRatioWidth, width}]}
                        onPress={() => navigation.navigate('Login')}   
                    >
                        <Text style = {[styles.skipButton]}>Skip</Text>
                    </TouchableOpacity>


                    <View style={[styles.onboardingTitle, {width}]}>
                        <Text style={[styles.onboardingTitle]}>{item.title}</Text>
                        <Text style ={{
                        fontSize: 20 * viewPorttoOriginalRatioWidth,
                        textAlign: 'center',
                        paddingVertical: 10 * viewPorttoOriginalRatioHeight,
                        paddingHorizontal: 10 * viewPorttoOriginalRatioWidth,
                        color: 'gray'
                    }}>
                            {item.description}
                        </Text>
                    </View>

                    <View style= {styles.onboardingImage}>
    
                        <LottieView
                        source={item.animation}
                        autoPlay
                        loop
                        speed = {0.7}
                        style={{ width: '100%', height: 500 * viewPorttoOriginalRatioHeight, justifyContent: 'center', alignItems: 'center' }}
                        />
                    </View>
                
                   
                {/* <Image source={{ uri: item.image }} style={{ width: '100%', height: 300 }} /> */}
                </View>
                }
                keyExtractor={(item) => item.id}
  
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}

            /> 
   

            {/* <Text style={[styles.titleStyle, {fontSize: 40, textAlign:'center', position: 'absolute', top: 100 }]}>Welcome to Hometown</Text> */}
        
        {/* <View style={[styles.onboardingImage, {justifyContent: 'center', marginTop: 80}]}>  */}
                {/* <LottieView
                    source={require('../assets/85489-business-front.json')} 
                    ref={animation}
                    style={{
                        maxwidth: windowWidth,
                        maxHeight: 600,
                        height: 600                       
                      }}
                    autoplay= {false}
                    loop
                    speed= {0.6}
                    onAnimationFinish={() => console.log('finished')}
                   
                />  */}
                                
            {/* </View>     */}
                 
            <View>
                <Pressable style={{
                    marginVertical: 5 * viewPorttoOriginalRatioHeight,
                    marginHorizontal: 5 * viewPorttoOriginalRatioWidth, 
                    borderRadius: 10, 
                    height: 60 * viewPorttoOriginalRatioHeight, 
                    width: 100 * viewPorttoOriginalRatioWidth, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    backgroundColor: 'tomato', 
                    opacity: opacity,
                    position: 'absolute',
                    bottom: 100 * viewPorttoOriginalRatioHeight,
                    alignSelf: 'center',
                
                }}
                onPressIn={() => {
                        setOpacity(0.5);
                        console.log('NextPage')
            
                    }
                }

                onPressOut={() => {
                        setOpacity(1);
                        console.log('NextPage')
                        navigation.navigate('Login'); 
                    }
                } 
                >
                    <Ionicons 
                        name="arrow-forward-outline" 
                        size={30 * viewPorttoOriginalRatioWidth}
                        style={{color: 'white'}} 
                    />
                </Pressable>


            </View>

        </View>

    );

}

export {OnboardingPage}





