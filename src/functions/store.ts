import {create} from 'zustand';
import {ArticleProps, StoreArticle} from '../interfaces/screenInterfaces';

export const useArticleStore = create<StoreArticle>((set) => ({
	page: 0,
	nextPage: (page) => set({page: page}),
}));
