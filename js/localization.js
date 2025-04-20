// FutPredict MZ - Sistema de Localização
// Este arquivo contém as funcionalidades para localização do site para Moçambique

// Classe para gerenciar a localização do site
class LocalizationSystem {
    constructor() {
        // Configurações de localização
        this.locale = 'pt-MZ';
        this.timezone = 'Africa/Maputo'; // CAT (Central Africa Time)
        this.currency = 'MZN';
        
        // Dicionário de termos específicos de Moçambique
        this.terms = {
            'bet': 'bir',
            'match': 'jogo',
            'team': 'equipa',
            'league': 'liga',
            'win': 'vitória',
            'draw': 'empate',
            'loss': 'derrota',
            'goal': 'golo',
            'goals': 'golos',
            'home': 'casa',
            'away': 'fora',
            'odds': 'cotas',
            'prediction': 'previsão',
            'predictions': 'previsões',
            'statistics': 'estatísticas',
            'tips': 'dicas',
            'both teams to score': 'ambas marcam',
            'over/under': 'mais/menos',
            'clean sheet': 'sem sofrer golos',
            'form': 'forma',
            'head to head': 'confronto direto',
            'standings': 'classificação',
            'fixtures': 'calendário',
            'results': 'resultados'
        };
        
        // Feriados moçambicanos para 2025
        this.holidays = [
            { date: '2025-01-01', name: 'Dia de Ano Novo' },
            { date: '2025-02-03', name: 'Dia dos Heróis Moçambicanos' },
            { date: '2025-04-07', name: 'Dia da Mulher Moçambicana' },
            { date: '2025-04-18', name: 'Sexta-feira Santa' },
            { date: '2025-05-01', name: 'Dia do Trabalhador' },
            { date: '2025-06-25', name: 'Dia da Independência Nacional' },
            { date: '2025-09-07', name: 'Dia da Vitória' },
            { date: '2025-09-25', name: 'Dia das Forças Armadas' },
            { date: '2025-10-04', name: 'Dia da Paz e Reconciliação' },
            { date: '2025-12-25', name: 'Dia da Família / Natal' }
        ];
        
        // Ligas populares em Moçambique
        this.popularLeagues = [
            { id: 'mocambola', name: 'Moçambola', country: 'Moçambique', logo: 'mocambola.png' },
            { id: 'premier-league', name: 'Premier League', country: 'Inglaterra', logo: 'premier-league.png' },
            { id: 'champions-league', name: 'Liga dos Campeões', country: 'Europa', logo: 'champions-league.png' },
            { id: 'la-liga', name: 'La Liga', country: 'Espanha', logo: 'la-liga.png' },
            { id: 'caf', name: 'CAF Champions League', country: 'África', logo: 'caf.png' },
            { id: 'serie-a', name: 'Serie A', country: 'Itália', logo: 'serie-a.png' }
        ];
        
        // Equipas populares em Moçambique
        this.popularTeams = [
            { id: 'ferroviario', name: 'Ferroviário de Maputo', league: 'mocambola', logo: 'team5.png' },
            { id: 'costa-do-sol', name: 'Costa do Sol', league: 'mocambola', logo: 'team6.png' },
            { id: 'black-bulls', name: 'Black Bulls', league: 'mocambola', logo: 'team20.png' },
            { id: 'man-united', name: 'Manchester United', league: 'premier-league', logo: 'team1.png' },
            { id: 'barcelona', name: 'Barcelona', league: 'la-liga', logo: 'team3.png' },
            { id: 'real-madrid', name: 'Real Madrid', league: 'la-liga', logo: 'team11.png' }
        ];
        
        // Inicializa o sistema
        this.initialize();
    }
    
    // Inicializa o sistema de localização
    initialize() {
        // Configura o fuso horário
        this.setupTimezone();
        
        // Configura o formato de data e hora
        this.setupDateTimeFormat();
        
        // Configura o formato de moeda
        this.setupCurrencyFormat();
        
        // Localiza elementos da interface
        document.addEventListener('DOMContentLoaded', () => {
            this.localizeUI();
        });
    }
    
    // Configura o fuso horário para CAT (UTC+2)
    setupTimezone() {
        // Em uma implementação real, isso seria feito no servidor
        // Para simulação, vamos apenas ajustar a exibição de horários
        this.timezoneOffset = 2; // UTC+2
    }
    
