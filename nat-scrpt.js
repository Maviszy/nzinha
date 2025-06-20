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
        if (!starsBackground) return;
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

    function startSpotifyAudio() {
        if (spotifyIframe && spotifyIframe.src) {
            if (!spotifyIframe.src.includes('autoplay=1')) {
                const currentSrc = spotifyIframe.src;
                const cleanSrc = currentSrc.split('?')[0];
                spotifyIframe.src = `${cleanSrc}?autoplay=1`;
            }
        } else {
            console.warn('Spotify iframe não encontrado ou sem SRC. Verifique o HTML.');
        }
    }

    splashButton.addEventListener('click', () => {
        const enteredPassword = passwordInput.value;

        if (enteredPassword === CORRECT_PASSWORD) {
            errorMessage.classList.remove('visible');
            splashScreen.classList.add('hidden');

            setTimeout(() => {
                mainContent.classList.add('visible');
                splashScreen.remove();
                startSpotifyAudio();
                document.body.style.overflow = 'auto';
            }, 1000);
        } else {
            errorMessage.textContent = "Senha incorreta. Tente novamente!";
            errorMessage.classList.add('visible');
            passwordInput.value = '';
            passwordInput.focus();
            setTimeout(() => {
                errorMessage.classList.remove('visible');
            }, 3000);
        }
    });

    passwordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            splashButton.click();
        }
    });

    document.body.style.overflow = 'hidden';

    const carousel = document.querySelector('.cassette-carousel');
    const photos = document.querySelectorAll('.cassette-photo');
    const prevButton = document.querySelector('.cassette-nav.prev');
    const nextButton = document.querySelector('.cassette-nav.next');
    let currentIndex = 0;

    function updateCarousel() {
        if (!carousel || photos.length === 0) return;

        if (currentIndex < 0) {
            currentIndex = photos.length - 1;
        } else if (currentIndex >= photos.length) {
            currentIndex = 0;
        }

        const photoWidth = photos[0].offsetWidth;
        carousel.style.transform = `translateX(${-currentIndex * photoWidth}px)`;
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCarousel, 200);
    });

    if (splashScreen.classList.contains('hidden')) {
        mainContent.classList.add('visible');
        document.body.style.overflow = 'auto';
        startSpotifyAudio();
    }

    updateCarousel();
});
