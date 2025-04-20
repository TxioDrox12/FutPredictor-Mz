// FutPredict MZ - Sistema de Estatísticas
// Este arquivo contém as funcionalidades para exibição e atualização de estatísticas

// Simulação de API de estatísticas
// Em uma implementação real, isso seria substituído por chamadas a um backend
class StatisticsSystem {
    constructor() {
        this.teams = {};
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
        
        // Inicializa dados de estatísticas
        this.initializeStatistics();
    }
    
    // Inicializa dados de estatísticas simulados
    initializeStatistics() {
        // Gera estatísticas para cada liga
        this.leagues.forEach(league => {
            const teams = this.getTeamsForLeague(league);
            teams.forEach(team => {
                this.teams[team.name] = this.generateTeamStatistics(team, league);
            });
        });
    }
    
    // Gera estatísticas para uma equipe específica
    generateTeamStatistics(team, league) {
        // Estatísticas básicas
        const played = Math.floor(Math.random() * 15) + 20; // 20-34 jogos
        const wins = Math.floor(Math.random() * (played * 0.7)); // Até 70% de vitórias
        const draws = Math.floor(Math.random() * (played - wins) * 0.6); // Até 60% dos jogos restantes são empates
        const losses = played - wins - draws;
        
        const goalsScored = wins * 2 + draws + Math.floor(Math.random() * losses);
        const goalsConceded = losses * 2 + draws + Math.floor(Math.random() * wins);
        
        // Estatísticas em casa e fora
        const homePlayed = Math.floor(played / 2);
        const awayPlayed = played - homePlayed;
        
        const homeWins = Math.floor(wins * 0.7); // 70% das vitórias são em casa
        const homeDraws = Math.floor(draws * 0.5); // 50% dos empates são em casa
        const homeLosses = homePlayed - homeWins - homeDraws;
        
        const awayWins = wins - homeWins;
        const awayDraws = draws - homeDraws;
        const awayLosses = awayPlayed - awayWins - awayDraws;
        
        const homeGoalsScored = Math.floor(goalsScored * 0.6); // 60% dos gols são marcados em casa
        const homeGoalsConceded = Math.floor(goalsConceded * 0.4); // 40% dos gols são sofridos em casa
        
        const awayGoalsScored = goalsScored - homeGoalsScored;
        const awayGoalsConceded = goalsConceded - homeGoalsConceded;
        
        // Tendências de apostas
        const over25Percentage = Math.floor(Math.random() * 40) + 30; // 30-69%
        const bttsPercentage = Math.floor(Math.random() * 40) + 30; // 30-69%
        const winHalfTimePercentage = Math.floor(Math.random() * 30) + 20; // 20-49%
        const cleanSheetPercentage = Math.floor(Math.random() * 40) + 10; // 10-49%
        
        // Jogadores
        const topScorers = this.generatePlayers(5, 'scorer', team.name);
        const topAssists = this.generatePlayers(5, 'assist', team.name);
        const topCards = this.generatePlayers(5, 'card', team.name);
        
        // Jogos recentes
        const recentMatches = this.generateRecentMatches(team, league, 5);
        
        // Confrontos diretos
        const h2h = {};
        
        return {
            name: team.name,
            logo: team.logo,
            league: league,
            position: Math.floor(Math.random() * 20) + 1,
            overall: {
                played: played,
                wins: wins,
                draws: draws,
                losses: losses,
                goalsScored: goalsScored,
                goalsConceded: goalsConceded,
                points: wins * 3 + draws,
                winPercentage: Math.round((wins / played) * 100)
            },
            home: {
                played: homePlayed,
                wins: homeWins,
                draws: homeDraws,
                losses: homeLosses,
                goalsScored: homeGoalsScored,
                goalsConceded: homeGoalsConceded,
                points: homeWins * 3 + homeDraws
            },
            away: {
                played: awayPlayed,
                wins: awayWins,
                draws: awayDraws,
                losses: awayLosses,
                goalsScored: awayGoalsScored,
                goalsConceded: awayGoalsConceded,
                points: awayWins * 3 + awayDraws
            },
            trends: {
                over25: over25Percentage,
                btts: bttsPercentage,
                winHalfTime: winHalfTimePercentage,
                cleanSheet: cleanSheetPercentage
            },
            players: {
                topScorers: topScorers,
                topAssists: topAssists,
                topCards: topCards
            },
            recentMatches: recentMatches,
            h2h: h2h
        };
    }
    
