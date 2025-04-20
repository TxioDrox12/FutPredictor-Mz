// FutPredict MZ - Script Principal
// Este arquivo contém as funcionalidades básicas do site

// Função para alternar o menu mobile
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// Adiciona event listener ao botão de menu
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.getElementById('nav-menu');
            navMenu.classList.remove('active');
        });
    });
    
    // Inicializa as abas nas páginas que as utilizam
    initializeTabs();
    
    // Adiciona a data atual no cabeçalho se existir o elemento
    updateCurrentDate();
    
    // Inicializa o relógio no cabeçalho se existir o elemento
    initializeClock();
});

// Função para inicializar as abas
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length > 0) {
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
}

// Função para atualizar a data atual
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('pt-MZ', options);
    }
}

// Função para inicializar o relógio
function initializeClock() {
    const clockElement = document.getElementById('header-clock');
    if (clockElement) {
        updateClock();
        setInterval(updateClock, 60000); // Atualiza a cada minuto
    }
}

// Função para atualizar o relógio
function updateClock() {
    const clockElement = document.getElementById('header-clock');
    if (clockElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes} CAT`;
    }
}

// Função para formatar datas
function formatDate(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    return date.toLocaleDateString('pt-MZ');
}

// Função para formatar porcentagens
function formatPercentage(value) {
    return `${Math.round(value)}%`;
}

// Função para obter parâmetros da URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Função para criar elementos HTML dinamicamente
function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}

// Função para adicionar classes condicionalmente
function addClassIf(element, condition, className) {
    if (condition) {
        element.classList.add(className);
    }
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Cria o elemento de notificação se não existir
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '1000';
        document.body.appendChild(container);
    }
    
    const container = document.getElementById('notification-container');
    
    // Cria a notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estiliza a notificação
    notification.style.backgroundColor = type === 'success' ? '#009639' : type === 'error' ? '#CE1126' : '#FEDF00';
    notification.style.color = type === 'info' ? '#000' : '#fff';
    notification.style.padding = '15px';
    notification.style.marginBottom = '10px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.opacity = '0';
    
    // Adiciona a notificação ao container
    container.appendChild(notification);
    
    // Anima a entrada da notificação
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Adiciona event listener para fechar a notificação
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.opacity = '0';
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    });
    
    // Remove a notificação após 5 segundos
    setTimeout(() => {
        if (notification.parentNode === container) {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode === container) {
                    container.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Função para validar formulários
function validateForm(form) {
    let isValid = true;
    
    // Verifica campos obrigatórios
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    // Verifica campos de e-mail
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value.trim() && !isValidEmail(field.value)) {
            isValid = false;
            field.classList.add('error');
        }
    });
    
    return isValid;
}

// Função para validar e-mail
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para validar número de telefone moçambicano
function isValidMozambiquePhone(phone) {
    // Números moçambicanos começam com 84 ou 85 e têm 9 dígitos
    const regex = /^(84|85)[0-9]{7}$/;
    return regex.test(phone);
}

// Função para formatar número de telefone moçambicano
function formatMozambiquePhone(phone) {
    if (!phone) return '';
    
    // Remove todos os caracteres não numéricos
    const digits = phone.replace(/\D/g, '');
    
    // Se já começar com 258, não adiciona novamente
    if (digits.startsWith('258')) {
        return `+${digits}`;
    }
    
    return `+258 ${digits}`;
}

// Função para compartilhar conteúdo
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url || window.location.href
        })
        .then(() => console.log('Conteúdo compartilhado com sucesso'))
        .catch(error => console.log('Erro ao compartilhar:', error));
    } else {
        // Fallback para navegadores que não suportam a API Web Share
        prompt('Copie o link e compartilhe:', url || window.location.href);
    }
}

// Função para compartilhar via WhatsApp
function shareViaWhatsApp(text, url) {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + (url || window.location.href))}`;
    window.open(shareUrl, '_blank');
}

