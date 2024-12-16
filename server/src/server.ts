// server/src/server.ts

import app from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 5009;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