    // Gera jogadores para uma equipe
    generatePlayers(count, type, teamName) {
        const players = [];
        const firstNames = [
            'João', 'Pedro', 'Carlos', 'Miguel', 'António', 'José', 'Manuel', 'Paulo', 'Fernando', 'Ricardo',
            'Luís', 'André', 'Rafael', 'Bruno', 'Francisco', 'Diogo', 'Rui', 'Gonçalo', 'Tiago', 'Nuno',
            'Steward', 'Elias', 'Danilo', 'Denil', 'Isac', 'Gildo', 'Edmilson', 'Reinildo', 'Geny', 'Domingues'
        ];
        
        const lastNames = [
            'Silva', 'Santos', 'Ferreira', 'Pereira', 'Oliveira', 'Costa', 'Rodrigues', 'Martins', 'Jesus', 'Sousa',
            'Fernandes', 'Gonçalves', 'Gomes', 'Lopes', 'Marques', 'Alves', 'Almeida', 'Ribeiro', 'Pinto', 'Carvalho',
            'Witi', 'Sitoe', 'Mexer', 'Miquissone', 'Catamo', 'Macandza', 'Guambe', 'Mondlane', 'Malembana', 'Bila'
        ];
        
        // Gera jogadores únicos
        const usedNames = new Set();
        
        for (let i = 0; i < count; i++) {
            let firstName, lastName, fullName;
            
            // Garante nomes únicos
            do {
                firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
                fullName = `${firstName} ${lastName}`;
            } while (usedNames.has(fullName));
            
            usedNames.add(fullName);
            
            let value, valueLabel;
            
            if (type === 'scorer') {
                value = Math.floor(Math.random() * 15) + 1; // 1-15 gols
                valueLabel = `${value} golos`;
            } else if (type === 'assist') {
                value = Math.floor(Math.random() * 10) + 1; // 1-10 assistências
                valueLabel = `${value} assistências`;
            } else if (type === 'card') {
                const yellows = Math.floor(Math.random() * 8) + 1; // 1-8 cartões amarelos
                const reds = Math.floor(Math.random() * 2); // 0-1 cartão vermelho
                value = yellows + reds * 5; // Para ordenação
                valueLabel = reds > 0 ? `${yellows} amarelos, ${reds} vermelho` : `${yellows} amarelos`;
            }
            
            players.push({
                name: fullName,
                value: value,
                valueLabel: valueLabel
            });
        }
        
        // Ordena por valor (decrescente)
        players.sort((a, b) => b.value - a.value);
        
        return players;
    }
    
