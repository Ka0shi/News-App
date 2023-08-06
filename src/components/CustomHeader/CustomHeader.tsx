import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles';

const CustomHeader = ({title}: {title: string}) => {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerTitle}>{title}</Text>
		</View>
	);
};

export default CustomHeader;
