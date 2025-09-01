const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swaggerDocs')
const winston = require('./utils/logger.js');
const logger = require('./middleware/logger.js');
const errorHandler = require('./errorHandler/error.js');
const authRoute = require('./routes/auth.js');
const appointmentRoutes = require('./routes/appointment.js');
require('dotenv').config();


const connectDB = require('./config/db.js');
const mainRoutes = require('./routes/index');



const app = express();

// Parses incoming JSON request and puts the parsed data in req.body 
app.use(express.json());
// Helmet helps us secure the app by setting HTTP headers
app.use(helmet);
//Cors enables cross-origin requests 
app.use(cors());
// HTTP request loger using winston stream.
app.use('combined', { stream: winston.stream });

// Limist repeated requests to public APIs and/or endpoints
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}))

// Swagger docs served at /api-docs
app.use('/api-docs', swaggerUI.serve)
app.use('/api-docs', swaggerUI.setup(swaggerDocs));
app.use(express.urlencoded());
app.use('/api', mainRoutes);

app.use('/api/auth', authRoute);
app.use('/api/appointments', appointmentRoutes);

app.use(errorHandler);

(async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => winston.info(`Server running at http://localhost:${PORT}`));
  } catch (error) {
    winston.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
})();
