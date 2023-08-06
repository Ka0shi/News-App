import {
	NavigationProp,
	RouteProp,
	ParamListBase,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface ScreenProps {
	navigation: NavigationProp<any>;
	route: RouteProp<ParamListBase, any>;
}

interface ScreenParams {
	name: string;
}

export interface ScreenParamsProps<T extends keyof ParamListBase> {
	navigation: StackNavigationProp<ParamListBase, T>;
	route: RouteProp<ParamListBase, T> & {
		params: ScreenParams;
	};
}

export interface ArticleProps {
	author: string | null;
	title: string | null;
	description: string | null;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	setArticleInfo: (articleInfo: {}) => void;
}

export interface StoreArticle {
	page: number;
	nextPage: (page: number) => void;
}
