const express = require('express');
const router = express.Router();

const supabase = require('../config/supabase');

// Listar alunos
router.get('/', async (req, res) => {
    const {data, error} = await supabase
        .from('alunos')
        .select('*');

    if (error) {
        return res.status(500).json({error: error.message});
    }

    res.json(data);
});

//Inserir aluno
router.post('/', async (req, res) => {
    const {nome, email, turma, idade} = req.body;

    const {data,error} = await supabase
        .from('alunos')
        .insert([{nome, email, turma, idade}]);

    if (error) {
        return res.status(500).json(error);
    }

    res.status(201).json(data);
});

//Deletar aluno
router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    const {data, error} = await supabase
    .from('alunos')
    .delete()
    .eq('id', id);

    if(error) {
        return res.status(500).json(error);
    }

    res.json({message: 'Aluno deletado com sucesso'});
});

// Editar aluno
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, email, turma, idade} = req.body;

    const {data, error} = await supabase
    .from('alunos')
    .update({nome, email, turma, idade})
    .eq('id', id);

    if(error) {
        return res.status(500).json(error);
    }

    res.status(201).json(data);
});

module.exports = router;