// FutPredict MZ - Sistema de Previsões
// Este arquivo contém as funcionalidades para exibição e atualização de previsões

// Simulação de API de previsões
// Em uma implementação real, isso seria substituído por chamadas a um backend
class PredictionSystem {
    constructor() {
        this.predictions = {};
        this.leagues = [
            'premier-league',
            'champions-league',
            'mocambola',
            'la-liga',
            'serie-a',
            'bundesliga',
            'ligue1',
            'caf'
        ];
        
        // Inicializa dados de previsão
        this.initializePredictions();
    }
    
    // Inicializa dados de previsão simulados
    initializePredictions() {
        // Gera previsões para cada liga
        this.leagues.forEach(league => {
            this.predictions[league] = this.generateLeaguePredictions(league);
        });
    }
    
    // Gera previsões para uma liga específica
    generateLeaguePredictions(league) {
        const matches = [];
        const matchCount = this.getMatchCountForLeague(league);
        
        for (let i = 0; i < matchCount; i++) {
            matches.push(this.generateMatch(league, i));
        }
        
        return matches;
    }
    
    // Determina quantos jogos gerar para cada liga
    getMatchCountForLeague(league) {
        const counts = {
            'premier-league': 10,
            'champions-league': 8,
            'mocambola': 6,
            'la-liga': 10,
            'serie-a': 10,
            'bundesliga': 9,
            'ligue1': 10,
            'caf': 6
        };
        
        return counts[league] || 5;
    }
    
