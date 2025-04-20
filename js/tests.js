// FutPredict MZ - Testes Automatizados
// Este arquivo contém testes para verificar o funcionamento do site

// Classe para gerenciar os testes do site
class TestSystem {
    constructor() {
        this.tests = [];
        this.results = [];
        
        // Inicializa os testes
        this.initializeTests();
    }
    
    // Inicializa os testes disponíveis
    initializeTests() {
        // Testes de interface
        this.addTest('interface', 'Verificar elementos de navegação', this.testNavigation);
        this.addTest('interface', 'Verificar responsividade', this.testResponsiveness);
        this.addTest('interface', 'Verificar formulários', this.testForms);
        
        // Testes de funcionalidades
        this.addTest('functionality', 'Verificar sistema de previsões', this.testPredictionSystem);
        this.addTest('functionality', 'Verificar sistema de estatísticas', this.testStatisticsSystem);
        this.addTest('functionality', 'Verificar sistema de localização', this.testLocalizationSystem);
        
        // Testes de desempenho
        this.addTest('performance', 'Verificar tempo de carregamento', this.testLoadTime);
        this.addTest('performance', 'Verificar uso de memória', this.testMemoryUsage);
    }
    
    // Adiciona um teste à lista
    addTest(category, name, testFunction) {
        this.tests.push({
            id: `test-${this.tests.length + 1}`,
            category: category,
            name: name,
            testFunction: testFunction.bind(this)
        });
    }
    
    // Executa todos os testes
    runAllTests() {
        this.results = [];
        
        // Limpa os resultados anteriores
        const resultsContainer = document.getElementById('test-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = '<h3>Executando testes...</h3>';
        }
        
        // Executa cada teste
        this.tests.forEach(test => {
            try {
                const result = test.testFunction();
                this.results.push({
                    id: test.id,
                    category: test.category,
                    name: test.name,
                    success: result.success,
                    message: result.message
                });
            } catch (error) {
                this.results.push({
                    id: test.id,
                    category: test.category,
                    name: test.name,
                    success: false,
                    message: `Erro ao executar o teste: ${error.message}`
                });
            }
        });
        
        // Exibe os resultados
        this.displayResults();
        
        return this.results;
    }
    
