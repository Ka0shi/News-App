import {Image} from 'react-native';
import React from 'react';
import HomeScreen from '../HomeScreen/HomeScreen';
import ScreenComponent from '../ScreenComponent/SreenComponent';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomHeader from '../CustomHeader/CustomHeader';
import {getTabIcon, NewsTopics} from '../../functions/newsTopics';

const Tab = createBottomTabNavigator();

//News topics, you can add as many as you want

const TabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName='Home'
			screenOptions={({route}) => ({
				header: () => <CustomHeader title={'News  app'} />,

				// adding icons for tabs
				tabBarIcon: ({focused, color, size}) => {
					let iconName = getTabIcon(route.name);
					return (
						<Image
							source={iconName}
							style={{
								width: 26,
								height: 26,
								tintColor: focused ? '#FF6666' : 'gray',
							}}
						/>
					);
				},
				tabBarActiveTintColor: '#FF6666',
			})}>
			{/* main Home tab */}
			<Tab.Screen name='Home' component={HomeScreen} />
			{/* Other tabs, you can change it in newsTopics.ts */}
			{NewsTopics.map((name: string, i: number) => (
				<Tab.Screen
					name={name}
					key={i}
					component={ScreenComponent}
					initialParams={{
						name: name,
					}}
				/>
			))}
		</Tab.Navigator>
	);
};

export default TabNavigator;
