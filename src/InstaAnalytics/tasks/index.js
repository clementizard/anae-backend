// import chalk from 'chalk';
import { fork } from 'child_process';

const updateAccountPath = process.env.NODE_ENV === 'production' ? './dist' : './src';
const updateAccountFork = fork(`${updateAccountPath}/InstaAnalytics/tasks/updateAccount.js`);

// updateAccountFork.on('message', (msg) => {
// 	console.log(chalk.blue('UPDATE ACCOUNT TASK MESSAGE: '), msg);
// });
updateAccountFork.send('start');
