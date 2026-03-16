const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors()); 
app.use(express.json());

// CONFIGURAZIONE SUPABASE
const supabaseUrl = 'https://exnxsxswtspnygdbimxc.supabase.co';
// !!! METTI QUI LA TUA CHIAVE ANON PUBLIC DI SUPABASE !!!
const supabaseKey = 'sb_publishable_DuGHSJx7YURPLlx9Bsj6cA_29A7sSJe'; 

const supabase = createClient(supabaseUrl, supabaseKey);

// ROTTE
app.get('/api/products', async (req, res) => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) return res.status(500).json(error);
    res.json(data);
});

app.post('/api/admin/products', async (req, res) => {
    const { name, price, stock } = req.body;
    const { data, error } = await supabase.from('products').insert([{ name, price, stock }]);
    if (error) return res.status(500).json(error);
    res.json({ message: "Prodotto aggiunto!", data });
});

app.post('/api/admin/bonus', (req, res) => {
    const { amount } = req.body;
    res.json({ message: `Assegnati ${amount} crediti bonus!` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server acceso sulla porta ${PORT}`));