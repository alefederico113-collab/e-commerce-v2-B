const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors()); 
app.use(express.json());

// CONFIGURAZIONE SUPABASE
const supabaseUrl = 'https://exnxsxswtspnygdbimxc.supabase.co';
// !!! METTI QUI LA TUA CHIAVE ANON PUBLIC DI SUPABASE !!!
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4bnhzeHN3dHNwbnlnZGJpbXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDk1MjEsImV4cCI6MjA4OTE4NTUyMX0.igOa96NnVH4SwImMi_ev8gx2BBzI57EMCRpnSAYjlp8'; 

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