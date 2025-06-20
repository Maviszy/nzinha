document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    const splashButton = document.querySelector('.splash-button');
    const mainContent = document.getElementById('mainContent');
    const starsBackground = document.querySelector('.stars-background');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');

    const CORRECT_PASSWORD = "16"; // A senha secreta!

    // Função para gerar estrelas dinamicamente
    const generateStars = (numStars) => {
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.width = `${Math.random() * 3 + 1}px`; // Estrelas de 1 a 4px
            star.style.height = star.style.width;
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 4}s`; // Atraso para cintilar em momentos diferentes
            star.style.animationDuration = `${Math.random() * 3 + 2}s`; // Duração da animação de 2 a 5s
            starsBackground.appendChild(star);
        }
    };

    // Gera um número diferente de estrelas dependendo do tamanho da tela
    const numStars = window.innerWidth > 768 ? 150 : 70; // Mais estrelas para desktop, menos para mobile
    generateStars(numStars);

    // Oculta a tela de splash e mostra o conteúdo principal ao clicar no botão
    splashButton.addEventListener('click', () => {
        const enteredPassword = passwordInput.value;

        if (enteredPassword === CORRECT_PASSWORD) {
            errorMessage.classList.remove('visible'); // Esconde a mensagem de erro se estiver visível
            splashScreen.classList.add('hidden');
            // Adiciona um pequeno atraso antes de mostrar o conteúdo principal
            // para permitir a transição completa do splash
            setTimeout(() => {
                mainContent.classList.add('visible');
                // Remove a tela de splash do DOM após a transição
                // para garantir que ela não interfira mais
                splashScreen.remove();
            }, 1000); // Deve ser igual ou maior que a transição CSS da splash-screen
        } else {
            errorMessage.textContent = "Senha incorreta. Tente novamente!";
            errorMessage.classList.add('visible'); // Mostra a mensagem de erro
            passwordInput.value = ''; // Limpa o campo da senha
            passwordInput.focus(); // Coloca o foco de volta no campo
        }
    });

    // Permite pressionar Enter para submeter a senha
    passwordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            splashButton.click(); // Simula o clique no botão
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // ... (seu código existente) ...

    // Carrossel de Fotos Estilo Cassete
    const carousel = document.querySelector('.cassette-carousel');
    const photos = document.querySelectorAll('.cassette-photo');
    const prevButton = document.querySelector('.cassette-nav.prev');
    const nextButton = document.querySelector('.cassette-nav.next');
    let currentIndex = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % photos.length;
        updateCarousel();
    });
});