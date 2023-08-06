import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../../styles';
import NewsComponent from '../NewsComponent/NewsComponent';

//We use here NewsComponent component as frame for each element
const ScreenComponent = ({route}: any) => {
	const {name} = route.params;

	return (
		<View style={styles.container}>
			<NewsComponent name={name} />
		</View>
	);
};

export default ScreenComponent;
