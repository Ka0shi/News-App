import 'react-native-gesture-handler';
import React, {useCallback} from 'react';
import {useState, createContext, useEffect} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-reanimated';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	Button,
	FlatList,
	Image,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	Modal,
	useWindowDimensions,
	Animated,
	Pressable,
	RefreshControl,
	StatusBar,
	Alert,
} from 'react-native';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = ({route, navigation}: any) => {
	const {itemId, otherParam, post} = route.params;

	useEffect(() => {
		if (post) {
			console.log('success! new post added');
		}
	}, [post]);

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#606C5D',
			}}>
			<Text>Home Screen</Text>
			<Button
				title='Go to Details'
				onPress={() =>
					navigation.navigate('Details', {
						itemId: itemId,
						otherParam: otherParam,
					})
				}
			/>
			<Button
				title='Create new post'
				onPress={() => navigation.navigate('CreatePost')}
			/>
			<Text style={{margin: 10}}>Post: {route.params?.post}</Text>
			<Button
				title='go to Main home'
				onPress={() => navigation.navigate('MainHome')}
			/>
			<Button
				title='go to Hotel'
				onPress={() => navigation.navigate('Hotel')}
			/>
		</View>
	);
};

const CreatePost = ({navigation, route}: any) => {
	const [postText, setPostText] = React.useState('');

	return (
		<View>
			<TextInput
				multiline
				placeholder="What's on your mind?"
				style={{height: 200, padding: 10, backgroundColor: '#606C5D'}}
				value={postText}
				onChangeText={setPostText}
			/>
			<Button
				title='Done'
				onPress={() => {
					// Pass and merge params back to home screen
					navigation.navigate({
						name: 'Home',
						params: {post: postText},
						merge: true,
					});
				}}
			/>
		</View>
	);
};

const DetailsScreen = ({route, navigation}: any) => {
	useEffect(() => {
		navigation.setParams({
			query: 'someText',
		});
	}, []);

	const [count, setCount] = useState(0);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button
					onPress={() => setCount((c) => c + 1)}
					title='Update count'
				/>
			),
		});
	}, [navigation]);
	const {itemId, otherParam, query} = route.params ?? {};

	useFocusEffect(
		useCallback(() => {
			console.log("i'm in focus!");

			return () => {
				console.log("Now i'm not in focus");
			};
		}, []),
	);

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#606C5D',
			}}>
			<Text>Details Screen</Text>
			<Text>itemId: {itemId}</Text>
			<Text>otherParam: {otherParam}</Text>
			<Text>query: {query}</Text>
			<Text>count: {count}</Text>
			<Button
				title='Go to Details... again'
				onPress={() =>
					navigation.push('Details', {
						itemId: Math.floor(Math.random() * 100),
						otherParam: 'anything you want here',
					})
				}
			/>
			<Button
				title='Go back to Home'
				onPress={() => navigation.navigate('Home')}
			/>
			<Button title='Go back' onPress={() => navigation.goBack()} />
		</View>
	);
};

const LogoTitle = () => {
	return (
		<Image
			style={{width: 50, height: 50}}
			source={require('./img/gosling.jpg')}
		/>
	);
};

const Home = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name='Feed' component={DetailsScreen} />
			<Tab.Screen name='Messages' component={CreatePost} />
		</Tab.Navigator>
	);
};

const Hotel = () => {
	return (
		<Drawer.Navigator
			screenOptions={{
				drawerType: 'slide',
				swipeEdgeWidth: 200,
			}}>
			<Drawer.Screen name='Room' component={DetailsScreen} />
			<Drawer.Screen name='Aparts' component={CreatePost} />
		</Drawer.Navigator>
	);
};

