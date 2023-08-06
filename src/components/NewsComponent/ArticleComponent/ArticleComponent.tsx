import {View, Text, ActivityIndicator, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../../../styles';
import {useNavigation} from '@react-navigation/native';

const ArticleComponent = ({
	author,
	title,
	description,
	url,
	urlToImage,
	publishedAt,
	isTop,
	isFirst,
}: any) => {
	const navigation = useNavigation<any>();
	const unknownImgUrl =
		'https://gizchina.it/wp-content/uploads/2021/10/nothing-phone-1-smartphone-ex-oneplus-dettagli-01.jpg';

	// shortening the header to n number of characters
	const maxTitleLength = 60;
	title.length > maxTitleLength
		? (title = title.substring(0, maxTitleLength - 3) + '...')
		: null;

	// remove tags from description
	const regex = /<[^>]*>/g;
	description = description.replace(regex, '');

	return (
		<Pressable
			onPress={() =>
				navigation.navigate('ArticlePage', {
					author,
					title,
					description,
					url,
					urlToImage,
					publishedAt,
				})
			}>
			<View
				style={
					isTop
						? [
								styles.article,
								styles.topScrollArticles,
								isFirst ? styles.firstArticle : null,
						  ]
						: [styles.article, styles.scrollArticles]
				}>
				<Image
					style={
						isTop
							? [styles.articleImg, styles.topScrollArticlesImg]
							: styles.articleImg
					}
					source={
						urlToImage != null
							? {uri: urlToImage}
							: {uri: unknownImgUrl}
					}
				/>
				<Text style={styles.h1}>{title}</Text>
			</View>
		</Pressable>
	);
};

export default ArticleComponent;
