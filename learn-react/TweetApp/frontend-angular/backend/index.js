const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

let tasks = [{ id: 1, title: 'First task' }];
app.get('/api/tasks', (_req, res) => res.json(tasks));
app.post('/api/tasks', (req, res) => {
  const next = { id: Date.now(), title: String(req.body?.title || '') };
  tasks.push(next);
  res.status(201).json(next);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on :${port}`));