    // Configura o formato de data e hora para o padrão moçambicano
    setupDateTimeFormat() {
        // Opções para formatação de data
        this.dateOptions = {
            short: { day: '2-digit', month: '2-digit', year: 'numeric' },
            medium: { day: '2-digit', month: 'long', year: 'numeric' },
            long: { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }
        };
        
        // Opções para formatação de hora
        this.timeOptions = {
            short: { hour: '2-digit', minute: '2-digit' },
            medium: { hour: '2-digit', minute: '2-digit', second: '2-digit' },
            long: { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' }
        };
    }
    
    // Configura o formato de moeda para Metical moçambicano
    setupCurrencyFormat() {
        this.currencyOptions = {
            style: 'currency',
            currency: this.currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
    }
    
    // Localiza elementos da interface
    localizeUI() {
        // Adiciona o relógio no cabeçalho se não existir
        this.addHeaderClock();
        
        // Adiciona a data atual no cabeçalho se não existir
        this.addCurrentDate();
        
        // Atualiza os nomes das ligas e equipas
        this.localizeTeamsAndLeagues();
        
        // Atualiza os termos específicos
        this.localizeTerms();
        
        // Adiciona informações sobre feriados se for um dia especial
        this.checkHolidays();
    }
    
    // Adiciona o relógio no cabeçalho
    addHeaderClock() {
        const header = document.querySelector('header .container');
        if (!header) return;
        
        // Verifica se o relógio já existe
        if (!document.getElementById('header-clock')) {
            const clockDiv = document.createElement('div');
            clockDiv.className = 'header-clock';
            clockDiv.innerHTML = `
                <span id="header-clock"></span>
            `;
            
            // Adiciona o relógio após o logo
            const logo = header.querySelector('.logo');
            if (logo) {
                logo.parentNode.insertBefore(clockDiv, logo.nextSibling);
            } else {
                header.appendChild(clockDiv);
            }
            
            // Inicia o relógio
            this.updateClock();
            setInterval(() => this.updateClock(), 60000); // Atualiza a cada minuto
        }
    }
    
    // Atualiza o relógio
    updateClock() {
        const clockElement = document.getElementById('header-clock');
        if (!clockElement) return;
        
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes} CAT`;
    }
    
    // Adiciona a data atual no cabeçalho
    addCurrentDate() {
        const header = document.querySelector('header .container');
        if (!header) return;
        
        // Verifica se a data já existe
        if (!document.getElementById('current-date')) {
            const dateDiv = document.createElement('div');
            dateDiv.className = 'current-date';
            dateDiv.innerHTML = `
                <span id="current-date"></span>
            `;
            
            // Adiciona a data após o relógio ou logo
            const clock = header.querySelector('.header-clock');
            const logo = header.querySelector('.logo');
            
            if (clock) {
                clock.parentNode.insertBefore(dateDiv, clock.nextSibling);
            } else if (logo) {
                logo.parentNode.insertBefore(dateDiv, logo.nextSibling);
            } else {
                header.appendChild(dateDiv);
            }
            
            // Atualiza a data
            this.updateCurrentDate();
        }
    }
    
    // Atualiza a data atual
    updateCurrentDate() {
        const dateElement = document.getElementById('current-date');
        if (!dateElement) return;
        
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString(this.locale, this.dateOptions.long);
    }
    
    // Localiza nomes de ligas e equipas
    localizeTeamsAndLeagues() {
        // Atualiza nomes de ligas
        document.querySelectorAll('[data-league-id]').forEach(element => {
            const leagueId = element.getAttribute('data-league-id');
            const league = this.popularLeagues.find(l => l.id === leagueId);
            
            if (league) {
                element.textContent = league.name;
            }
        });
        
        // Atualiza nomes de equipas
        document.querySelectorAll('[data-team-id]').forEach(element => {
            const teamId = element.getAttribute('data-team-id');
            const team = this.popularTeams.find(t => t.id === teamId);
            
            if (team) {
                element.textContent = team.name;
            }
        });
    }
    
    // Localiza termos específicos
    localizeTerms() {
        // Substitui termos em elementos com o atributo data-term
        document.querySelectorAll('[data-term]').forEach(element => {
            const term = element.getAttribute('data-term');
            if (this.terms[term]) {
                element.textContent = this.terms[term];
            }
        });
    }
    
    // Verifica se hoje é um feriado moçambicano
    checkHolidays() {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        
        const holiday = this.holidays.find(h => h.date === todayStr);
        
        if (holiday) {
            this.showHolidayNotification(holiday);
        }
    }
    
    // Mostra notificação de feriado
    showHolidayNotification(holiday) {
        // Verifica se a função de notificação existe
        if (typeof showNotification === 'function') {
            showNotification(`Hoje é ${holiday.name} em Moçambique! 🇲🇿`, 'info');
        } else {
            // Cria uma notificação simples se a função não existir
            const container = document.querySelector('.container');
            if (!container) return;
            
            const notification = document.createElement('div');
            notification.className = 'holiday-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <span>Hoje é ${holiday.name} em Moçambique! 🇲🇿</span>
                    <button class="notification-close">&times;</button>
                </div>
            `;
            
            // Estiliza a notificação
            notification.style.backgroundColor = '#009639';
            notification.style.color = '#fff';
            notification.style.padding = '10px';
            notification.style.marginBottom = '20px';
            notification.style.borderRadius = '5px';
            notification.style.textAlign = 'center';
            
            // Adiciona a notificação no início do container
            container.insertBefore(notification, container.firstChild);
            
            // Adiciona event listener para fechar a notificação
            const closeButton = notification.querySelector('.notification-close');
            closeButton.addEventListener('click', () => {
                notification.remove();
            });
        }
    }
    
