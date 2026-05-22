const express = require('express');
const cors = require('cors');

// Rota aluno
const alunosRouter = require('./routes/alunos');
// Rota professor
const professoresRouter = require('./routes/professores');
// Rota funcionário
const funcionariosRouter = require('./routes/funcionarios');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/alunos', alunosRouter);
app.use('/professores', professoresRouter);
app.use('/funcionarios', funcionariosRouter);

app.get('/', (req, res) => {
  res.send('API funcionando');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});