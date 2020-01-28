import Mutation from 'GraphQl/InstaAccount/resolvers/mutation';

const startInterval = () => {
	setInterval(async () => {
		const result = await Mutation.updateInstaAccount(null, { username: 'anae.me' });
		console.log('RESULT OF UPDATED ANAE.ME ACCOUNT: ', JSON.stringify(result));
	}, 1000 * 60 * 60 * 24); // 1 day
};

process.on('message', (msg) => {
	switch (msg) {
		case 'start':
			startInterval();
			break;
		default: break;
	}
});
