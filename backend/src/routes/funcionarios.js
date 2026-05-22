const express = require('express');
const router = express.Router();

const supabase = require('../config/supabase');

// Listar funcionários
router.get('/', async (req, res) => {
    const {data, error} = await supabase
        .from('funcionarios')
        .select('*');

    if (error) {
        return res.status(500).json({error: error.message});
    }

    res.json(data);
});

//Inserir funcionário
router.post('/', async (req, res) => {
    const {nome, cargo, email} = req.body;

    const {data,error} = await supabase
        .from('funcionarios')
        .insert([{nome, cargo, email}]);

    if (error) {
        return res.status(500).json(error);
    }

    res.status(201).json(data);
});

//Deletar funcionário
router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    const {data, error} = await supabase
    .from('funcionarios')
    .delete()
    .eq('id', id);

    if(error) {
        return res.status(500).json(error);
    }

    res.json({message: 'Funcionário deletado com sucesso'});
});

// Editar funcionário
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, cargo, email} = req.body;

    const {data, error} = await supabase
    .from('funcionarios')
    .update({nome, cargo, email})
    .eq('id', id);

    if(error) {
        return res.status(500).json(error);
    }

    res.status(201).json(data);
});

module.exports = router;