const App = () => {
	const [
		[number, setNumber],
		[newArticle, setNewArticl],
		[modalVisible, setModalVisible],
		pan,
		windowDimensions,
		modalHeight,
		[img, setimg],
		[isPressed, setIsPressed],
		[refreshing, setRefreshing],
		[hidden, setHidden],
		[data, setData],
	] = [
		useState(2),
		useState(''),
		useState(false),
		useState(new Animated.ValueXY())[0],
		useWindowDimensions(),
		useWindowDimensions().height * 0.75,
		useState('./img/pressme.png'),
		useState(false),
		useState(false),
		useState(false),
		useState<Artile[]>([
			{
				title: 'Cheep beer',
				material: 'Beer in this year is very cheep, buy it!',
			},
			{
				title: 'Obama dead',
				material: 'President Obama is dead now...',
			},
			{
				title: 'WhO StOlE mY PanTs??!',
				material: 'Someone stoled my pants, tf???!!!??!?!',
			},
			{
				title: 'i meat new person',
				material: 'it will be very usefull!',
			},
		]),
	];

	interface Artile {
		title: string;
		material: string;
	}

	const Article = ({title, material}: {title: string; material: string}) => {
		return (
			<View>
				<Text style={{fontSize: 24}}>Title: {title}</Text>
				<Text style={{fontSize: 16}}>
					Material: {material}
					{'\n'}
				</Text>
			</View>
		);
	};

	const onSubmitEditing = () => {
		newArticle !== ''
			? setData((data) => [
					...data,
					{
						title: `New Article #${Math.floor(
							Math.random() * 1001,
						)}`,
						material: newArticle,
					},
			  ])
			: null;
	};

	const onPressFun = () => {
		setIsPressed(true);
		if (isPressed === true) {
			setimg('./img/gosling.jpg');
			setHidden(true);
		}
	};

	const onRefreshFun = () => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 3000);
	};

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Home'
				screenOptions={{
					// headerShown: false,
					headerStyle: {
						backgroundColor: '#606C5D',
					},
					headerTintColor: '#F1C376',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					initialParams={{
						itemId: 42,
						otherParam: 'anything you want here',
					}}
					options={({route}: any) => ({
						title: route.params.post,
					})}
				/>
				<Stack.Screen
					name='Details'
					component={DetailsScreen}
					options={({navigation, route}: any) => ({
						headerTitle: () => <LogoTitle />,
						headerRight: () => (
							<Button title='Update count' color='#F7E6C4' />
						),
					})}
				/>
				<Stack.Screen
					name='CreatePost'
					component={CreatePost}
					options={{
						title: 'Create New Post',
						headerStyle: {
							backgroundColor: '#F1C376',
						},
						headerTintColor: '#606C5D',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
					}}
				/>
				<Stack.Group screenOptions={{headerShown: false}}>
					<Stack.Screen name='MainHome' component={Home} />
					<Stack.Screen name='Hotel' component={Hotel} />
				</Stack.Group>
			</Stack.Navigator>

			{/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={20}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar
              animated={true}
              backgroundColor="#606C5D"
              barStyle={'dark-content'}
              showHideTransition={'slide'}
              hidden={hidden}
            />
              <View>
                {number > 0 ? 
                  <>
                    <ActivityIndicator color="#F1C376" size={'large'}/>
                    <Button 
                      title='press me!'
                      color='#F7E6C4'
                      onPress={() => {
                        setNumber(0)
                        setTimeout(() => {
                          console.log('pressed!');
                          setNumber(2)
                        }, 1500);
                      }}
                    />
                  </>
                :
                  <Text> 
                    Загрузилось!
                  </Text>
                }
                <FlatList 
                  data={data}
                  extraData={data}
                  renderItem={({item}) => {
                    return (
                      <Article title={item.title} material={item.material} />
                    );
                  }}
                  keyExtractor={(item) => item.title}
                >
                </FlatList>
                <ScrollView
                  refreshControl={
                  <RefreshControl 
                    refreshing={refreshing}
                    onRefresh={onRefreshFun}
                  />}
                >
                  <Image 
                    style={styles.img}
                    source={{uri: 'https://i.pinimg.com/474x/a0/8f/a8/a08fa85bfa107bcc2d084a48c7106e8b.jpg'}}
                  />
                  <TextInput 
                    onChangeText={(text: string) => setNewArticle(text)}
                    onSubmitEditing={onSubmitEditing}
                    clearTextOnFocus
                  />
                  <Button 
                    title='modal menu on'
                    onPress={() => setModalVisible(true)}
                    color='#F7E6C4'
                  />
                  <Modal
                    animationType='slide'
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    onOrientationChange={() => setModalVisible(false)}
                    // style={styles.modal}
                  >
                    <View style={styles.modal}>
                      <Button 
                        title='modal menu off'
                        onPress={() => setModalVisible(false)}
                        color='#F7E6C4'
                      />
                    </View>
                  </Modal>
                  <Text>
                    {img === './img/gosling.jpg' 
                    ?
                    "RYAN GOLSING!"
                    :
                    null
                    }
                  </Text>
                  <Pressable
                    onPressIn={onPressFun}
                    onPressOut={() => {setimg('./img/pressme.png'); setHidden(false)}}
                  >
                    <Image
                      style={styles.bigImg}
                      source={img === './img/pressme.png' ? require('./img/pressme.png') : require('./img/gosling.jpg')}
                    />
                  </Pressable>
                </ScrollView>
              </View>
          </SafeAreaView>
      </KeyboardAvoidingView> */}
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#606C5D',
		padding: 20,
	},
	yellow: {
		color: '#F1C376',
	},
	img: {
		width: 50,
		height: 50,
	},
	bigImg: {
		marginTop: 55,
		maxHeight: 200,
		maxWidth: 200,
	},
	modal: {
		height: '100%',
		width: '100%',
		backgroundColor: '#F1C376',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
});

export default App;