    // Gera jogos recentes para uma equipe
    generateRecentMatches(team, league, count) {
        const matches = [];
        const teams = this.getTeamsForLeague(league);
        
        for (let i = 0; i < count; i++) {
            // Escolhe um adversário aleatório diferente da equipe atual
            let opponent;
            do {
                opponent = teams[Math.floor(Math.random() * teams.length)];
            } while (opponent.name === team.name);
            
            // Determina se é jogo em casa ou fora
            const isHome = Math.random() > 0.5;
            const homeTeam = isHome ? team : opponent;
            const awayTeam = isHome ? opponent : team;
            
            // Gera resultado
            const homeGoals = Math.floor(Math.random() * 4); // 0-3 gols
            const awayGoals = Math.floor(Math.random() * 4); // 0-3 gols
            
            // Determina resultado para a equipe (vitória, empate, derrota)
            let result;
            if (isHome) {
                result = homeGoals > awayGoals ? 'W' : homeGoals < awayGoals ? 'L' : 'D';
            } else {
                result = awayGoals > homeGoals ? 'W' : awayGoals < homeGoals ? 'L' : 'D';
            }
            
            // Gera estatísticas do jogo
            const possession = Math.floor(Math.random() * 30) + 35; // 35-64% de posse
            const shots = Math.floor(Math.random() * 15) + 5; // 5-19 chutes
            const shotsOnTarget = Math.floor(Math.random() * (shots - 2)) + 2; // 2 até shots-1 chutes a gol
            
            const opponentPossession = 100 - possession;
            const opponentShots = Math.floor(Math.random() * 15) + 5;
            const opponentShotsOnTarget = Math.floor(Math.random() * (opponentShots - 2)) + 2;
            
            // Data do jogo (últimos 30 dias)
            const date = new Date();
            date.setDate(date.getDate() - (i * 7) - Math.floor(Math.random() * 3)); // Jogos a cada ~7 dias
            
            matches.push({
                date: date.toLocaleDateString('pt-MZ'),
                homeTeam: {
                    name: homeTeam.name,
                    logo: homeTeam.logo
                },
                awayTeam: {
                    name: awayTeam.name,
                    logo: awayTeam.logo
                },
                score: `${homeGoals} - ${awayGoals}`,
                result: result,
                stats: {
                    possession: isHome ? possession : opponentPossession,
                    shots: isHome ? shots : opponentShots,
                    shotsOnTarget: isHome ? shotsOnTarget : opponentShotsOnTarget,
                    opponentPossession: isHome ? opponentPossession : possession,
                    opponentShots: isHome ? opponentShots : shots,
                    opponentShotsOnTarget: isHome ? opponentShotsOnTarget : shotsOnTarget
                }
            });
        }
        
        return matches;
    }
    
