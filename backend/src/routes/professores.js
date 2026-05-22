const express = require('express');
const router = express.Router();

const supabase = require('../config/supabase');

// Listar professores
router.get('/', async (req, res) => {
    const {data, error} = await supabase
        .from('professores')
        .select('*');

    if (error) {
        return res.status(500).json({error: error.message});
    }

    res.json(data);
});

//Inserir professor
router.post('/', async (req, res) => {
    const {nome, disciplina, email} = req.body;

    const {data,error} = await supabase
        .from('professores')
        .insert([{nome, disciplina, email}]);

    if (error) {
        return res.status(500).json(error);
    }

    res.status(201).json(data);
});

//Deletar professor
router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    const {data, error} = await supabase
    .from('professores')
    .delete()
    .eq('id', id);

    if(error) {
        return res.status(500).json(error);
    }

    res.json({message: 'Professor deletado com sucesso'});
});

// Editar professor
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, disciplina, email} = req.body;

    const {data, error} = await supabase
    .from('professores')
    .update({nome, disciplina, email})
    .eq('id', id);

    if(error) {
        return res.status(500).json(error);
    }

    res.status(201).json(data);
});

module.exports = router;