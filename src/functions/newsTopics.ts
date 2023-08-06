export const NewsTopics: string[] = ['Apple', 'Twitter', 'Tesla'];

export const getTabIcon = (routeName: string) => {
	switch (routeName) {
		case 'Home':
			return require('../icons/Home.jpg');
		case 'Tesla':
			return require('../icons/Tesla.png');
		case 'Twitter':
			return require('../icons/Twitter.jpg');
		case 'Apple':
			return require('../icons/Apple.jpg');
		default:
			return null;
	}
};