    // Gera confrontos diretos entre duas equipes
    generateH2H(team1, team2, count = 5) {
        const matches = [];
        
        for (let i = 0; i < count; i++) {
            // Determina se team1 é casa ou fora
            const team1IsHome = i % 2 === 0; // Alterna casa e fora
            
            // Gera resultado
            const team1Goals = Math.floor(Math.random() * 4); // 0-3 gols
            const team2Goals = Math.floor(Math.random() * 4); // 0-3 gols
            
            // Data do jogo (últimos 3 anos)
            const date = new Date();
            date.setFullYear(date.getFullYear() - Math.floor(i / 2));
            date.setMonth(Math.floor(Math.random() * 12));
            date.setDate(Math.floor(Math.random() * 28) + 1);
            
            // Determina a competição
            const competitions = ['Premier League', 'Liga dos Campeões', 'Liga Moçambicana', 'La Liga', 'Copa Nacional'];
            const competition = competitions[Math.floor(Math.random() * competitions.length)];
            
            matches.push({
                date: date.toLocaleDateString('pt-MZ'),
                homeTeam: team1IsHome ? team1.name : team2.name,
                awayTeam: team1IsHome ? team2.name : team1.name,
                score: team1IsHome ? `${team1Goals}-${team2Goals}` : `${team2Goals}-${team1Goals}`,
                competition: competition
            });
        }
        
        return matches;
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
    
    // Obtém estatísticas de uma equipe por nome
    getTeamStatistics(teamName) {
        return this.teams[teamName] || null;
    }
    
    // Obtém confrontos diretos entre duas equipes
    getH2H(team1Name, team2Name) {
        const team1 = this.teams[team1Name];
        const team2 = this.teams[team2Name];
        
        if (!team1 || !team2) return null;
        
        // Verifica se já temos H2H calculado
        if (!team1.h2h[team2Name]) {
            const h2hMatches = this.generateH2H(
                { name: team1Name, logo: team1.logo },
                { name: team2Name, logo: team2.logo }
            );
            
            // Calcula estatísticas H2H
            let team1Wins = 0;
            let team2Wins = 0;
            let draws = 0;
            let team1Goals = 0;
            let team2Goals = 0;
            
            h2hMatches.forEach(match => {
                const isTeam1Home = match.homeTeam === team1Name;
                const scoreParts = match.score.split('-');
                const homeGoals = parseInt(scoreParts[0]);
                const awayGoals = parseInt(scoreParts[1]);
                
                if (isTeam1Home) {
                    team1Goals += homeGoals;
                    team2Goals += awayGoals;
                    
                    if (homeGoals > awayGoals) team1Wins++;
                    else if (homeGoals < awayGoals) team2Wins++;
                    else draws++;
                } else {
                    team1Goals += awayGoals;
                    team2Goals += homeGoals;
                    
                    if (awayGoals > homeGoals) team1Wins++;
                    else if (awayGoals < homeGoals) team2Wins++;
                    else draws++;
                }
            });
            
            // Armazena H2H para ambas as equipes
            team1.h2h[team2Name] = {
                matches: h2hMatches,
                stats: {
                    team1Wins: team1Wins,
                    draws: draws,
                    team2Wins: team2Wins,
                    team1Goals: team1Goals,
                    team2Goals: team2Goals
                }
            };
            
            team2.h2h[team1Name] = {
                matches: h2hMatches,
                stats: {
                    team1Wins: team2Wins,
                    draws: draws,
                    team2Wins: team1Wins,
                    team1Goals: team2Goals,
                    team2Goals: team1Goals
                }
            };
        }
        
        return team1.h2h[team2Name];
    }
    
    // Pesquisa equipes por nome
    searchTeams(query) {
        if (!query || query.length < 2) return [];
        
        query = query.toLowerCase();
        const results = [];
        
        for (const teamName in this.teams) {
            if (teamName.toLowerCase().includes(query)) {
                const team = this.teams[teamName];
                results.push({
                    name: teamName,
                    logo: team.logo,
                    league: team.league
                });
            }
        }
        
        return results;
    }
    
    // Obtém equipes populares
    getPopularTeams() {
        return [
            { name: 'Man United', logo: 'team1.png', league: 'premier-league' },
            { name: 'Liverpool', logo: 'team2.png', league: 'premier-league' },
            { name: 'Barcelona', logo: 'team3.png', league: 'la-liga' },
            { name: 'Real Madrid', logo: 'team11.png', league: 'la-liga' },
            { name: 'Bayern', logo: 'team4.png', league: 'bundesliga' },
            { name: 'Ferroviário', logo: 'team5.png', league: 'mocambola' },
            { name: 'Costa do Sol', logo: 'team6.png', league: 'mocambola' },
            { name: 'Black Bulls', logo: 'team20.png', league: 'mocambola' }
        ];
    }
}

// Inicializa o sistema de estatísticas quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Cria instância do sistema de estatísticas
    window.statisticsSystem = new StatisticsSystem();
    
    // Inicializa a página de estatísticas se estivermos nela
    initializeStatisticsPage();
});

// Inicializa a página de estatísticas
function initializeStatisticsPage() {
    // Verifica se estamos na página de estatísticas
    const teamSearch = document.querySelector('.team-search');
    if (!teamSearch) return;
    
    // Inicializa a pesquisa
    initializeTeamSearch();
    
    // Inicializa as abas
    initializeStatsTabs();
    
    // Carrega estatísticas de uma equipe padrão (Manchester United)
    loadTeamStatistics('Man United');
}

// Inicializa a pesquisa de equipes
function initializeTeamSearch() {
    const searchBox = document.querySelector('.search-box');
    const searchInput = searchBox.querySelector('input');
    const searchButton = searchBox.querySelector('button');
    
    // Adiciona event listeners
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            searchTeams(query);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchTeams(query);
            }
        }
    });
    
    // Inicializa links de equipes populares
    const teamLinks = document.querySelectorAll('.team-links a');
    teamLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const teamName = this.textContent.trim();
            loadTeamStatistics(teamName);
        });
    });
}

