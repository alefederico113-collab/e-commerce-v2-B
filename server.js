const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sostituisci con i dati che trovi in Project Settings -> API su Supabase
const supabaseUrl = 'https://supabase.com/dashboard/project/exnxsxswtspnygdbimxc/settings/general';
const supabaseKey = 'exnxsxswtspnygdbimxc';
const supabase = createClient(supabaseUrl, supabaseKey);

// ESEMPIO: Ottenere i prodotti (Robustezza: gestione errori inclusa)
app.get('/api/products', async (req, res) => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// ESEMPIO: Acquistare un prodotto (Sicurezza: controlli "under the hood")
app.post('/api/buy', async (req, res) => {
    const { userId, productId } = req.body;

    // 1. Recupera prodotto e utente da Supabase
    const { data: product } = await supabase.from('products').select('*').eq('id', productId).single();
    const { data: user } = await supabase.from('users').select('*').eq('id', userId).single();

    // 2. Controllo Robustezza
    if (product.stock <= 0) return res.status(400).json({ error: "Esaurito!" });
    if (user.credits < product.price) return res.status(400).json({ error: "Crediti insufficienti!" });

    // 3. Esegui l'operazione (Logica del database)
    await supabase.from('products').update({ stock: product.stock - 1 }).eq('id', productId);
    await supabase.from('users').update({ credits: user.credits - product.price }).eq('id', userId);

    res.json({ message: "Acquisto completato!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server pronto sulla porta ${PORT}`));
async function seedDatabase() {
    const { data, error } = await supabase
        .from('products')
        .insert([
            { name: 'Laptop Pro', price: 1200, stock: 5 },
            { name: 'Smartphone Plus', price: 800, stock: 10 },
            { name: 'Cuffie Wireless', price: 150, stock: 20 }
        ]);
    
    if (error) console.log("Errore seed:", error);
    else console.log("✅ Prodotti iniziali caricati!");
}

// Chiamala una volta sola e poi commentala
// seedDatabase();
