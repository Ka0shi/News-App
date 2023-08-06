import {
	View,
	Text,
	Linking,
	Image,
	ActivityIndicator,
	Pressable,
	RefreshControl,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {ArticleProps} from '../../../interfaces/screenInterfaces';
import {ScrollView} from 'react-native';
import {styles} from '../../../styles';
import CustomHeader from '../../CustomHeader/CustomHeader';

const ArticlePageComponent = ({navigation, route}: any) => {
	let {author, title, description, url, urlToImage, publishedAt} =
		route.params || {};
	const unknownImgUrl =
		'https://gizchina.it/wp-content/uploads/2021/10/nothing-phone-1-smartphone-ex-oneplus-dettagli-01.jpg';
	const [imgUrl, setImgUrl] = useState(urlToImage || unknownImgUrl);
	const [readBtnStyle, setReadBtnStyle] = useState<any>(styles.readBtn);

	//onRefresh
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setImgUrl(urlToImage);
			setRefreshing(false);
		}, 100);
	}, []);

	return (
		<View>

			{/* Custom Header */}
			<CustomHeader title={title} />

			{/* Article */}
			<ScrollView
				style={styles.articlePageContainer}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}>
				<Image
					style={styles.articlePageImg}
					source={{uri: imgUrl}}
					key={Math.floor(Math.random() * 11111)}
				/>
				<Text style={styles.smallText}>
					Text was writed by: {author}
				</Text>
				<Text style={styles.smallText}>
					published at: {publishedAt}
				</Text>
				<Text style={styles.boldText}>{description}</Text>

				{/* Button to full article */}
				<Pressable
					onPressIn={() => setReadBtnStyle(styles.readBtnHover)}
					onPressOut={() => setReadBtnStyle(styles.readBtn)}
					onPress={() => Linking.openURL(url)}
					style={readBtnStyle}>
					<Text
						style={{
							color: 'white',
							fontSize: 35,
							fontWeight: 'bold',
						}}>
						READ
					</Text>
				</Pressable>
			</ScrollView>
		</View>
	);
};

export default ArticlePageComponent;
