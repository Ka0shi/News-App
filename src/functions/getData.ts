import axios from 'axios';

const getData = async (name: string) => {
	const {data} = await axios.get(
		`https://newsapi.org/v2/everything?q=${name}&pageSize=50&apiKey=5cfc126c8bd147a19cc9fec2c45fbe0f`,
	);

	return data;
};

export default getData;
