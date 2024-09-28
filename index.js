// import config from "./config/index.js";
// import connectDB from "./config/db.js";

// import app from "./app.js";

// connectDB();

// const port = config.port || 4000;

// app.listen(port, () => {
// 	console.log(`Server is listening on port ${port}`);
// });


import config from "./config/index.js";
import connectDB from "./config/db.js";
import app from "./app.js";

// Connect to the database
connectDB();

// Instead of listening on a port, export the app
export default app;