    // Gera um jogo simulado com previsões
    generateMatch(league, index) {
        const teams = this.getTeamsForLeague(league);
        const homeIndex = index * 2 % teams.length;
        const awayIndex = (index * 2 + 1) % teams.length;
        
        const homeTeam = teams[homeIndex];
        const awayTeam = teams[awayIndex];
        
        // Gera horário aleatório
        const hours = Math.floor(Math.random() * 12) + 12; // 12-23
        const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
        const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes} CAT`;
        
        // Gera previsões
        const homeWinProb = Math.floor(Math.random() * 45) + 20; // 20-64%
        const drawProb = Math.floor(Math.random() * 30) + 15; // 15-44%
        const awayWinProb = 100 - homeWinProb - drawProb;
        
        const over25Prob = Math.floor(Math.random() * 40) + 30; // 30-69%
        const under25Prob = 100 - over25Prob;
        
        const bttsYesProb = Math.floor(Math.random() * 40) + 30; // 30-69%
        const bttsNoProb = 100 - bttsYesProb;
        
        // Determina recomendações
        const result1X2Rec = this.getHighestProbOption([
            { option: '1', prob: homeWinProb },
            { option: 'X', prob: drawProb },
            { option: '2', prob: awayWinProb }
        ]);
        
        const resultOverUnderRec = over25Prob > under25Prob ? 'over' : 'under';
        const resultBttsRec = bttsYesProb > bttsNoProb ? 'yes' : 'no';
        
        return {
            id: `match-${league}-${index}`,
            league: league,
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            time: timeString,
            date: this.generateMatchDate(),
            predictions: {
                result1X2: {
                    home: homeWinProb,
                    draw: drawProb,
                    away: awayWinProb,
                    recommended: result1X2Rec
                },
                overUnder: {
                    over: over25Prob,
                    under: under25Prob,
                    recommended: resultOverUnderRec
                },
                btts: {
                    yes: bttsYesProb,
                    no: bttsNoProb,
                    recommended: resultBttsRec
                },
                exactScore: this.generateExactScorePredictions(homeWinProb, drawProb, awayWinProb)
            },
            stats: this.generateMatchStats(homeTeam, awayTeam)
        };
    }
    
    // Retorna a opção com maior probabilidade
    getHighestProbOption(options) {
        return options.reduce((prev, current) => 
            (prev.prob > current.prob) ? prev : current
        ).option;
    }
    
    // Gera previsões de placar exato
    generateExactScorePredictions(homeWinProb, drawProb, awayWinProb) {
        const predictions = [];
        
        // Placares para vitória em casa
        if (homeWinProb > 0) {
            predictions.push({ score: '1-0', probability: Math.round(homeWinProb * 0.3) });
            predictions.push({ score: '2-0', probability: Math.round(homeWinProb * 0.25) });
            predictions.push({ score: '2-1', probability: Math.round(homeWinProb * 0.2) });
            predictions.push({ score: '3-1', probability: Math.round(homeWinProb * 0.15) });
            predictions.push({ score: '3-0', probability: Math.round(homeWinProb * 0.1) });
        }
        
        // Placares para empate
        if (drawProb > 0) {
            predictions.push({ score: '0-0', probability: Math.round(drawProb * 0.4) });
            predictions.push({ score: '1-1', probability: Math.round(drawProb * 0.4) });
            predictions.push({ score: '2-2', probability: Math.round(drawProb * 0.2) });
        }
        
        // Placares para vitória fora
        if (awayWinProb > 0) {
            predictions.push({ score: '0-1', probability: Math.round(awayWinProb * 0.3) });
            predictions.push({ score: '0-2', probability: Math.round(awayWinProb * 0.25) });
            predictions.push({ score: '1-2', probability: Math.round(awayWinProb * 0.2) });
            predictions.push({ score: '1-3', probability: Math.round(awayWinProb * 0.15) });
            predictions.push({ score: '0-3', probability: Math.round(awayWinProb * 0.1) });
        }
        
        // Ordena por probabilidade e pega os 5 mais prováveis
        predictions.sort((a, b) => b.probability - a.probability);
        const topPredictions = predictions.slice(0, 5);
        
        // Determina o placar recomendado (o mais provável)
        const recommended = topPredictions.length > 0 ? topPredictions[0].score : '0-0';
        
        return {
            scores: topPredictions,
            recommended: recommended
        };
    }
    
    // Gera estatísticas para o confronto
    generateMatchStats(homeTeam, awayTeam) {
        return {
            form: {
                home: this.generateTeamForm(),
                away: this.generateTeamForm()
            },
            h2h: this.generateH2H(homeTeam, awayTeam),
            standings: {
                home: Math.floor(Math.random() * 20) + 1,
                away: Math.floor(Math.random() * 20) + 1
            },
            goals: {
                homeScoredAvg: (Math.random() * 2 + 0.5).toFixed(1),
                homeConcededAvg: (Math.random() * 1.5 + 0.3).toFixed(1),
                awayScoredAvg: (Math.random() * 1.8 + 0.4).toFixed(1),
                awayConcededAvg: (Math.random() * 1.7 + 0.5).toFixed(1)
            }
        };
    }
    
    // Gera sequência de forma da equipe (W, D, L)
    generateTeamForm() {
        const results = ['W', 'D', 'L'];
        const form = [];
        
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * results.length);
            form.push(results[randomIndex]);
        }
        
        return form;
    }
    
    // Gera histórico de confrontos diretos
    generateH2H(homeTeam, awayTeam) {
        const matches = [];
        const results = ['home', 'draw', 'away'];
        
        for (let i = 0; i < 5; i++) {
            const result = results[Math.floor(Math.random() * results.length)];
            let score;
            
            if (result === 'home') {
                const homeGoals = Math.floor(Math.random() * 3) + 1;
                const awayGoals = Math.floor(Math.random() * homeGoals);
                score = `${homeGoals}-${awayGoals}`;
            } else if (result === 'away') {
                const awayGoals = Math.floor(Math.random() * 3) + 1;
                const homeGoals = Math.floor(Math.random() * awayGoals);
                score = `${homeGoals}-${awayGoals}`;
            } else {
                const goals = Math.floor(Math.random() * 3);
                score = `${goals}-${goals}`;
            }
            
            // Data do jogo (nos últimos 3 anos)
            const date = new Date();
            date.setFullYear(date.getFullYear() - Math.floor(Math.random() * 3));
            date.setMonth(Math.floor(Math.random() * 12));
            date.setDate(Math.floor(Math.random() * 28) + 1);
            
            matches.push({
                date: date.toLocaleDateString('pt-MZ'),
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                score: score,
                result: result
            });
        }
        
        return matches;
    }
    
    // Gera uma data para o jogo (próximos 7 dias)
    generateMatchDate() {
        const date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * 7));
        return date.toLocaleDateString('pt-MZ');
    }
    
    // Retorna times para cada liga
    getTeamsForLeague(league) {
        const teams = {
            'premier-league': [
                { name: 'Man United', logo: 'team1.png' },
                { name: 'Liverpool', logo: 'team2.png' },
                { name: 'Arsenal', logo: 'team7.png' },
                { name: 'Chelsea', logo: 'team8.png' },
                { name: 'Man City', logo: 'team9.png' },
                { name: 'Tottenham', logo: 'team10.png' },
                { name: 'Newcastle', logo: 'team13.png' },
                { name: 'Aston Villa', logo: 'team14.png' },
                { name: 'West Ham', logo: 'team15.png' },
                { name: 'Brighton', logo: 'team16.png' }
            ],
            'champions-league': [
                { name: 'Barcelona', logo: 'team3.png' },
                { name: 'Bayern', logo: 'team4.png' },
                { name: 'Real Madrid', logo: 'team11.png' },
                { name: 'PSG', logo: 'team12.png' },
                { name: 'Man City', logo: 'team9.png' },
                { name: 'Inter', logo: 'team17.png' },
                { name: 'Dortmund', logo: 'team18.png' },
                { name: 'Atlético', logo: 'team19.png' }
            ],
            'mocambola': [
                { name: 'Ferroviário', logo: 'team5.png' },
                { name: 'Costa do Sol', logo: 'team6.png' },
                { name: 'Black Bulls', logo: 'team20.png' },
                { name: 'Maxaquene', logo: 'team21.png' },
                { name: 'Liga Desportiva', logo: 'team22.png' },
                { name: 'Textáfrica', logo: 'team23.png' }
            ],
            'la-liga': [
                { name: 'Barcelona', logo: 'team3.png' },
                { name: 'Real Madrid', logo: 'team11.png' },
                { name: 'Atlético', logo: 'team19.png' },
                { name: 'Sevilla', logo: 'team24.png' },
                { name: 'Villarreal', logo: 'team25.png' },
                { name: 'Real Sociedad', logo: 'team26.png' },
                { name: 'Athletic Bilbao', logo: 'team27.png' },
                { name: 'Valencia', logo: 'team28.png' },
                { name: 'Betis', logo: 'team29.png' },
                { name: 'Espanyol', logo: 'team30.png' }
            ],
            'serie-a': [
                { name: 'Inter', logo: 'team17.png' },
                { name: 'Milan', logo: 'team31.png' },
                { name: 'Juventus', logo: 'team32.png' },
                { name: 'Napoli', logo: 'team33.png' },
                { name: 'Roma', logo: 'team34.png' },
                { name: 'Lazio', logo: 'team35.png' },
                { name: 'Atalanta', logo: 'team36.png' },
                { name: 'Fiorentina', logo: 'team37.png' },
                { name: 'Bologna', logo: 'team38.png' },
                { name: 'Torino', logo: 'team39.png' }
            ],
            'bundesliga': [
                { name: 'Bayern', logo: 'team4.png' },
                { name: 'Dortmund', logo: 'team18.png' },
                { name: 'Leipzig', logo: 'team40.png' },
                { name: 'Leverkusen', logo: 'team41.png' },
                { name: 'Wolfsburg', logo: 'team42.png' },
                { name: 'Gladbach', logo: 'team43.png' },
                { name: 'Frankfurt', logo: 'team44.png' },
                { name: 'Stuttgart', logo: 'team45.png' },
                { name: 'Union Berlin', logo: 'team46.png' }
            ],
            'ligue1': [
                { name: 'PSG', logo: 'team12.png' },
                { name: 'Marseille', logo: 'team47.png' },
                { name: 'Lyon', logo: 'team48.png' },
                { name: 'Monaco', logo: 'team49.png' },
                { name: 'Lille', logo: 'team50.png' },
                { name: 'Rennes', logo: 'team51.png' },
                { name: 'Nice', logo: 'team52.png' },
                { name: 'Lens', logo: 'team53.png' },
                { name: 'Strasbourg', logo: 'team54.png' },
                { name: 'Nantes', logo: 'team55.png' }
            ],
            'caf': [
                { name: 'Al Ahly', logo: 'team56.png' },
                { name: 'Zamalek', logo: 'team57.png' },
                { name: 'Esperance', logo: 'team58.png' },
                { name: 'Wydad', logo: 'team59.png' },
                { name: 'Mamelodi', logo: 'team60.png' },
                { name: 'TP Mazembe', logo: 'team61.png' }
            ]
        };
        
        return teams[league] || [];
    }
    
    // Obtém previsões para uma liga específica
    getPredictionsByLeague(league) {
        if (league === 'all') {
            // Retorna todas as previsões
            const allPredictions = [];
            this.leagues.forEach(leagueKey => {
                allPredictions.push(...this.predictions[leagueKey]);
            });
            return allPredictions;
        }
        
        return this.predictions[league] || [];
    }
    
    // Obtém previsões para um jogo específico por ID
    getPredictionById(matchId) {
        for (const league in this.predictions) {
            const match = this.predictions[league].find(m => m.id === matchId);
            if (match) return match;
        }
        return null;
    }
    
    // Filtra previsões por data
    getPredictionsByDate(dateFilter) {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        
        const todayStr = today.toLocaleDateString('pt-MZ');
        const tomorrowStr = tomorrow.toLocaleDateString('pt-MZ');
        
        const allPredictions = [];
        this.leagues.forEach(league => {
            allPredictions.push(...this.predictions[league]);
        });
        
        if (dateFilter === 'today') {
            return allPredictions.filter(match => match.date === todayStr);
        } else if (dateFilter === 'tomorrow') {
            return allPredictions.filter(match => match.date === tomorrowStr);
        } else if (dateFilter === 'week') {
            // Próximos 7 dias
            const nextWeek = new Date();
            nextWeek.setDate(today.getDate() + 7);
            
            return allPredictions.filter(match => {
                const matchDate = new Date(match.date.split('/').reverse().join('-'));
                return matchDate >= today && matchDate <= nextWeek;
            });
        }
        
        return allPredictions;
    }
    
    // Filtra previsões por tipo de aposta
    getPredictionsByBetType(betType, predictions) {
        if (betType === 'all') return predictions;
        
        // Copia as previsões mas mantém apenas o tipo de aposta solicitado
        return predictions.map(match => {
            const newMatch = {...match};
            
            if (betType === '1x2') {
                newMatch.predictions = {
                    result1X2: match.predictions.result1X2
                };
            } else if (betType === 'over-under') {
                newMatch.predictions = {
                    overUnder: match.predictions.overUnder
                };
            } else if (betType === 'btts') {
                newMatch.predictions = {
                    btts: match.predictions.btts
                };
            } else if (betType === 'exact-score') {
                newMatch.predictions = {
                    exactScore: match.predictions.exactScore
                };
            }
            
            return newMatch;
        });
    }
    
    // Atualiza as previsões com pequenas variações para simular atualizações em tempo real
    updatePredictions() {
        for (const league in this.predictions) {
            this.predictions[league].forEach(match => {
                // Atualiza 1X2
                this.updatePredictionValue(match.predictions.result1X2, 'home');
                this.updatePredictionValue(match.predictions.result1X2, 'draw');
                this.updatePredictionValue(match.predictions.result1X2, 'away');
                
                // Recalcula recomendação
                match.predictions.result1X2.recommended = this.getHighestProbOption([
                    { option: '1', prob: match.predictions.result1X2.home },
                    { option: 'X', prob: match.predictions.result1X2.draw },
                    { option: '2', prob: match.predictions.result1X2.away }
                ]);
                
                // Atualiza Over/Under
                this.updatePredictionValue(match.predictions.overUnder, 'over');
                match.predictions.overUnder.under = 100 - match.predictions.overUnder.over;
                match.predictions.overUnder.recommended = 
                    match.predictions.overUnder.over > match.predictions.overUnder.under ? 'over' : 'under';
                
                // Atualiza BTTS
                this.updatePredictionValue(match.predictions.btts, 'yes');
                match.predictions.btts.no = 100 - match.predictions.btts.yes;
                match.predictions.btts.recommended = 
                    match.predictions.btts.yes > match.predictions.btts.no ? 'yes' : 'no';
            });
        }
    }
    
    // Atualiza um valor de previsão com uma pequena variação
    updatePredictionValue(predictionObj, key) {
        const variation = Math.floor(Math.random() * 5) - 2; // -2 a +2
        predictionObj[key] = Math.max(1, Math.min(99, predictionObj[key] + variation));
        return predictionObj[key];
    }
}

// Inicializa o sistema de previsões quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Cria instância do sistema de previsões
    window.predictionSystem = new PredictionSystem();
    
    // Atualiza previsões a cada 30 segundos para simular dados em tempo real
    setInterval(function() {
        window.predictionSystem.updatePredictions();
        
        // Dispara evento personalizado para notificar que as previsões foram atualizadas
        const event = new CustomEvent('predictionsUpdated');
        document.dispatchEvent(event);
    }, 30000);
    
    // Inicializa filtros na página de previsões
    initializeFilters();
    
    // Inicializa jogos em destaque na página inicial
    updateFeaturedMatches();
});

// Inicializa os filtros na página de previsões
function initializeFilters() {
    // Verifica se estamos na página de previsões
    const leagueSelect = document.getElementById('league-select');
    const betTypeSelect = document.getElementById('bet-type-select');
    const dateButtons = document.querySelectorAll('.date-btn');
    
    if (leagueSelect && betTypeSelect) {
        // Adiciona event listeners para os filtros
        leagueSelect.addEventListener('change', applyFilters);
        betTypeSelect.addEventListener('change', applyFilters);
        
        dateButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove a classe active de todos os botões
                dateButtons.forEach(btn => btn.classList.remove('active'));
                // Adiciona a classe active ao botão clicado
                this.classList.add('active');
                
                // Aplica os filtros
                applyFilters();
            });
        });
        
        // Aplica os filtros iniciais
        applyFilters();
    }
}

// Aplica os filtros e atualiza a exibição das previsões
function applyFilters() {
    // Obtém os valores dos filtros
    const leagueFilter = document.getElementById('league-select').value;
    const betTypeFilter = document.getElementById('bet-type-select').value;
    
    // Obtém o filtro de data ativo
    const activeDateButton = document.querySelector('.date-btn.active');
    let dateFilter = 'today';
    
    if (activeDateButton) {
        const buttonText = activeDateButton.textContent.trim().toLowerCase();
        if (buttonText.includes('amanhã')) {
            dateFilter = 'tomorrow';
        } else if (buttonText.includes('semana')) {
            dateFilter = 'week';
        }
    }
    
    // Obtém as previsões filtradas
    let filteredPredictions = window.predictionSystem.getPredictionsByLeague(leagueFilter);
    filteredPredictions = window.predictionSystem.getPredictionsByDate(dateFilter);
    filteredPredictions = window.predictionSystem.getPredictionsByBetType(betTypeFilter, filteredPredictions);
    
    // Atualiza a exibição
    updatePredictionsDisplay(filteredPredictions);
}

// Atualiza a exibição das previsões na página
function updatePredictionsDisplay(predictions) {
    // Agrupa as previsões por liga
    const predictionsByLeague = {};
    
    predictions.forEach(match => {
        if (!predictionsByLeague[match.league]) {
            predictionsByLeague[match.league] = [];
        }
        predictionsByLeague[match.league].push(match);
    });
    
    // Limpa o conteúdo atual
    const container = document.querySelector('.matches-list .container');
    if (!container) return;
    
    // Remove tudo exceto a paginação
    const pagination = container.querySelector('.pagination');
    container.innerHTML = '';
    
    // Adiciona as previsões agrupadas por liga
    for (const league in predictionsByLeague) {
        const matches = predictionsByLeague[league];
        if (matches.length === 0) continue;
        
        // Obtém o nome da liga formatado
        const leagueName = getLeagueName(league);
        
        // Cria o cabeçalho da liga
        const leagueHeader = document.createElement('div');
        leagueHeader.className = 'league-header';
        leagueHeader.innerHTML = `
            <img src="images/${league}.png" alt="${leagueName}" class="league-logo">
            <h2>${leagueName}</h2>
            <span class="match-count">${matches.length} jogos</span>
        `;
        container.appendChild(leagueHeader);
        
        // Cria o container de jogos
        const matchesContainer = document.createElement('div');
        matchesContainer.className = 'matches-container';
        
        // Adiciona cada jogo
        matches.forEach(match => {
            const matchCard = createMatchCard(match);
            matchesContainer.appendChild(matchCard);
        });
        
        container.appendChild(matchesContainer);
    }
    
    // Adiciona a paginação de volta
    if (pagination) {
        container.appendChild(pagination);
    }
}

// Cria um card de jogo com previsões
function createMatchCard(match) {
    const matchCard = document.createElement('div');
    matchCard.className = 'match-card';
    matchCard.id = match.id;
    
    // Informações da liga
    const leagueInfo = document.createElement('div');
    leagueInfo.className = 'league-info';
    leagueInfo.innerHTML = `
        <img src="images/${match.league}.png" alt="${getLeagueName(match.league)}" class="league-logo">
        <span>${getLeagueName(match.league)}</span>
        <span class="match-time">${match.time}</span>
    `;
    
    // Equipas
    const teams = document.createElement('div');
    teams.className = 'teams';
    teams.innerHTML = `
        <div class="team">
            <img src="images/${match.homeTeam.logo}" alt="${match.homeTeam.name}" class="team-logo">
            <span class="team-name">${match.homeTeam.name}</span>
        </div>
        <div class="vs">VS</div>
        <div class="team">
            <img src="images/${match.awayTeam.logo}" alt="${match.awayTeam.name}" class="team-logo">
            <span class="team-name">${match.awayTeam.name}</span>
        </div>
    `;
    
    // Previsões
    const predictions = document.createElement('div');
    predictions.className = 'predictions';
    
    // Adiciona as previsões disponíveis
    if (match.predictions.result1X2) {
        predictions.appendChild(create1X2Prediction(match.predictions.result1X2));
    }
    
    if (match.predictions.overUnder) {
        predictions.appendChild(createOverUnderPrediction(match.predictions.overUnder));
    }
    
    if (match.predictions.btts) {
        predictions.appendChild(createBttsPrediction(match.predictions.btts));
    }
    
    // Link para detalhes
    const viewDetails = document.createElement('a');
    viewDetails.href = `match-details.html?id=${match.id}`;
    viewDetails.className = 'view-details';
    viewDetails.textContent = 'Ver Estatísticas Completas';
    
    // Monta o card
    matchCard.appendChild(leagueInfo);
    matchCard.appendChild(teams);
    matchCard.appendChild(predictions);
    matchCard.appendChild(viewDetails);
    
    return matchCard;
}

// Cria o elemento de previsão 1X2
function create1X2Prediction(prediction) {
    const predictionItem = document.createElement('div');
    predictionItem.className = 'prediction-item';
    
    predictionItem.innerHTML = `
        <span class="prediction-type">1X2</span>
        <div class="prediction-values">
            <div class="value ${prediction.recommended === '1' ? 'recommended' : ''}">
                <span>1</span>
                <span class="percentage">${prediction.home}%</span>
            </div>
            <div class="value ${prediction.recommended === 'X' ? 'recommended' : ''}">
                <span>X</span>
                <span class="percentage">${prediction.draw}%</span>
            </div>
            <div class="value ${prediction.recommended === '2' ? 'recommended' : ''}">
                <span>2</span>
                <span class="percentage">${prediction.away}%</span>
            </div>
        </div>
    `;
    
    return predictionItem;
}

// Cria o elemento de previsão Over/Under
function createOverUnderPrediction(prediction) {
    const predictionItem = document.createElement('div');
    predictionItem.className = 'prediction-item';
    
    predictionItem.innerHTML = `
        <span class="prediction-type">Golos</span>
        <div class="prediction-values">
            <div class="value ${prediction.recommended === 'over' ? 'recommended' : ''}">
                <span>Over 2.5</span>
                <span class="percentage">${prediction.over}%</span>
            </div>
            <div class="value ${prediction.recommended === 'under' ? 'recommended' : ''}">
                <span>Under 2.5</span>
                <span class="percentage">${prediction.under}%</span>
            </div>
        </div>
    `;
    
    return predictionItem;
}

// Cria o elemento de previsão Ambas Marcam
function createBttsPrediction(prediction) {
    const predictionItem = document.createElement('div');
    predictionItem.className = 'prediction-item';
    
    predictionItem.innerHTML = `
        <span class="prediction-type">Ambas Marcam</span>
        <div class="prediction-values">
            <div class="value ${prediction.recommended === 'yes' ? 'recommended' : ''}">
                <span>Sim</span>
                <span class="percentage">${prediction.yes}%</span>
            </div>
            <div class="value ${prediction.recommended === 'no' ? 'recommended' : ''}">
                <span>Não</span>
                <span class="percentage">${prediction.no}%</span>
            </div>
        </div>
    `;
    
    return predictionItem;
}

// Obtém o nome formatado da liga
function getLeagueName(leagueKey) {
    const leagueNames = {
        'premier-league': 'Premier League',
        'champions-league': 'Liga dos Campeões',
        'mocambola': 'Liga Moçambicana',
        'la-liga': 'La Liga',
        'serie-a': 'Serie A',
        'bundesliga': 'Bundesliga',
        'ligue1': 'Ligue 1',
        'caf': 'CAF Champions League'
    };
    
    return leagueNames[leagueKey] || leagueKey;
}

// Evento para atualizar as previsões quando houver mudanças
document.addEventListener('predictionsUpdated', function() {
    // Verifica se estamos na página de previsões
    if (document.getElementById('league-select')) {
        applyFilters();
    }
    
    // Atualiza os cards na página inicial
    updateFeaturedMatches();
});

// Atualiza os jogos em destaque na página inicial
function updateFeaturedMatches() {
    const featuredContainer = document.querySelector('.featured-matches .matches-container');
    if (!featuredContainer) return;
    
    // Obtém jogos em destaque (3 primeiros jogos de ligas populares)
    const featuredMatches = [
        ...window.predictionSystem.getPredictionsByLeague('premier-league').slice(0, 1),
        ...window.predictionSystem.getPredictionsByLeague('champions-league').slice(0, 1),
        ...window.predictionSystem.getPredictionsByLeague('mocambola').slice(0, 1)
    ];
    
    // Limpa o container
    featuredContainer.innerHTML = '';
    
    // Adiciona os jogos em destaque
    featuredMatches.forEach(match => {
        const matchCard = createMatchCard(match);
        featuredContainer.appendChild(matchCard);
    });
}
