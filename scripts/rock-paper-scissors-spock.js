
      // Liste di citazioni per i tre diversi scenari finali
      const citazioniKirk = [
        '"Il cambiamento è la legge essenziale della vita. Chi guarda solo al passato o al presente, perderà sicuramente il futuro. [James T. Kirk]"',
        '"Il genio non lavora a catena di montaggio. Non si può dire: adesso produco un po’ di genialità. [James T. Kirk]"',
        '"Il rischio è il nostro mestiere. È questo che rende bella questa nave. È per questo che ci siamo saliti. [James T. Kirk]"',
        '"A volte una sensazione è tutto ciò che gli umani hanno a disposizione. [James T. Kirk]"'
      ];

      const citazioniSpock = [
        '"Il bisogno dei molti surclassa il bisogno dei pochi... o del singolo. [Spock]"',
        '"Trovo che gli umani abbiano un’allarmante tendenza a sostituire i fatti con i desideri. [Spock]"',
        '"Una volta escluso l’impossibile, ciò che resta, per quanto improbabile, deve essere la verità. [Spock]"',
        '"Il cambiamento è il processo mediante il quale il futuro invade le nostre vite. [Spock]"'
      ];

      const citazioniTBBT = [
        '"Bazinga! Questo è il perfetto equilibrio tra una risata e una crisi esistenziale. [The Big Bang Theory]"',
        '"Le forbici tagliano la carta, la carta avvolge il sasso... ma niente batte una perfetta situazione di stallo logico [The Big Bang Theory]"',
        '"Non sono pazzo, mia madre mi ha fatto controllare! Ma questo pareggio mi fa dubitare dei test. [The Big Bang Theory]"',
        '"Il sasso schiaccia le forbici, Spock vaporizza il sasso. Ma qui, abbiamo vaporizzato ogni possibilità di vittoria. [The Big Bange Theory]"'
      ];





      // Recupero:
      // -> Riferimento al paragrafo fornendo la chiave registrata in memoria locale
      let secondiTotali = 0;
      let idIntervalloTimer = null; // Memorizza l'identificativo del timer per poterlo fermare
      let partitaIniziata = false;  // Ci serve per far partire il timer SOLO alla prima mossa
      let score = JSON.parse(localStorage.getItem('score'));
      if (!score){
        score = {
          wins: 0,
          losses: 0,
          ties: 0
        }
      };

      // Recupero il limite di partite dal localStorage (default 10 se vuoto). 
      let stringMatch = localStorage.getItem('maxMatches'); 
      let numMatch = parseInt(stringMatch, 10) || 10; 

      // Mostro all'utente il limite attuale dentro il campo di input
      const inputMatch = document.querySelector('.js-counterMatch');
      inputMatch.value = numMatch;

      // Recupero riferimento ai campi di testo dei contatori, ne popolo il contenuto con i punteggi e inizializzo i Listeners.
      updateScoreElement();
      setupEventListeners();

      function playGame(playerMove){

      // CONTROLLO AVVIO: Se è la prima mossa in assoluto, fa partire il timer
        if (!partitaIniziata) {
          partitaIniziata = true;
          secondiTotali = 0; // Azzera il contatore per sicurezza
          avviaCronometro();
        }

        let cpuMove = createCpuMove(); // genera casualmente una mossa tra le 5 disponibili
        let result = '';

        // Verifica regole
        if (playerMove === 'sasso'){
          result = checkSasso(cpuMove);
        }else if (playerMove === 'carta'){
          result = checkCarta(cpuMove);
        }else if (playerMove === 'forbici'){
          result = checkForbici(cpuMove);
        }else if (playerMove === 'lizard'){
          result = checkLizard(cpuMove);
        }else if(playerMove === 'spock'){
          result = checkSpock(cpuMove);
        }

        // Incremento i contatori
        if(result === 'win'){
          score.wins +=1 ;
        }else if(result === 'lose'){
          score.losses += 1;
        }else if(result === 'tie'){
          score.ties += 1;
        }

        // Aggiorno la grafica dei contatori parziali prima di controllare la fine del match
        updateScoreElement();

        // Popolo i nomi delle mosse e le immagini nel DOM
        document.querySelector('.js-player-move').textContent = playerMove;
        document.querySelector('.js-cpu-move').textContent = cpuMove;
        document.querySelector('.js-img-player-move').src = `images/moves-card-view/${playerMove}-move.jpg`;
        document.querySelector('.js-img-cpu-move').src = `images/moves-card-view/${cpuMove}-move.jpg`;

        //Aggiorna il testo e il colore dell'esito del round in modo smooth
        updateRoundResultElement(result, playerMove, cpuMove);
        // Illumina il vincitore di arancione
        colorCardWinner(result);


        //Il gioco finisce se qualcuno vince la serie OPPURE se siamo in pareggio perfetto a metà
        const metaPartite = numMatch / 2;
        const ePareggioSerie = (score.wins === metaPartite && score.losses === metaPartite);

        if (score.wins === numMatch || score.losses === numMatch || ePareggioSerie){

          // CONTROLLO ARRESTO: La partita è finita, fermiamo il timer immediatamente
            clearInterval(idIntervalloTimer);
            partitaIniziata = false;



          // Mostro l'esito finale della partita prima di azzerare i dati logici con la cardView di riferimento.
          editResultCardView();

          // Azzero i punteggi logici
          score.wins = 0;
          score.losses = 0;
          score.ties = 0;

          //Svuoto la memoria locale
          localStorage.removeItem('score');
          localStorage.removeItem('maxMatches');

          // Reset visivo dell'input al valore standard
          numMatch = 10;
          inputMatch.value = 10;

          // Aggiorno la grafica riportando i contatori a 0
          updateScoreElement();

        }else{
          // Se la serie continua, salva normalmente il punteggio corrente del round
          localStorage.setItem('score', JSON.stringify(score));
        }
      }



    // Popolo i contatori vittorie, sconfitta, pareggi con i risultati
      function updateScoreElement(){
        document.querySelector('.js-player-score').textContent = score.wins;
        document.querySelector('.js-cpu-score').textContent = score.losses;
        document.querySelector('.js-tie-score').textContent = score.ties;
      }


      // Listener per l'input del numero di partite (attivo con TAB o Click Fuori)
      function setupEventListeners(){
        inputMatch.addEventListener('blur', function(){
          const enteredValue = parseInt(inputMatch.value, 10);
          if(!isNaN(enteredValue) && enteredValue > 0){
            numMatch = enteredValue;
            localStorage.setItem('maxMatches', numMatch);
          }else{
            inputMatch.value = numMatch;
          }
        })
      }




      function checkSasso(cpuMove){

        let result = '';

        if(cpuMove === 'forbici'){
            result = 'win';
        }else if (cpuMove === 'lizard' ){
            result = "win";
        }else if (cpuMove === 'carta'){
            result = 'lose';
        }else if(cpuMove === 'spock'){
            result = "lose";
        }else if(cpuMove === 'sasso'){
            result = 'tie';
        }
        return result;
      }

      function checkCarta(cpuMove){

        let result = '';

        if(cpuMove === 'sasso'){
          result = 'win';
        }else if (cpuMove === 'spock'){
          result = 'win';
        }else if(cpuMove === 'forbici'){
          result = 'lose';
        }else if(cpuMove === 'lizard'){
          result = 'lose';
        }else if(cpuMove === 'carta'){
          result = 'tie';
        }
        return result;
      }



      function checkForbici(cpuMove){

        let result = '';

        if(cpuMove === 'carta'){
          result = 'win';
        }else if(cpuMove === 'lizard'){
          result = 'win';
        }else if (cpuMove === 'sasso'){
          result = 'lose';
        }else if(cpuMove === 'spock'){
          result = 'lose';
        }else if(cpuMove === 'forbici'){
          result = 'tie';
        }
        return result;
      }

      function checkLizard(cpuMove){

        let result = '';

        if(cpuMove === 'carta'){
          result = 'win';
        }else if(cpuMove === 'spock'){
          result = 'win';
        }else if(cpuMove === 'sasso'){
          result = 'lose';
        }else if(cpuMove === 'forbici'){
          result = 'lose';
        }else if (cpuMove === 'lizard'){
          result = 'tie';
        }
        return result;
      }


      function checkSpock(cpuMove){

          let result = '';

          if(cpuMove === 'sasso'){
            result = 'win';
          }else if(cpuMove === 'forbici'){
            result = 'win';
          }else if(cpuMove === 'carta'){
            result = 'lose';
          }else if(cpuMove === 'lizard'){
            result = 'lose';
          }else if(cpuMove === 'spock'){
            result = 'tie';
          }
          return result;
      }


      function createCpuMove(){
        // Genera un numero intero casuale compreso tra 1 e 5
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        let cpuMove = '';
        // Associo a ogni numero una mossa specifica usando lo switch
        switch(randomNumber){
          case 1:
            cpuMove = 'sasso';
            break;
          case 2:
            cpuMove = 'carta';
            break;
          case 3:
            cpuMove = 'forbici';
            break;
          case 4:
            cpuMove = 'lizard';
            break;
          case 5:
            cpuMove = 'spock';
            break;
        }
        return cpuMove;
      }


      // Controlliamo il risultato del turno attuale e illuminiamo il vincitore in base al verdetto
      function colorCardWinner(resultMatch){
        const playerCard = document.querySelector('.card-view-result-player');
        const cpuCard = document.querySelector('.card-view-result-CPU'); 

        playerCard.classList.remove('is-winner');
        cpuCard.classList.remove('is-winner');

        if (resultMatch === 'win'){
          playerCard.classList.add('is-winner');
        }else if(resultMatch == 'lose'){
          cpuCard.classList.add('is-winner');
        }
      }


      function editResultCardView() {
        const winContainer = document.querySelector('.container-final-score-img-win');
        const loseContainer = document.querySelector('.container-final-score-img-lose');
        const tieContainer = document.querySelector('.container-final-score-img-tie');

        // Pulizia iniziale degli stati precedenti
        winContainer.classList.remove('is-visible');
        loseContainer.classList.remove('is-visible');
        tieContainer.classList.remove('is-visible');

        // Controlliamo i punteggi per determinare l'esito finale della serie
        if (score.wins === numMatch) {
          winContainer.querySelector('.js-final-status').textContent = 'Esito Finale: Vittoria!';
          // 1. Estraiamo un indice casuale dall'array di Kirk
          const indiceCasuale = Math.floor(Math.random() * citazioniKirk.length);
          // 2. Popoliamo il paragrafo specifico dentro il box vittoria
          winContainer.querySelector('.js-final-quote').textContent = citazioniKirk[indiceCasuale];
          // 3. Mostriamo il box
          winContainer.classList.add('is-visible');

        } else if (score.losses === numMatch) {
          loseContainer.querySelector('.js-final-status').textContent = 'Esito Finale: Sconfitta!';
          // Scenario SCONFITTA (Spock)
          const indiceCasuale = Math.floor(Math.random() * citazioniSpock.length);
          loseContainer.querySelector('.js-final-quote').textContent = citazioniSpock[indiceCasuale];
          loseContainer.classList.add('is-visible');

        } else {
          tieContainer.querySelector('.js-final-status').textContent = 'Esito Finale: Pareggio!';
          // Scenario PAREGGIO DELLA SERIE (The Big Bang Theory)
          const indiceCasuale = Math.floor(Math.random() * citazioniTBBT.length);
          tieContainer.querySelector('.js-final-quote').textContent = citazioniTBBT[indiceCasuale];
          tieContainer.classList.add('is-visible');
        }
      }


    function avviaCronometro() {
      // Esegue il codice all'interno ogni 1000 millisecondi (1 secondo)
      idIntervalloTimer = setInterval(function() {
        secondiTotali++;

        // Calcoliamo i minuti e i secondi rimanenti
        const minuti = Math.floor(secondiTotali / 60);
        const secondi = secondiTotali % 60;

        // Stampiamo il tempo aggiornato sul DOM usando la funzione di formattazione
        document.querySelector('.minute').textContent = formattaTempo(minuti);
        document.querySelector('.second').textContent = formattaTempo(secondi);
      }, 1000);
    }

    // Funzione di utilità: aggiunge uno '0' davanti ai numeri minori di 10 (es: 9 -> "09")
    function formattaTempo(numero) {
        return numero < 10 ? '0' + numero : numero;
    }


  function resetGame() {
    // 1. Azzero i punteggi logici
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    // 2. Svuoto la memoria locale
    localStorage.removeItem('score');
    localStorage.removeItem('maxMatches');

    // 3. Ripristino i valori di default per i match e l'input grafico
    numMatch = 10;
    inputMatch.value = 10;

    // 4. 🕒 Ripristino lo stato del timer e la grafica del tempo
    clearInterval(idIntervalloTimer);
    partitaIniziata = false;
    secondiTotali = 0;
    document.querySelector('.minute').textContent = '00';
    document.querySelector('.second').textContent = '00';

    // 5. Richiamo le funzioni grafiche per aggiornare il tabellone e NASCONDERE i riquadri delle citazioni
    updateScoreElement();
    editResultCardView();

    // Riporta il testo del round allo stato iniziale neutro
    const resultElement = document.querySelector('.js-result');
    resultElement.textContent = 'Scegli la tua mossa!';
    resultElement.classList.remove('result-win', 'result-lose', 'result-tie');
  }



  function updateRoundResultElement(resultMatch, playerMove, cpuMove) {
    const resultElement = document.querySelector('.js-result');

    // Ripuliamo le vecchie classi di colore per azzerare lo stato del round precedente
    resultElement.classList.remove('result-win', 'result-tie');

    // Gestiamo il testo e il colore in base al risultato passato come parametro
    if (resultMatch === 'win') {
      resultElement.classList.add('result-win');
      resultElement.textContent = `Vince ${playerMove}`;

    } else if (resultMatch === 'lose') {
      resultElement.classList.add('result-win');
      resultElement.textContent = `Vince ${cpuMove}`;

    } else if (resultMatch === 'tie') {
      resultElement.classList.add('result-tie');
      resultElement.textContent = 'Pareggio!';
    }
  }
