# 🛒 E-Commerce Distributed Architecture

Progetto per l'esame di Architetture Distribuite. Un sistema e-commerce semplificato con gestione crediti, catalogo prodotti e dashboard amministrativa.

## 🏗️ Architettura del Sistema
Il progetto adotta un'architettura di tipo **Thick Client**.

**Giustificazione:**
- Il **Backend** agisce esclusivamente come API Server, fornendo dati grezzi in formato JSON e gestendo la persistenza e la sicurezza logica.
- Il **Frontend** (sviluppato in Vanilla JS) gestisce interamente la logica di presentazione, il rendering dinamico dei componenti (DOM Manipulation) e lo stato dell'interfaccia utente.
- La separazione netta tra `/frontend` e `/backend` permette una scalabilità indipendente dei due moduli.



---

## 📡 Endpoint API

### Vista Utente (User)
| Metodo | Endpoint | Descrizione |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Ritorna l'elenco completo dei prodotti |
| `GET` | `/api/users/:id` | Ritorna il saldo crediti e info dell'utente |
| `POST` | `/api/buy` | Effettua l'acquisto (detrae crediti e riduce stock) |

### Vista Admin
| Metodo | Endpoint | Descrizione |
| :--- | :--- | :--- |
| `POST` | `/api/admin/products` | Aggiunge un nuovo prodotto al catalogo |
| `PUT` | `/api/admin/products/:id` | Aggiorna lo stock di un prodotto esistente |
| `POST` | `/api/admin/users/:id/credits` | Assegna crediti bonus a un utente |

---

## 🔒 Sicurezza e Controlli Lato Server
Per garantire l'integrità dei dati e prevenire transazioni non valide, il server implementa i seguenti controlli obbligatori sulla rotta `/api/buy`:

1. **Validazione Saldo:** Prima di procedere, il server verifica che i `credits` dell'utente siano maggiori o uguali al `price` del prodotto. In caso contrario, restituisce `400 Bad Request`.
2. **Validazione Stock:** Il server controlla che lo `stock` del prodotto sia `> 0`. Se esaurito, la transazione viene bloccata con errore `400`.
3. **Atomicità (Simulata):** Le operazioni di sottrazione crediti e riduzione stock avvengono in sequenza logica prima del salvataggio su file JSON per evitare incoerenze.



---

## 🤖 Uso dell'IA
L'Intelligenza Artificiale (Gemini/ChatGPT) è stata utilizzata per:
- **Design del CSS:** Creazione di un layout moderno e responsive basato su variabili CSS.
- **Struttura del Backend:** Implementazione delle funzioni asincrone di lettura/scrittura su file (`fs.promises`).
- **Debugging CORS:** Configurazione del middleware per permettere la comunicazione tra domini diversi (GitHub Pages -> Render).

---

## 🔗 Link al Progetto
- **Server Backend (Render/Glitch):** `https://github.com/alefederico113-collab/BACKENDV`
- **Frontend (GitHub Pages):** `https://alefederico113-collab.github.io/FRONTENDV/`
`https://github.com/alefederico113-collab/FRONTENDV`
---

## 🛠️ Istruzioni per l'avvio locale
1. Entrare nella cartella `/backend` ed eseguire `npm install` seguito da `node server.js`.
2. Aprire il file `/frontend/index.html` nel browser (o tramite Live Server).