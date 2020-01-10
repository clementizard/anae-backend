module.exports = {
	apps: [{
		name: 'anae-backend',
		script: './dist/index.js',
		error_file: 'anae-back-error.log',
		out_file: 'anae-back-out.log',
		time: true,
		env: {
			NODE_ENV: 'development',
		},
		env_production: {
			NODE_ENV: 'production',
		},
	}],
};
