import {
	View,
	Text,
	ScrollView,
	RefreshControl,
	ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useQuery} from 'react-query';
import ArticleComponent from './ArticleComponent/ArticleComponent';
import {useArticleStore} from '../../functions/store';
import {styles} from '../../styles';
import getData from '../../functions/getData';
import {useNavigation} from '@react-navigation/native';

const NewsComponent = ({name}: {name: string}) => {
	const {data, isLoading, isError, refetch} = useQuery(
		['articles', name],
		() => getData(name),
	);

	//pagination
	const {page, nextPage} = useArticleStore();
	const [activePage, setActivePage] = useState(0);
	const pages = [0, 1, 2, 3, 4];
	const handlePagePress = (pageNumber: number) => {
			nextPage(pageNumber);
			setActivePage(pageNumber);
	};

	//onRefresh
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
		<View>
			{/* articles */}
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				style={styles.ArticlesContainer}
				key={Math.floor(Math.random() * 11111)}>
				{data.articles
					.slice(page * 10, page * 10 + 10)
					.map((article: (typeof data.articles)[0], i: number) => {
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
					})}
			</ScrollView>
			
			{/* pagination */}
			<View style={styles.pagesView}>
				{pages.map((page: number, i: number) => {
					return (
						<Text
							onPress={() => handlePagePress(page)}
							key={i}
							style={
								page == activePage
									? [styles.currentPage]
									: styles.page
							}>
							{(page + 1).toString()}
						</Text>
					);
				})}
			</View>
		</View>
	);
};

export default NewsComponent;
