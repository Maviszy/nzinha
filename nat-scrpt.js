document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    const splashButton = document.querySelector('.splash-button');
    const mainContent = document.getElementById('mainContent');
    const starsBackground = document.querySelector('.stars-background');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    const spotifyIframe = document.querySelector('.spotify-embed iframe');

    const CORRECT_PASSWORD = "16";

    const generateStars = (numStars) => {
        if (!starsBackground) return; // Garante que o elemento existe
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.width = `${Math.random() * 3 + 1}px`;
            star.style.height = star.style.width;
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 4}s`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            starsBackground.appendChild(star);
        }
    };

    const numStars = window.innerWidth > 768 ? 150 : 70;
    generateStars(numStars);

    // Função para iniciar o áudio do Spotify
    function startSpotifyAudio() {
        if (spotifyIframe && spotifyIframe.src) {
            // Verifica se o src do iframe já contém o parâmetro autoplay.
            // Se sim, não precisa adicionar novamente, apenas garantir que está ativo.
            // Caso contrário, adiciona o autoplay.
            if (!spotifyIframe.src.includes('autoplay=1')) {
                const currentSrc = spotifyIframe.src;
                // Remove qualquer parâmetro existente antes de adicionar o autoplay
                const cleanSrc = currentSrc.split('?')[0];
                spotifyIframe.src = `${cleanSrc}?autoplay=1`;
            }

            // Uma tentativa extra para forçar o play.
            // Nem sempre funciona com Spotify, mas vale a pena tentar.
            // Para ser mais eficaz, o iframe precisaria de um atributo 'id'
            // para enviar uma mensagem mais direcionada a ele.
            // Ex: spotifyIframe.contentWindow.postMessage({command: 'play'}, '*');
            // No entanto, isso raramente funciona para iframes de terceiros como o Spotify devido a CORS e segurança.
            // A melhor aposta ainda é o 'autoplay=1' no SRC e o refresh do SRC.
        } else {
            console.warn('Spotify iframe não encontrado ou sem SRC. Verifique o HTML.');
        }
    }

    splashButton.addEventListener('click', () => {
        const enteredPassword = passwordInput.value;

        if (enteredPassword === CORRECT_PASSWORD) {
            errorMessage.classList.remove('visible');
            splashScreen.classList.add('hidden');

            // Timeout para permitir a transição CSS antes de mostrar o conteúdo e iniciar a música
            setTimeout(() => {
                mainContent.classList.add('visible');
                // Remove o splashScreen do DOM após a transição para liberar recursos
                splashScreen.remove();
                startSpotifyAudio(); // Tenta iniciar a música
                document.body.style.overflow = 'auto'; // Habilita a rolagem do corpo após a transição
            }, 1000); // Deve ser igual ou maior que a duração da transição CSS do splash-screen
        } else {
            errorMessage.textContent = "Senha incorreta. Tente novamente!";
            errorMessage.classList.add('visible');
            passwordInput.value = '';
            passwordInput.focus(); // Mantém o foco no campo de senha para nova tentativa
            // Remove a mensagem de erro após alguns segundos
            setTimeout(() => {
                errorMessage.classList.remove('visible');
            }, 3000);
        }
    });

    passwordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            splashButton.click(); // Simula o clique no botão se Enter for pressionado
        }
    });

    // Impede a rolagem do corpo da página enquanto a tela de splash estiver ativa
    document.body.style.overflow = 'hidden';

    // Carrossel de Fotos Estilo Cassete
    const carousel = document.querySelector('.cassette-carousel');
    const photos = document.querySelectorAll('.cassette-photo');
    const prevButton = document.querySelector('.cassette-nav.prev');
    const nextButton = document.querySelector('.cassette-nav.next');
    let currentIndex = 0;

    // Função para atualizar a posição do carrossel
    function updateCarousel() {
        if (!carousel || photos.length === 0) return; // Garante que os elementos existam

        // Garante que o índice esteja dentro dos limites
        if (currentIndex < 0) {
            currentIndex = photos.length - 1;
        } else if (currentIndex >= photos.length) {
            currentIndex = 0;
        }

        const photoWidth = photos[0].offsetWidth; // Obtém a largura de um item de foto
        carousel.style.transform = `translateX(${-currentIndex * photoWidth}px)`;
    }

    if (prevButton) { // Verifica se os botões existem antes de adicionar event listeners
        prevButton.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });
    }

    if (nextButton) { // Verifica se os botões existem antes de adicionar event listeners
        nextButton.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });
    }

    // Otimiza o evento de redimensionamento para evitar múltiplas execuções
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCarousel, 200); // Atraso de 200ms para recalcular o carrossel
    });

    // Chama na inicialização para posicionar corretamente e garantir que fotos.length > 0
    // Isso também vai definir o overflow do body para 'auto' após a splash.
    if (splashScreen.classList.contains('hidden')) {
        // Se por algum motivo a splash já estiver oculta ao carregar (ex: se o JS rodar tarde)
        mainContent.classList.add('visible');
        document.body.style.overflow = 'auto';
        startSpotifyAudio(); // Tenta iniciar a música
    }

    // Inicializa o carrossel uma vez que a página está pronta e elementos são carregados
    updateCarousel();
});document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const splashButton = document.querySelector('.splash-button');
    const mainContent = document.getElementById('mainContent');
    const errorMessage = document.getElementById('errorMessage');
    let passwordEntered = false;

    // Função para iniciar o áudio do Spotify
    function startSpotifyAudio() {
        const spotifyIframe = document.querySelector('.spotify-embed iframe');
        if (spotifyIframe) {
            spotifyIframe.src += (spotifyIframe.src.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';
        }
    }

    splashButton.addEventListener('click', function() {
        const password = passwordInput.value;
        if (password === '16') { // Substitua 'a senha aqui' pela senha correta
            passwordEntered = true;
            mainContent.style.display = 'block';
            document.querySelector('.splash-screen').style.display = 'none';
            startSpotifyAudio(); // Inicia o áudio após a senha correta
        } else {
            errorMessage.textContent = 'Senha incorreta. Tente novamente.';
        }
    });

    passwordInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            splashButton.click();
        }
    });

    // Tenta iniciar o áudio se a senha já foi inserida (para evitar bloqueios de autoplay)
    if (passwordEntered) {
        startSpotifyAudio();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const splashButton = document.querySelector('.splash-button');
    const mainContent = document.getElementById('mainContent');
    const errorMessage = document.getElementById('errorMessage');
    const marisaMonteIframe = document.getElementById('marisaMonteSong'); // Obter o iframe da música da Marisa Monte

    // Função para iniciar o áudio dos players
    function startAudioPlayers() {
        if (marisaMonteIframe) {
            // Garante que o autoplay e o áudio estejam ativados para a música da Marisa Monte
            let marisaMonteSrc = marisaMonteIframe.src;
            // Apenas adiciona autoplay e mute=0 se já não estiverem presentes
            if (!marisaMonteSrc.includes('autoplay=1')) {
                marisaMonteSrc += (marisaMonteSrc.includes('?') ? '&' : '?') + 'autoplay=1';
            }
            if (!marisaMonteSrc.includes('mute=0')) { // Garante que não esteja mutado
                marisaMonteSrc += (marisaMonteSrc.includes('?') ? '&' : '?') + 'mute=0';
            }
            marisaMonteIframe.src = marisaMonteSrc; // Atualiza o src do iframe
            console.log('Tentando iniciar a música da Marisa Monte:', marisaMonteIframe.src);
        }

        // Se você também quiser tentar o autoplay para a playlist (opcional, pode ser bloqueado)
        // Note o uso de ':not(#marisaMonteSong)' para não pegar a música da Marisa Monte novamente
        const playlistIframe = document.querySelector('.spotify-embed iframe:not(#marisaMonteSong)');
        if (playlistIframe) {
            let playlistSrc = playlistIframe.src;
            if (!playlistSrc.includes('autoplay=1')) {
                playlistSrc += (playlistSrc.includes('?') ? '&' : '?') + 'autoplay=1';
            }
            if (!playlistSrc.includes('mute=0')) {
                playlistSrc += (playlistSrc.includes('?') ? '&' : '?') + 'mute=0';
            }
            playlistIframe.src = playlistSrc;
            console.log('Tentando iniciar a playlist:', playlistIframe.src);
        }
    }

    splashButton.addEventListener('click', function() {
        const password = passwordInput.value;
        const correctPassword = 'sua_senha_aqui'; // <-- MUITO IMPORTANTE: MUDAR AQUI PARA A SENHA REAL

        if (password === correctPassword) {
            mainContent.style.display = 'block';
            document.querySelector('.splash-screen').style.display = 'none';
            startAudioPlayers(); // CHAMA A FUNÇÃO PARA INICIAR OS PLAYERS
            errorMessage.textContent = ''; // Esconder o erro se estava aparecendo
        } else {
            errorMessage.textContent = 'Senha incorreta. Tente novamente.';
        }
    });

    passwordInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            splashButton.click();
        }
    });

    // Código do carrossel (mantido do anterior)
    const carousel = document.querySelector('.cassette-carousel');
    const prevButton = document.querySelector('.cassette-nav.prev');
    const nextButton = document.querySelector('.cassette-nav.next');
    let currentIndex = 0;

    if (carousel && prevButton && nextButton) {
        const photos = carousel.children;
        const totalPhotos = photos.length;

        function showPhoto(index) {
            if (index >= totalPhotos) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = totalPhotos - 1;
            } else {
                currentIndex = index;
            }
            const offset = -currentIndex * 100; // Assumindo que cada foto ocupa 100% da largura do contêiner
            carousel.style.transform = `translateX(${offset}%)`;
        }

        prevButton.addEventListener('click', () => {
            showPhoto(currentIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            showPhoto(currentIndex + 1);
        });

        showPhoto(currentIndex); // Mostra a primeira foto ao carregar
    }
});