//react
import React, { useEffect } from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

//Splash screen
import SplashScreen from 'react-native-splash-screen'

//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//components
import ArticlePageComponent from './src/components/NewsComponent/ArticlePageComponent/ArticlePageComponent';
import ArticleComponent from './src/components/NewsComponent/ArticleComponent/ArticleComponent';
import TabNavigator from './src/components/TabNavigator/TabNavigator';
import { Platform } from 'react-native';

//React navigation variables
const Stack = createNativeStackNavigator();

//React query variables
export const queryClient = new QueryClient();

//The App
const App = () => {
	useEffect(() => {
		if (Platform.OS == 'android'){
			SplashScreen.hide();
		}
	}, [])
	
	
	return (
		<QueryClientProvider client={queryClient}>
			{/* It is necessary in order to move between windows not through tab navigation */}
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName='TabNavigator'
					screenOptions={{
						headerShown: false,
					}}>
					<Stack.Screen
						name='ArticlePage'
						component={ArticlePageComponent}
						options={{
							animation: 'slide_from_right',
						}}
					/>
					<Stack.Screen
						name='ArticleComponent'
						component={ArticleComponent}
						options={{
							animation: 'slide_from_right',
						}}
					/>
					{/* contains all screens that use tab navigation */}
					<Stack.Screen
						name='TabNavigator'
						component={TabNavigator}
						options={{
							animation: 'slide_from_right',
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</QueryClientProvider>
	);
};

export default App;
