/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

const { GOOGLE_CLOUD_CREDENTIALS, GOOGLE_CLOUD_KEYFILE } = process.env;

fs.writeFile(GOOGLE_CLOUD_CREDENTIALS, GOOGLE_CLOUD_KEYFILE, (err) =>
	console.log(err)
);
