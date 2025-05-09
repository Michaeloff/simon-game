import express from 'express';

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Your other routes can go here

app.listen(3000, () => {
  console.log('Express server running on http://localhost:3000');
});


/*import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// These lines are needed to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the current directory
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});*/