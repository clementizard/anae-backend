import mongoose from 'mongoose';
import chalk from 'chalk';

mongoose.Promise = global.Promise;

let dbAuth = '';
let dbAuthSource = '';
if (process.env.DB_USERNAME) {
	dbAuth = `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@`;
	dbAuthSource = '?authSource=admin';
}
const uri = `mongodb://${dbAuth}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}${dbAuthSource}`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log(chalk.keyword('blue')(`Connected to mongo at ${uri}`)));

// sudo systemctl restart/enable/stop... mongodb

// mongo -u anae -p "%U9p3yZ;5" --authenticationDatabase admin
