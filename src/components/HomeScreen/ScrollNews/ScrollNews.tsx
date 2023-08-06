import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React from 'react';
import ArticleComponent from '../../NewsComponent/ArticleComponent/ArticleComponent';
import {useQuery} from 'react-query';
import getData from '../../../functions/getData';
import {styles} from '../../../styles';

//Same as normal ScrollView with articles, but horizontal. 
const ScrollNews = ({name}: {name: string}) => {
	const {data, isLoading, isError} = useQuery(
		['articles', name],
		() => getData(name),
	);

	if (isLoading) {
		return <ActivityIndicator size={'large'} color={'#FF6666'} />;
	}

	if (isError) {
		return <Text>Error</Text>;
	}

	return (
		<View style={styles.scrollNews}>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}>
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
							<View key={i}>
								<ArticleComponent
									author={author}
									title={title}
									description={description}
									url={url}
									urlToImage={urlToImage}
									publishedAt={publishedAt}
									isTop={true}
									isFirst={i == 0 ? true : false}
								/>
							</View>
						);
					},
				)}
			</ScrollView>
		</View>
	);
};

export default ScrollNews;