// Pesquisa equipes
function searchTeams(query) {
    const results = window.statisticsSystem.searchTeams(query);
    
    if (results.length > 0) {
        // Carrega a primeira equipe encontrada
        loadTeamStatistics(results[0].name);
    } else {
        // Mostra mensagem de que nenhuma equipe foi encontrada
        showNotification('Nenhuma equipe encontrada com esse nome.', 'error');
    }
}

// Inicializa as abas de estatísticas
function initializeStatsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            this.classList.add('active');
            
            // Mostra o conteúdo correspondente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Carrega estatísticas de uma equipe
function loadTeamStatistics(teamName) {
    const team = window.statisticsSystem.getTeamStatistics(teamName);
    
    if (!team) {
        showNotification('Equipe não encontrada.', 'error');
        return;
    }
    
    // Atualiza o cabeçalho da equipe
    updateTeamHeader(team);
    
    // Atualiza as abas de estatísticas
    updateOverviewTab(team);
    updateFormTab(team);
    updateH2HTab(team);
    updatePlayersTab(team);
    
    // Mostra a aba de visão geral por padrão
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector('.tab-btn[data-tab="overview"]').classList.add('active');
    document.getElementById('overview').classList.add('active');
}

// Atualiza o cabeçalho da equipe
function updateTeamHeader(team) {
    const teamHeader = document.querySelector('.team-header');
    
    // Atualiza logo e nome
    const teamLogo = teamHeader.querySelector('.team-logo-large');
    teamLogo.src = `images/${team.logo}`;
    teamLogo.alt = team.name;
    
    teamHeader.querySelector('.team-details h2').textContent = team.name;
    
    // Atualiza metadados
    const teamMeta = teamHeader.querySelector('.team-meta');
    teamMeta.innerHTML = `
        <span><i class="fas fa-trophy"></i> ${getLeagueName(team.league)}</span>
        <span><i class="fas fa-map-marker-alt"></i> ${getCountryFromLeague(team.league)}</span>
    `;
    
    // Atualiza posição
    teamHeader.querySelector('.position-value').textContent = `${team.position}º`;
}

