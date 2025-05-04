  // Anime data
      const animeData = [
        {
          title: "Attack on Titan",
          episodes: 75,
          rating: 9.0,
          about:
            "In a world where humanity lives within cities surrounded by enormous walls that protect them from gigantic man-eating humanoids, a young boy vows to retake the world after a titan brings tragedy to his home.",
          img: "https://m.media-amazon.com/images/M/MV5BNDFjYTIxMjctYTQ2ZC00OGQ4LWE3OGYtNDdiMzNiNDZlMDAwXkEyXkFqcGdeQXVyNzI3NjY3NjQ@._V1_FMjpg_UX1000_.jpg",
        },
        {
          title: "Demon Slayer",
          episodes: 44,
          rating: 8.7,
          about:
            "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
          img: "https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg",
        },
        {
          title: "One Punch Man",
          episodes: 24,
          rating: 8.8,
          about:
            "The story of Saitama, a hero who can defeat any opponent with a single punch but seeks a worthy opponent after growing bored.",
          img: "https://m.media-amazon.com/images/M/MV5BMTNmZDE2NDEtNTg3MS00OTE1LThlZGUtOGZkZTg0NTUyNGVmXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg",
        },
        {
          title: "My Hero Academia",
          episodes: 113,
          rating: 8.4,
          about:
            "A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.",
          img: "https://m.media-amazon.com/images/M/MV5BOGZmYjdjN2UtNjAwZi00YmEyLWFhNTEtNjM1MTFjOGJkOTkwXkEyXkFqcGdeQXVyMTA1NjQyNjkw._V1_.jpg",
        },
        {
          title: "Jujutsu Kaisen",
          episodes: 24,
          rating: 8.6,
          about:
            "A boy swallows a cursed talisman and becomes cursed himself. He enters a shaman school to be able to locate the demon's body parts.",
          img: "https://m.media-amazon.com/images/M/MV5BMTMwMDM4N2EtOTJiYy00OTQ0LThlZDYtYWUwOWFlY2IxZGVjXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        },
        {
          title: "Dragon Ball Super",
          episodes: 131,
          rating: 8.4,
          about:
            "Six months after the defeat of Majin Buu, The mighty Saiyan Son Goku continues his quest on becoming stronger.",
          img: "https://m.media-amazon.com/images/M/MV5BY2I2MzI1ODYtMWRlOS00MzdhLWEyOWEtYWJhNmFiZTllYzU2XkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_FMjpg_UX1000_.jpg",
        },
        {
          title: "Fullmetal Alchemist: Brotherhood",
          episodes: 64,
          rating: 9.1,
          about:
            "Two brothers search for a Philosopher's Stone after an attempt to revive their deceased mother goes wrong and leaves them in damaged physical forms.",
          img: "https://m.media-amazon.com/images/M/MV5BZmEzN2YzOTItMDI5MS00MGU4LWI1NWQtOTg5ZThhNGQwYTEzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        },
        {
          title: "Tokyo Ghoul",
          episodes: 48,
          rating: 7.8,
          about:
            "A Tokyo college student is attacked by a ghoul, a superpowered human who feeds on human flesh. He survives, but has become part ghoul.",
          img: "https://m.media-amazon.com/images/M/MV5BNTFkOTZlY2ItNWI4MC00YWNkLTk4ZjctMGMwZGJlYzQxZTliXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg",
        },
        {
          title: "Naruto Shippuden",
          episodes: 500,
          rating: 8.7,
          about:
            "Naruto Uzumaki, is a loud, hyperactive, adolescent ninja who constantly searches for approval and recognition, as well as to become Hokage, who is acknowledged as the leader and strongest of all ninja in the village.",
          img: "https://m.media-amazon.com/images/M/MV5BZjJlZzg5YmQtMWRlZC00YTJlLWI1ZDYtZTUwYmI0ZmMxNmI4XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_.jpg",
        },
      ];

      // DOM Elements
      let animeCardsContainer;
      let loadMoreButton;
      let navButtons;
      let sections;
      let mobileMenuToggle;
      let mobileMenu;
      let mobileMenuClose;
      let searchToggle;
      let searchContainer;
      let searchInput;
      let mobileSearchToggle;
      let mobileSearchContainer;
      let mobileSearchInput;
      
      // State variables
      let visibleCards = 3;
      let idleTimer;
      let konamiIndex = 0;
      const konamiCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
      ];

      function checkKonamiCode(e) {
        if (e.key === konamiCode[konamiIndex]) {
          konamiIndex++;
          if (konamiIndex === konamiCode.length) {
            toggleMadaraMode();
            konamiIndex = 0;
          }
        } else {
          konamiIndex = 0;
        }
      }

      // Idle detection for ambient effects
      function resetIdleTimer() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(activateIdleMode, 30000); // 30 seconds
      }

      function activateIdleMode() {
        const particles = document.getElementById("particleCanvas");
        particles.style.opacity = "0.6";

        // Random glow pulse on elements
        document.querySelectorAll(".btn, .nav-btn").forEach((elem) => {
          elem.classList.add("animate-glow-pulse");
        });

        // Add floating animation to cards
        document.querySelectorAll(".anime-card").forEach((card) => {
          card.classList.add("animate-float");
        });

        // Display easter egg message
        const introTitle = document.querySelector(".intro-title");
        introTitle.textContent = "Are you still there...?";
        introTitle.classList.add("animate-flicker");

        // Return to normal after interaction
        window.addEventListener("mousemove", exitIdleMode, { once: true });
        window.addEventListener("keydown", exitIdleMode, { once: true });
      }

      function exitIdleMode() {
        const particles = document.getElementById("particleCanvas");
        particles.style.opacity = "0.2";

        // Remove animations
        document.querySelectorAll(".btn, .nav-btn").forEach((elem) => {
          elem.classList.remove("animate-glow-pulse");
        });

        document.querySelectorAll(".anime-card").forEach((card) => {
          card.classList.remove("animate-float");
        });

        // Restore title
        const introTitle = document.querySelector(".intro-title");
        introTitle.innerHTML =
          '<span class="typewriter">Zen1x_</span>';
        introTitle.classList.add("animate-flicker");

        resetIdleTimer();
      }

      // Handle section changes
      function changeSection(sectionId) {
        // Update active section
        sections.forEach((section) => {
          section.classList.remove("active");
        });
        document.getElementById(sectionId).classList.add("active");

        // Update active nav button
        navButtons.forEach((button) => {
          button.classList.remove("active");
          if (button.dataset.section === sectionId) {
            button.classList.add("active");
          }
        });
      }

      // Mobile menu and search functionality
      function setupMobileMenu() {
        console.log('Setting up mobile menu');

        // Mobile menu toggle
        mobileMenuToggle.addEventListener("click", () => {
          console.log('Menu toggle clicked');
          mobileMenu.classList.add("active");
        });

        // Mobile menu close button
        mobileMenuClose.addEventListener("click", () => {
          console.log('Menu close clicked');
          mobileMenu.classList.remove("active");
        });

        // Navigation buttons inside mobile menu
        document.querySelectorAll('.mobile-menu .nav-btn[data-section]').forEach(button => {
          button.addEventListener('click', () => {
            console.log('Mobile nav button clicked:', button.dataset.section);
            changeSection(button.dataset.section);
            mobileMenu.classList.remove("active");
          });
        });

        // Search toggle buttons
        searchToggle.addEventListener("click", () => {
          searchContainer.style.display =
            searchContainer.style.display === "none" ? "block" : "none";
          if (searchContainer.style.display === "block") {
            searchInput.focus();
          }
        });

        mobileSearchToggle.addEventListener("click", () => {
          mobileSearchContainer.style.display =
            mobileSearchContainer.style.display === "none" ? "block" : "none";
          if (mobileSearchContainer.style.display === "block") {
            mobileSearchInput.focus();
          }
        });
      }

      // Madara mode toggle
      function toggleMadaraMode() {
        document.body.classList.toggle("madara-mode");
      }

      // Render anime cards
      function renderAnimeCards() {
        animeCardsContainer.innerHTML = "";
        const filteredData = animeData.filter((anime) => {
          const searchTerm = (searchInput.value || mobileSearchInput.value).toLowerCase();
          return (
            anime.title.toLowerCase().includes(searchTerm) ||
            anime.about.toLowerCase().includes(searchTerm)
          );
        });

        filteredData.slice(0, visibleCards).forEach((anime) => {
          const card = document.createElement("div");
          card.className = "anime-card glassmorphic";
          card.innerHTML = `
            <div class="anime-card-image">
              <img src="${anime.img}" alt="${anime.title}" loading="lazy" />
              <div class="anime-card-overlay"></div>
              <h3 class="anime-card-title">${anime.title}</h3>
            </div>
            <div class="anime-card-content">
              <div class="anime-card-stats">
                <span class="neon-blue">${anime.episodes} Episodes</span>
                <span class="neon-green">${anime.rating} / 10</span>
              </div>
              <p class="anime-card-description">${anime.about}</p>
              <button class="btn btn-blue btn-full">
                <i class="bx bx-play"></i>
                <span>Watch Now</span>
              </button>
            </div>
          `;
          animeCardsContainer.appendChild(card);
        });

        // Show/hide load more button
        if (filteredData.length <= visibleCards) {
          loadMoreButton.style.display = "none";
        } else {
          loadMoreButton.style.display = "block";
        }
      }

      // Filter anime cards based on search input
      function filterAnimeCards(searchTerm) {
        searchInput.value = searchTerm;
        mobileSearchInput.value = searchTerm;
        visibleCards = 3;
        renderAnimeCards();
      }

      // Initialize particles
      function initParticles() {
        const canvas = document.getElementById("particleCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            color: `rgba(${Math.random() * 155 + 100}, ${
              Math.random() * 155 + 100
            }, 255, ${Math.random() * 0.6 + 0.1})`,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1,
          });
        }

        function animate() {
          requestAnimationFrame(animate);
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particles.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(
              particle.x,
              particle.y,
              particle.radius,
              0,
              Math.PI * 2,
              false
            );
            ctx.fillStyle = particle.color;
            ctx.fill();

            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) {
              particle.vx = -particle.vx;
            }

            if (particle.y < 0 || particle.y > canvas.height) {
              particle.vy = -particle.vy;
            }
          });
        }

        animate();

        window.addEventListener("resize", () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        });
      }

      // Parallax effect for background
      function handleParallax(e) {
        const xOffset = e.clientX / window.innerWidth - 0.5;
        const yOffset = e.clientY / window.innerHeight - 0.5;
        const intensity = 20;

        document.querySelector(".bg-image").style.transform = `translate(${
          xOffset * -intensity
        }px, ${yOffset * -intensity}px)`;
      }

      // Set up event listeners
      function setupEventListeners() {
        // Navigation buttons
        navButtons.forEach((button) => {
          button.addEventListener("click", () => {
            changeSection(button.dataset.section);
          });
        });

        // Setup mobile menu
        setupMobileMenu();

        // Search input events
        searchInput.addEventListener("input", () => {
          filterAnimeCards(searchInput.value);
        });

        mobileSearchInput.addEventListener("input", () => {
          filterAnimeCards(mobileSearchInput.value);
        });

        // Load more button
        loadMoreButton.addEventListener("click", () => {
          visibleCards += 3;
          renderAnimeCards();
        });

        // Parallax effect
        document.addEventListener("mousemove", handleParallax);

        // Konami code for Madara mode
        document.addEventListener("keydown", checkKonamiCode);

        // Shortcut for Madara mode (Shift + M)
        document.addEventListener("keydown", (e) => {
          if (e.key === "M" && e.shiftKey) {
            toggleMadaraMode();
          }
        });

        // Idle detection
        ["mousemove", "keydown", "mousedown", "touchstart"].forEach((event) => {
          document.addEventListener(event, resetIdleTimer);
        });

        // Button click effects
        document.querySelectorAll(".btn").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            // Create ripple element
            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            btn.appendChild(ripple);

            // Position the ripple
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // Remove after animation
            setTimeout(() => {
              ripple.remove();
            }, 600);
          });
        });

        // Footer links
        document.querySelectorAll(".footer-link a[data-section]").forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            changeSection(link.dataset.section);
            window.scrollTo(0, 0);
          });
        });
      }

      // Initialize the app
      document.addEventListener("DOMContentLoaded", () => {
        console.log("DOM fully loaded, initializing app");
        
        // Initialize DOM elements
        animeCardsContainer = document.getElementById("anime-cards-container");
        loadMoreButton = document.getElementById("load-more");
        navButtons = document.querySelectorAll(".nav-btn[data-section]");
        sections = document.querySelectorAll(".section");
        mobileMenuToggle = document.querySelector(".nav-menu-toggle");
        mobileMenu = document.querySelector(".mobile-menu");
        mobileMenuClose = document.querySelector(".mobile-menu-close");
        searchToggle = document.getElementById("search-toggle");
        searchContainer = document.querySelector(".nav-content + .search-container");
        searchInput = document.getElementById("search-input");
        mobileSearchToggle = document.getElementById("mobile-search-toggle");
        mobileSearchContainer = document.querySelector(".mobile-menu .search-container");
        mobileSearchInput = document.getElementById("mobile-search-input");
        
        // Log key elements
        console.log("Mobile menu:", mobileMenu);
        console.log("Mobile menu toggle:", mobileMenuToggle);
        console.log("Mobile menu close:", mobileMenuClose);

        // Render initial anime cards
        renderAnimeCards();

        // Initialize particles
        initParticles();

        // Set up event listeners
        setupEventListeners();

        // Start idle timer
        resetIdleTimer();
      });
