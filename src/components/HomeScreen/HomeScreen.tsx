import {
	View,
	Text,
	ScrollView,
	RefreshControl,
	ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useQuery} from 'react-query';
import ArticleComponent from '../NewsComponent/ArticleComponent/ArticleComponent';
import {styles} from '../../styles';
import getData from '../../functions/getData';
import ScrollNews from './ScrollNews/ScrollNews';

const HomeScreen = () => {
	const {data, isLoading, isError, refetch} = useQuery(['articles'], () =>
		getData('a'),
	);
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		refetch();
		setRefreshing(false);
	}, [refetch]);

	if (isLoading) {
		return <ActivityIndicator size={'large'} color={'#FF6666'} />;
	}

	if (isError) {
		return <Text>Error</Text>;
	}

	return (
		<View style={styles.container}>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				style={styles.ArticlesContainer}
				key={Math.floor(Math.random() * 11111)}>
                    
				{/* top scroll news */}
				<ScrollNews name='USA' />

				{/* rest news */}
				{data.articles.map(
					(article: (typeof data.articles)[0], i: number) => {
						const {
							author,
							title,
							description,
							url,
							urlToImage,
							publishedAt,
						} = article;
						return (
							<ArticleComponent
								key={i}
								author={author}
								title={title}
								description={description}
								url={url}
								urlToImage={urlToImage}
								publishedAt={publishedAt}
								isTop={false}
							/>
						);
					},
				)}
			</ScrollView>
		</View>
	);
};

export default HomeScreen;