// Atualiza a aba de visão geral
function updateOverviewTab(team) {
    const overviewTab = document.getElementById('overview');
    
    // Atualiza estatísticas da temporada
    const seasonStats = overviewTab.querySelector('.season-stats');
    seasonStats.innerHTML = `
        <div class="stat-item">
            <span class="stat-label">Jogos</span>
            <span class="stat-value">${team.overall.played}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Vitórias</span>
            <span class="stat-value">${team.overall.wins}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Empates</span>
            <span class="stat-value">${team.overall.draws}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Derrotas</span>
            <span class="stat-value">${team.overall.losses}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Golos Marcados</span>
            <span class="stat-value">${team.overall.goalsScored}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Golos Sofridos</span>
            <span class="stat-value">${team.overall.goalsConceded}</span>
        </div>
    `;
    
    // Atualiza percentagem de vitórias
    const winPercentage = overviewTab.querySelector('.win-percentage');
    winPercentage.innerHTML = `
        <div class="progress-bar">
            <div class="progress" style="width: ${team.overall.winPercentage}%;"></div>
        </div>
        <span class="percentage-text">${team.overall.winPercentage}% Vitórias</span>
    `;
    
    // Atualiza estatísticas em casa e fora
    const homeStats = overviewTab.querySelector('.home-stats');
    homeStats.innerHTML = `
        <h4>Em Casa</h4>
        <div class="stat-row">
            <span>Jogos:</span>
            <span>${team.home.played}</span>
        </div>
        <div class="stat-row">
            <span>Vitórias:</span>
            <span>${team.home.wins}</span>
        </div>
        <div class="stat-row">
            <span>Empates:</span>
            <span>${team.home.draws}</span>
        </div>
        <div class="stat-row">
            <span>Derrotas:</span>
            <span>${team.home.losses}</span>
        </div>
        <div class="stat-row">
            <span>Golos Marcados:</span>
            <span>${team.home.goalsScored}</span>
        </div>
        <div class="stat-row">
            <span>Golos Sofridos:</span>
            <span>${team.home.goalsConceded}</span>
        </div>
    `;
    
    const awayStats = overviewTab.querySelector('.away-stats');
    awayStats.innerHTML = `
        <h4>Fora</h4>
        <div class="stat-row">
            <span>Jogos:</span>
            <span>${team.away.played}</span>
        </div>
        <div class="stat-row">
            <span>Vitórias:</span>
            <span>${team.away.wins}</span>
        </div>
        <div class="stat-row">
            <span>Empates:</span>
            <span>${team.away.draws}</span>
        </div>
        <div class="stat-row">
            <span>Derrotas:</span>
            <span>${team.away.losses}</span>
        </div>
        <div class="stat-row">
            <span>Golos Marcados:</span>
            <span>${team.away.goalsScored}</span>
        </div>
        <div class="stat-row">
            <span>Golos Sofridos:</span>
            <span>${team.away.goalsConceded}</span>
        </div>
    `;
    
    // Atualiza tendências de apostas
    const bettingTrends = overviewTab.querySelector('.betting-trends');
    bettingTrends.innerHTML = `
        <div class="trend-item">
            <div class="trend-header">
                <span class="trend-title">Over 2.5 Golos</span>
                <span class="trend-percentage">${team.trends.over25}%</span>
            </div>
            <div class="trend-bar">
                <div class="trend-progress" style="width: ${team.trends.over25}%;"></div>
            </div>
            <span class="trend-description">${Math.round(team.overall.played * team.trends.over25 / 100)} de ${team.overall.played} jogos terminaram com mais de 2.5 golos</span>
        </div>
        <div class="trend-item">
            <div class="trend-header">
                <span class="trend-title">Ambas Equipas Marcam</span>
                <span class="trend-percentage">${team.trends.btts}%</span>
            </div>
            <div class="trend-bar">
                <div class="trend-progress" style="width: ${team.trends.btts}%;"></div>
            </div>
            <span class="trend-description">${Math.round(team.overall.played * team.trends.btts / 100)} de ${team.overall.played} jogos terminaram com ambas as equipas a marcar</span>
        </div>
        <div class="trend-item">
            <div class="trend-header">
                <span class="trend-title">Vitória ao Intervalo</span>
                <span class="trend-percentage">${team.trends.winHalfTime}%</span>
            </div>
            <div class="trend-bar">
                <div class="trend-progress" style="width: ${team.trends.winHalfTime}%;"></div>
            </div>
            <span class="trend-description">${Math.round(team.overall.played * team.trends.winHalfTime / 100)} de ${team.overall.played} jogos com vitória ao intervalo</span>
        </div>
        <div class="trend-item">
            <div class="trend-header">
                <span class="trend-title">Clean Sheet</span>
                <span class="trend-percentage">${team.trends.cleanSheet}%</span>
            </div>
            <div class="trend-bar">
                <div class="trend-progress" style="width: ${team.trends.cleanSheet}%;"></div>
            </div>
            <span class="trend-description">${Math.round(team.overall.played * team.trends.cleanSheet / 100)} de ${team.overall.played} jogos sem sofrer golos</span>
        </div>
    `;
}

