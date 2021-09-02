import React from 'react'
import Carousel from 'react-native-snap-carousel'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,
    Button,
    Text,
    useColorScheme,
    TouchableOpacity,
    TextInput,
    View,
    Alert
} from 'react-native';

function CarouselPage() {
    let items = ['example1', 'example2', 'example3', 'example4']
    _renderItem = ({item, index}) => {
        return (
            <View style={{backgroundColor:'gray',
            borderRadius: 5,
            height: 250,
            padding: 50,
            marginLeft: 25,
            marginRight: 25,}}>
                <Text >{item}</Text>
            </View>
        );
    }
    return (
        <SafeAreaView>
            <Carousel
                layout={'stack'}
                data={items}            //_renderItem함수 인자로 들어갈 item(배열)
              renderItem={_renderItem}  // 화면에 표시될 카드들
              sliderWidth={400}
              itemWidth={200}
              loop={true}               // 1, 2, 3, 4, 1, 2, 3, 4, 1, ... 무한 루프
            />
            <Text></Text>
            <Text></Text>
            <Carousel
                layout={'default'}
                data={items}            //_renderItem함수 인자로 들어갈 item(배열)
              renderItem={_renderItem}  // 화면에 표시될 카드들
              sliderWidth={400}
              itemWidth={200}
              loop={true}               // 1, 2, 3, 4, 1, 2, 3, 4, 1, ... 무한 루프
            />
        </SafeAreaView>
    )
}

export default CarouselPage