// Função para carregar conteúdo dinamicamente via AJAX
function loadContent(url, targetElement, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (typeof targetElement === 'string') {
                    targetElement = document.querySelector(targetElement);
                }
                if (targetElement) {
                    targetElement.innerHTML = xhr.responseText;
                }
                if (callback && typeof callback === 'function') {
                    callback(xhr.responseText);
                }
            } else {
                console.error('Erro ao carregar conteúdo:', xhr.status);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// Adiciona estilos para notificações
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: relative;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: inherit;
            opacity: 0.7;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        .error {
            border: 1px solid #CE1126 !important;
        }
    `;
    document.head.appendChild(style);
    
    // Inicializa formulários de newsletter
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                // Simula o envio do formulário
                setTimeout(() => {
                    showNotification(`Obrigado por se inscrever! Você receberá nossas previsões no e-mail ${email}.`, 'success');
                    emailInput.value = '';
                }, 500);
            } else {
                showNotification('Por favor, preencha todos os campos corretamente.', 'error');
            }
        });
    });
    
    // Inicializa links de compartilhamento via WhatsApp
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mostra modal para inserir número de telefone
            showWhatsAppModal();
        });
    });
});

// Função para mostrar modal de WhatsApp
function showWhatsAppModal() {
    // Cria o modal se não existir
    if (!document.getElementById('whatsapp-modal')) {
        const modal = document.createElement('div');
        modal.id = 'whatsapp-modal';
        modal.className = 'modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Receber Previsões por WhatsApp</h3>
                <p>Insira seu número de telefone para receber previsões diárias (formato: 84XXXXXXX ou 85XXXXXXX)</p>
                <div class="phone-input">
                    <span class="country-code">+258</span>
                    <input type="tel" id="whatsapp-number" placeholder="84XXXXXXX" pattern="[0-9]{9}" maxlength="9">
                </div>
                <button id="subscribe-whatsapp" class="btn-primary">Inscrever-se</button>
                <p class="modal-note">Você receberá no máximo 1 mensagem por dia com previsões gratuitas.</p>
            </div>
        `;
        
        // Adiciona estilos para o modal
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
            }
            
            .modal-content {
                background-color: white;
                margin: 15% auto;
                padding: 20px;
                border-radius: 10px;
                width: 80%;
                max-width: 500px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                position: relative;
            }
            
            .close-modal {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 24px;
                font-weight: bold;
                cursor: pointer;
            }
            
            .phone-input {
                display: flex;
                align-items: center;
                margin: 20px 0;
            }
            
            .country-code {
                background-color: #f5f5f5;
                padding: 10px;
                border: 1px solid #ddd;
                border-right: none;
                border-radius: 5px 0 0 5px;
            }
            
            #whatsapp-number {
                flex: 1;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 0 5px 5px 0;
                font-size: 16px;
            }
            
            .modal-note {
                font-size: 0.9rem;
                color: #666;
                margin-top: 15px;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        
        // Adiciona event listeners
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        const subscribeBtn = modal.querySelector('#subscribe-whatsapp');
        subscribeBtn.addEventListener('click', function() {
            const phoneInput = modal.querySelector('#whatsapp-number');
            const phoneNumber = phoneInput.value.trim();
            
            // Validação simples para números moçambicanos
            if (isValidMozambiquePhone(phoneNumber)) {
                // Simula o envio do formulário
                setTimeout(() => {
                    showNotification(`Obrigado! Você receberá previsões gratuitas no número +258 ${phoneNumber}.`, 'success');
                    phoneInput.value = '';
                    modal.style.display = 'none';
                }, 500);
            } else {
                showNotification('Por favor, insira um número de telefone válido de Moçambique (começando com 84 ou 85).', 'error');
            }
        });
        
        // Fecha o modal se clicar fora dele
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Exibe o modal
    const modal = document.getElementById('whatsapp-modal');
    modal.style.display = 'block';
}