// Atualiza a aba de forma recente
function updateFormTab(team) {
    const formTab = document.getElementById('form');
    const recentMatches = formTab.querySelector('.recent-matches');
    
    // Limpa o conteúdo atual
    recentMatches.innerHTML = '';
    
    // Adiciona cada jogo recente
    team.recentMatches.forEach(match => {
        const matchResult = document.createElement('div');
        matchResult.className = 'match-result';
        
        // Determina se a equipe atual é a da casa ou visitante
        const isHome = match.homeTeam.name === team.name;
        const homeTeam = match.homeTeam;
        const awayTeam = match.awayTeam;
        
        // Cria o HTML do jogo
        matchResult.innerHTML = `
            <div class="match-teams">
                <div class="match-team">
                    <img src="images/${homeTeam.logo}" alt="${homeTeam.name}" class="team-logo-small">
                    <span>${homeTeam.name}</span>
                </div>
                <div class="match-score">
                    <span class="score">${match.score}</span>
                    <span class="match-date">${match.date}</span>
                </div>
                <div class="match-team">
                    <img src="images/${awayTeam.logo}" alt="${awayTeam.name}" class="team-logo-small">
                    <span>${awayTeam.name}</span>
                </div>
            </div>
            <div class="match-stats">
                <div class="stat-bar">
                    <span class="stat-label">Posse de Bola</span>
                    <div class="stat-progress">
                        <div class="progress-left" style="width: ${match.stats.possession}%;">${match.stats.possession}%</div>
                        <div class="progress-right" style="width: ${match.stats.opponentPossession}%;">${match.stats.opponentPossession}%</div>
                    </div>
                </div>
                <div class="stat-bar">
                    <span class="stat-label">Remates</span>
                    <div class="stat-progress">
                        <div class="progress-left" style="width: ${match.stats.shots / (match.stats.shots + match.stats.opponentShots) * 100}%;">${match.stats.shots}</div>
                        <div class="progress-right" style="width: ${match.stats.opponentShots / (match.stats.shots + match.stats.opponentShots) * 100}%;">${match.stats.opponentShots}</div>
                    </div>
                </div>
                <div class="stat-bar">
                    <span class="stat-label">Remates à Baliza</span>
                    <div class="stat-progress">
                        <div class="progress-left" style="width: ${match.stats.shotsOnTarget / (match.stats.shotsOnTarget + match.stats.opponentShotsOnTarget) * 100}%;">${match.stats.shotsOnTarget}</div>
                        <div class="progress-right" style="width: ${match.stats.opponentShotsOnTarget / (match.stats.shotsOnTarget + match.stats.opponentShotsOnTarget) * 100}%;">${match.stats.opponentShotsOnTarget}</div>
                    </div>
                </div>
            </div>
        `;
        
        recentMatches.appendChild(matchResult);
    });
}

// Atualiza a aba de confrontos diretos
function updateH2HTab(team) {
    const h2hTab = document.getElementById('h2h');
    
    // Por padrão, mostra confrontos com o Liverpool
    const opponent = team.name === 'Liverpool' ? 'Man United' : 'Liverpool';
    
    // Obtém os dados de H2H
    const h2hData = window.statisticsSystem.getH2H(team.name, opponent);
    
    if (!h2hData) {
        h2hTab.innerHTML = '<p>Não há dados de confrontos diretos disponíveis.</p>';
        return;
    }
    
    // Atualiza o título
    h2hTab.innerHTML = `<h3>Confrontos Diretos: ${team.name} vs ${opponent}</h3>`;
    
    // Cria o resumo de H2H
    const h2hSummary = document.createElement('div');
    h2hSummary.className = 'h2h-summary';
    
    h2hSummary.innerHTML = `
        <div class="h2h-record">
            <div class="record-item">
                <span class="record-value">${h2hData.stats.team1Wins}</span>
                <span class="record-label">Vitórias ${team.name}</span>
            </div>
            <div class="record-item">
                <span class="record-value">${h2hData.stats.draws}</span>
                <span class="record-label">Empates</span>
            </div>
            <div class="record-item">
                <span class="record-value">${h2hData.stats.team2Wins}</span>
                <span class="record-label">Vitórias ${opponent}</span>
            </div>
        </div>
        <div class="h2h-goals">
            <div class="goals-item">
                <span class="goals-value">${h2hData.stats.team1Goals}</span>
                <span class="goals-label">Golos ${team.name}</span>
            </div>
            <div class="goals-item">
                <span class="goals-value">${h2hData.stats.team2Goals}</span>
                <span class="goals-label">Golos ${opponent}</span>
            </div>
        </div>
    `;
    
    h2hTab.appendChild(h2hSummary);
    
    // Cria a lista de jogos
    const h2hMatches = document.createElement('div');
    h2hMatches.className = 'h2h-matches';
    h2hMatches.innerHTML = '<h4>Últimos Confrontos</h4>';
    
    h2hData.matches.forEach(match => {
        const matchItem = document.createElement('div');
        matchItem.className = 'h2h-match';
        
        matchItem.innerHTML = `
            <div class="h2h-date">${match.date}</div>
            <div class="h2h-teams">
                <span>${match.homeTeam}</span>
                <span class="h2h-score">${match.score}</span>
                <span>${match.awayTeam}</span>
            </div>
            <div class="h2h-competition">${match.competition}</div>
        `;
        
        h2hMatches.appendChild(matchItem);
    });
    
    h2hTab.appendChild(h2hMatches);
}

