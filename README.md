# SportVolcei-Frontend

Questo repository contiene il codice sorgente del frontend (l'interfaccia utente) dell'applicazione web SportVolcei per la prenotazione di campi sportivi. È sviluppato con React e Chakra UI.

## Funzionalità Principali
- Registrazione e Login Utente
- Pagina Profilo Utente
- Calendario di prenotazione per campi Padel, Tennis, Calcio
- Gestione inviti a partite
- Visualizzazione delle partite giocate
- Classifiche per sport
- (e altre funzionalità che implementerai...)

## Tecnologie Utilizzate
- React.js
- Chakra UI
- React Router DOM
- Axios
- React Big Calendar
- Chart.js (per i grafici)

## Setup Locale

1.  Clona questo repository:
    ```bash
    git clone [https://github.com/IL_TUO_NOME_UTENTE/SportVolcei-Frontend.git](https://github.com/IL_TUO_NOME_UTENTE/SportVolcei-Frontend.git)
    cd SportVolcei-Frontend
    ```
2.  Installa le dipendenze:
    ```bash
    npm install
    ```
3.  Crea un file `.env` nella root del progetto basandoti su `.env.example` e configura l'URL del tuo backend:
    ```
    REACT_APP_API_URL=http://localhost:5000/api
    ```
    (Sostituisci `http://localhost:5000/api` con l'URL del tuo backend se lo stai testando in locale e non è su quella porta/path)

4.  Avvia l'applicazione in modalità sviluppo:
    ```bash
    npm start
    ```
    L'applicazione sarà disponibile su `http://localhost:3000`.

## Deployment
Il frontend è configurato per essere deployato facilmente su servizi come Vercel o Netlify. Assicurati di impostare la variabile d'ambiente `REACT_APP_API_URL` con l'URL del tuo backend deployato.