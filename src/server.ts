import "reflect-metadata";

import { app } from "./app";

const { ENV = "development", PORT = 3333 } = process.env;

app.listen(PORT, () => {
	console.log(
		`        
\x1b[35m
 ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄   ▄▄   ▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄   
█       █       █   ▄  █ █  █ █  █       █   ▄  █  
█  ▄▄▄▄▄█    ▄▄▄█  █ █ █ █  █▄█  █    ▄▄▄█  █ █ █  
█ █▄▄▄▄▄█   █▄▄▄█   █▄▄█▄█       █   █▄▄▄█   █▄▄█▄ 
█▄▄▄▄▄  █    ▄▄▄█    ▄▄  █       █    ▄▄▄█    ▄▄  █
 ▄▄▄▄▄█ █   █▄▄▄█   █  █ ██     ██   █▄▄▄█   █  █ █
█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█▄▄▄█  █▄█ █▄▄▄█ █▄▄▄▄▄▄▄█▄▄▄█  █▄█ v1.0.0

\x1b[39m
  ------------------------------
\tRunning in:
\x1b\t[92m${ENV.toUpperCase()}\x1b[39m

\tListening at:
\x1b\t[94mhttp://localhost:${PORT}\x1b[39m
  ------------------------------
  `
	);
});