    // Formata data para o padrão moçambicano
    formatDate(date, format = 'short') {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        
        return date.toLocaleDateString(this.locale, this.dateOptions[format]);
    }
    
    // Formata hora para o padrão moçambicano (CAT)
    formatTime(date, format = 'short') {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        
        let timeStr = date.toLocaleTimeString(this.locale, this.timeOptions[format]);
        
        // Adiciona o fuso horário CAT se não estiver incluído
        if (format !== 'long') {
            timeStr += ' CAT';
        }
        
        return timeStr;
    }
    
    // Formata data e hora para o padrão moçambicano
    formatDateTime(date, dateFormat = 'short', timeFormat = 'short') {
        return `${this.formatDate(date, dateFormat)} ${this.formatTime(date, timeFormat)}`;
    }
    
    // Formata valor monetário para Metical moçambicano
    formatCurrency(value) {
        return new Intl.NumberFormat(this.locale, this.currencyOptions).format(value);
    }
    
    // Traduz um termo específico
    translate(term) {
        return this.terms[term.toLowerCase()] || term;
    }
    
    // Verifica se um time é moçambicano
    isMozambicanTeam(teamName) {
        const mozambicanTeams = this.popularTeams.filter(t => t.league === 'mocambola');
        return mozambicanTeams.some(t => t.name === teamName);
    }
    
    // Obtém ligas populares em Moçambique
    getPopularLeagues() {
        return this.popularLeagues;
    }
    
    // Obtém equipas populares em Moçambique
    getPopularTeams() {
        return this.popularTeams;
    }
    
    // Obtém próximo feriado moçambicano
    getNextHoliday() {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        
        // Filtra feriados futuros
        const futureHolidays = this.holidays.filter(h => h.date > todayStr);
        
        // Ordena por data
        futureHolidays.sort((a, b) => a.date.localeCompare(b.date));
        
        return futureHolidays.length > 0 ? futureHolidays[0] : null;
    }
}

// Inicializa o sistema de localização quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Cria instância do sistema de localização
    window.localizationSystem = new LocalizationSystem();
    
    // Adiciona estilos para elementos de localização
    addLocalizationStyles();
});

// Adiciona estilos CSS para elementos de localização
function addLocalizationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .header-clock, .current-date {
            color: #333;
            font-size: 14px;
            margin-left: 20px;
        }
        
        @media (max-width: 768px) {
            .header-clock, .current-date {
                display: none;
            }
        }
        
        .holiday-notification {
            position: relative;
            animation: fadeIn 0.5s;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 18px;
            cursor: pointer;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0.7;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
}
