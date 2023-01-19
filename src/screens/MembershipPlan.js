import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import BackHeader from '../components/BackHeader';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#282534', white: '#fff',black:'#333'};

const slides = [
    {
      id: '1',
      image: require('../assets/images/image1.png'),
      title: 'Premium',
      subtitle: 'Health plan with easy claim process',
      plan2:'Large Network of Hospital',
      plan3:'Monthly Renewabillity',
    },
    {
      id: '2',
      image: require('../assets/images/image2.png'),
      title: 'Standard',
      subtitle: 'Lorem ipsum dolor sit amet',
      plan2:'Discounts and offers on medical ',
      plan3:'Monthly Renewabillity',
    },
    {
      id: '3',
      image: require('../assets/images/image3.png'),
      title: 'Basic Plan',
      subtitle: 'consectetur adipiscing elit.',
      plan2:'Discounts and offers on medical ',
      plan3:'Pre/past hospitalization Benefits',
    },
  ];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={item?.image}
        style={{height: '40%', width, resizeMode: 'contain'}}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
        <Text style={styles.subtitle}>{item?.plan2}</Text>
        <Text style={styles.subtitle}>{item?.plan3}</Text>
      </View>
    </View>
  );
};

const MembershipPlan = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <BackHeader label={'Membership plan'} onPress={() => navigation.openDrawer()} />
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      {/* <Footer /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 16,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 40,
    fontWeight:'600'
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#4584FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MembershipPlan;