// Atualiza a aba de jogadores
function updatePlayersTab(team) {
    const playersTab = document.getElementById('players');
    
    // Limpa o conteúdo atual
    playersTab.innerHTML = '';
    
    // Adiciona os melhores marcadores
    const scorersCategory = document.createElement('div');
    scorersCategory.className = 'stats-category';
    scorersCategory.innerHTML = '<h4>Melhores Marcadores</h4>';
    
    const scorersList = document.createElement('div');
    scorersList.className = 'player-list';
    
    team.players.topScorers.forEach((player, index) => {
        const playerItem = document.createElement('div');
        playerItem.className = 'player-item';
        
        playerItem.innerHTML = `
            <span class="player-rank">${index + 1}</span>
            <span class="player-name">${player.name}</span>
            <span class="player-value">${player.valueLabel}</span>
        `;
        
        scorersList.appendChild(playerItem);
    });
    
    scorersCategory.appendChild(scorersList);
    playersTab.appendChild(scorersCategory);
    
    // Adiciona as melhores assistências
    const assistsCategory = document.createElement('div');
    assistsCategory.className = 'stats-category';
    assistsCategory.innerHTML = '<h4>Melhores Assistências</h4>';
    
    const assistsList = document.createElement('div');
    assistsList.className = 'player-list';
    
    team.players.topAssists.forEach((player, index) => {
        const playerItem = document.createElement('div');
        playerItem.className = 'player-item';
        
        playerItem.innerHTML = `
            <span class="player-rank">${index + 1}</span>
            <span class="player-name">${player.name}</span>
            <span class="player-value">${player.valueLabel}</span>
        `;
        
        assistsList.appendChild(playerItem);
    });
    
    assistsCategory.appendChild(assistsList);
    playersTab.appendChild(assistsCategory);
    
    // Adiciona os cartões
    const cardsCategory = document.createElement('div');
    cardsCategory.className = 'stats-category';
    cardsCategory.innerHTML = '<h4>Cartões</h4>';
    
    const cardsList = document.createElement('div');
    cardsList.className = 'player-list';
    
    team.players.topCards.forEach((player, index) => {
        const playerItem = document.createElement('div');
        playerItem.className = 'player-item';
        
        playerItem.innerHTML = `
            <span class="player-rank">${index + 1}</span>
            <span class="player-name">${player.name}</span>
            <span class="player-value">${player.valueLabel}</span>
        `;
        
        cardsList.appendChild(playerItem);
    });
    
    cardsCategory.appendChild(cardsList);
    playersTab.appendChild(cardsCategory);
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

// Obtém o país da liga
function getCountryFromLeague(leagueKey) {
    const countries = {
        'premier-league': 'Inglaterra',
        'champions-league': 'Europa',
        'mocambola': 'Moçambique',
        'la-liga': 'Espanha',
        'serie-a': 'Itália',
        'bundesliga': 'Alemanha',
        'ligue1': 'França',
        'caf': 'África'
    };
    
    return countries[leagueKey] || 'Internacional';
}