    // Exibe os resultados dos testes
    displayResults() {
        const resultsContainer = document.getElementById('test-results');
        if (!resultsContainer) return;
        
        // Calcula estatísticas
        const totalTests = this.results.length;
        const passedTests = this.results.filter(r => r.success).length;
        const failedTests = totalTests - passedTests;
        
        // Cria o HTML dos resultados
        let html = `
            <h3>Resultados dos Testes</h3>
            <div class="test-summary">
                <div class="test-stat">
                    <span class="stat-value">${totalTests}</span>
                    <span class="stat-label">Total de Testes</span>
                </div>
                <div class="test-stat success">
                    <span class="stat-value">${passedTests}</span>
                    <span class="stat-label">Testes Passados</span>
                </div>
                <div class="test-stat ${failedTests > 0 ? 'failure' : 'success'}">
                    <span class="stat-value">${failedTests}</span>
                    <span class="stat-label">Testes Falhados</span>
                </div>
            </div>
        `;
        
        // Agrupa resultados por categoria
        const categories = [...new Set(this.results.map(r => r.category))];
        
        categories.forEach(category => {
            const categoryResults = this.results.filter(r => r.category === category);
            
            html += `
                <div class="test-category">
                    <h4>${this.formatCategory(category)}</h4>
                    <div class="test-list">
            `;
            
            categoryResults.forEach(result => {
                html += `
                    <div class="test-item ${result.success ? 'success' : 'failure'}">
                        <div class="test-icon">
                            <i class="fas ${result.success ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                        </div>
                        <div class="test-info">
                            <div class="test-name">${result.name}</div>
                            <div class="test-message">${result.message}</div>
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        // Adiciona estilos para os resultados
        html += `
            <style>
                .test-summary {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 30px;
                    text-align: center;
                }
                
                .test-stat {
                    padding: 15px;
                    border-radius: 5px;
                    background-color: #f5f5f5;
                    min-width: 100px;
                }
                
                .test-stat.success {
                    background-color: #009639;
                    color: white;
                }
                
                .test-stat.failure {
                    background-color: #CE1126;
                    color: white;
                }
                
                .stat-value {
                    display: block;
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .stat-label {
                    font-size: 14px;
                }
                
                .test-category {
                    margin-bottom: 30px;
                }
                
                .test-list {
                    background-color: #f5f5f5;
                    border-radius: 5px;
                    overflow: hidden;
                }
                
                .test-item {
                    display: flex;
                    padding: 15px;
                    border-bottom: 1px solid #e0e0e0;
                }
                
                .test-item:last-child {
                    border-bottom: none;
                }
                
                .test-icon {
                    margin-right: 15px;
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                }
                
                .test-item.success .test-icon {
                    color: #009639;
                }
                
                .test-item.failure .test-icon {
                    color: #CE1126;
                }
                
                .test-info {
                    flex: 1;
                }
                
                .test-name {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .test-message {
                    font-size: 14px;
                    color: #666;
                }
            </style>
        `;
        
        resultsContainer.innerHTML = html;
    }
    
    // Formata o nome da categoria
    formatCategory(category) {
        const categories = {
            'interface': 'Testes de Interface',
            'functionality': 'Testes de Funcionalidades',
            'performance': 'Testes de Desempenho'
        };
        
        return categories[category] || category;
    }
    
    // Teste: Verificar elementos de navegação
    testNavigation() {
        const header = document.querySelector('header');
        const navMenu = document.querySelector('.nav-menu');
        const footer = document.querySelector('footer');
        
        if (!header) {
            return {
                success: false,
                message: 'Cabeçalho não encontrado'
            };
        }
        
        if (!navMenu) {
            return {
                success: false,
                message: 'Menu de navegação não encontrado'
            };
        }
        
        const navLinks = navMenu.querySelectorAll('a');
        if (navLinks.length < 3) {
            return {
                success: false,
                message: 'Menu de navegação não possui links suficientes'
            };
        }
        
        if (!footer) {
            return {
                success: false,
                message: 'Rodapé não encontrado'
            };
        }
        
        return {
            success: true,
            message: `Navegação verificada: ${navLinks.length} links encontrados`
        };
    }
    
    // Teste: Verificar responsividade
    testResponsiveness() {
        const viewport = document.querySelector('meta[name="viewport"]');
        
        if (!viewport) {
            return {
                success: false,
                message: 'Meta tag viewport não encontrada'
            };
        }
        
        const content = viewport.getAttribute('content');
        if (!content || !content.includes('width=device-width')) {
            return {
                success: false,
                message: 'Meta tag viewport não configurada corretamente'
            };
        }
        
        // Verifica se há media queries no CSS
        let mediaQueriesFound = false;
        
        for (let i = 0; i < document.styleSheets.length; i++) {
            try {
                const rules = document.styleSheets[i].cssRules || document.styleSheets[i].rules;
                
                for (let j = 0; j < rules.length; j++) {
                    if (rules[j].type === CSSRule.MEDIA_RULE) {
                        mediaQueriesFound = true;
                        break;
                    }
                }
                
                if (mediaQueriesFound) break;
            } catch (e) {
                // Erro ao acessar regras CSS (geralmente devido a CORS)
                console.log('Erro ao acessar regras CSS:', e);
            }
        }
        
        if (!mediaQueriesFound) {
            return {
                success: false,
                message: 'Não foram encontradas media queries no CSS'
            };
        }
        
        return {
            success: true,
            message: 'Site configurado para responsividade'
        };
    }
    
    // Teste: Verificar formulários
    testForms() {
        const forms = document.querySelectorAll('form');
        
        if (forms.length === 0) {
            return {
                success: false,
                message: 'Nenhum formulário encontrado'
            };
        }
        
        let validForms = 0;
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input');
            const buttons = form.querySelectorAll('button');
            
            if (inputs.length > 0 && buttons.length > 0) {
                validForms++;
            }
        });
        
        if (validForms === 0) {
            return {
                success: false,
                message: 'Nenhum formulário válido encontrado'
            };
        }
        
        return {
            success: true,
            message: `${validForms} formulários válidos encontrados`
        };
    }
    
    // Teste: Verificar sistema de previsões
    testPredictionSystem() {
        if (!window.predictionSystem) {
            return {
                success: false,
                message: 'Sistema de previsões não encontrado'
            };
        }
        
        // Verifica se há previsões para pelo menos uma liga
        const leagues = window.predictionSystem.leagues;
        if (!leagues || leagues.length === 0) {
            return {
                success: false,
                message: 'Nenhuma liga encontrada no sistema de previsões'
            };
        }
        
        // Verifica se há previsões para a liga moçambicana
        const mocambolaPredictions = window.predictionSystem.getPredictionsByLeague('mocambola');
        if (!mocambolaPredictions || mocambolaPredictions.length === 0) {
            return {
                success: false,
                message: 'Nenhuma previsão encontrada para a liga moçambicana'
            };
        }
        
        return {
            success: true,
            message: `Sistema de previsões funcionando com ${leagues.length} ligas e ${mocambolaPredictions.length} jogos da liga moçambicana`
        };
    }
    
    // Teste: Verificar sistema de estatísticas
    testStatisticsSystem() {
        if (!window.statisticsSystem) {
            return {
                success: false,
                message: 'Sistema de estatísticas não encontrado'
            };
        }
        
        // Verifica se há estatísticas para pelo menos uma equipe
        const teams = Object.keys(window.statisticsSystem.teams);
        if (!teams || teams.length === 0) {
            return {
                success: false,
                message: 'Nenhuma equipe encontrada no sistema de estatísticas'
            };
        }
        
        // Verifica se há estatísticas para equipes moçambicanas
        const mozambicanTeams = teams.filter(team => {
            const teamData = window.statisticsSystem.getTeamStatistics(team);
            return teamData && teamData.league === 'mocambola';
        });
        
        if (!mozambicanTeams || mozambicanTeams.length === 0) {
            return {
                success: false,
                message: 'Nenhuma estatística encontrada para equipes moçambicanas'
            };
        }
        
        return {
            success: true,
            message: `Sistema de estatísticas funcionando com ${teams.length} equipes e ${mozambicanTeams.length} equipes moçambicanas`
        };
    }
    
    // Teste: Verificar sistema de localização
    testLocalizationSystem() {
        if (!window.localizationSystem) {
            return {
                success: false,
                message: 'Sistema de localização não encontrado'
            };
        }
        
        // Verifica se o locale está configurado para Moçambique
        if (window.localizationSystem.locale !== 'pt-MZ') {
            return {
                success: false,
                message: 'Locale não configurado para Moçambique'
            };
        }
        
        // Verifica se o fuso horário está configurado para CAT
        if (window.localizationSystem.timezone !== 'Africa/Maputo') {
            return {
                success: false,
                message: 'Fuso horário não configurado para CAT (Africa/Maputo)'
            };
        }
        
        // Verifica se há termos específicos de Moçambique
        const terms = Object.keys(window.localizationSystem.terms);
        if (!terms || terms.length === 0) {
            return {
                success: false,
                message: 'Nenhum termo específico de Moçambique encontrado'
            };
        }
        
        // Verifica se há feriados moçambicanos
        if (!window.localizationSystem.holidays || window.localizationSystem.holidays.length === 0) {
            return {
                success: false,
                message: 'Nenhum feriado moçambicano encontrado'
            };
        }
        
        return {
            success: true,
            message: `Sistema de localização funcionando com ${terms.length} termos específicos e ${window.localizationSystem.holidays.length} feriados moçambicanos`
        };
    }
    
    // Teste: Verificar tempo de carregamento
    testLoadTime() {
        // Obtém o tempo de carregamento da página
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        
        // Verifica se o tempo de carregamento é aceitável (menos de 3 segundos)
        if (loadTime > 3000) {
            return {
                success: false,
                message: `Tempo de carregamento muito alto: ${loadTime}ms`
            };
        }
        
        return {
            success: true,
            message: `Tempo de carregamento aceitável: ${loadTime}ms`
        };
    }
    
    // Teste: Verificar uso de memória
    testMemoryUsage() {
        // Verifica se a API de memória está disponível
        if (!window.performance || !window.performance.memory) {
            return {
                success: true,
                message: 'API de memória não disponível, teste ignorado'
            };
        }
        
        // Obtém o uso de memória
        const memoryUsage = window.performance.memory.usedJSHeapSize / (1024 * 1024);
        
        // Verifica se o uso de memória é aceitável (menos de 50MB)
        if (memoryUsage > 50) {
            return {
                success: false,
                message: `Uso de memória muito alto: ${memoryUsage.toFixed(2)}MB`
            };
        }
        
        return {
            success: true,
            message: `Uso de memória aceitável: ${memoryUsage.toFixed(2)}MB`
        };
    }
}

// Inicializa o sistema de testes quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Cria instância do sistema de testes
    window.testSystem = new TestSystem();
    
    // Verifica se estamos na página de testes
    const runTestsButton = document.getElementById('run-tests-button');
    if (runTestsButton) {
        runTestsButton.addEventListener('click', function() {
            window.testSystem.runAllTests();
        });
        
        // Executa os testes automaticamente se estiver na página de testes
        setTimeout(function() {
            window.testSystem.runAllTests();
        }, 1000);
    }
});
