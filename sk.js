  let animeData = [];
  let visibleCards = 3;

  function extractAnimeDataFromPosts() {
    const posts = document.querySelectorAll('.post'); // अपने थीम के पोस्ट कंटेनर का सही सेलेक्टर इस्तेमाल करें
    const extractedData = [];

    posts.forEach(post => {
      const titleElement = post.querySelector('.post-title a');
      const descriptionElement = post.querySelector('.post-body');
      const imageElement = post.querySelector('.post-body img');
      let episodes = null;
      let rating = null;

      // ... पोस्ट कंटेंट से एपिसोड और रेटिंग निकालने का लॉजिक (उदाहरण के लिए) ...
      if (descriptionElement) {
        const episodesMatch = descriptionElement.textContent.match(/Episodes:\s*(\d+)/i);
        if (episodesMatch && episodesMatch[1]) {
          episodes = parseInt(episodesMatch[1]);
        }
        const ratingMatch = descriptionElement.textContent.match(/Rating:\s*([\d.]+)/i);
        if (ratingMatch && ratingMatch[1]) {
          rating = parseFloat(ratingMatch[1]);
        }
      }

      if (titleElement && descriptionElement && imageElement) {
        extractedData.push({
          title: titleElement.textContent.trim(),
          about: descriptionElement.textContent.trim().substring(0, 150) + '...', // छोटा विवरण
          img: imageElement.src,
          episodes: episodes,
          rating: rating,
        });
      }
    });

    return extractedData;
  }

  function renderAnimeCards() {
    const animeCardsContainer = document.getElementById("anime-cards-container");
    const loadMoreButton = document.getElementById("load-more");
    if (!animeCardsContainer || !loadMoreButton) return;

    animeCardsContainer.innerHTML = "";
    animeData.slice(0, visibleCards).forEach((anime) => {
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
            <span class="neon-blue">${anime.episodes !== null ? anime.episodes + ' Episodes' : ''}</span>
            <span class="neon-green">${anime.rating !== null ? anime.rating + ' / 10' : ''}</span>
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

    if (animeData.length <= visibleCards) {
      loadMoreButton.style.display = "none";
    } else {
      loadMoreButton.style.display = "block";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded, extracting and rendering anime data from posts");

    const animeCardsContainer = document.getElementById("anime-cards-container");
    const loadMoreButton = document.getElementById("load-more");
    if (!animeCardsContainer || !loadMoreButton) return;

    animeData = extractAnimeDataFromPosts();
    renderAnimeCards();

    loadMoreButton.addEventListener("click", () => {
      visibleCards += 3;
      renderAnimeCards();
    });

    // ... बाकी आपकी अन्य JavaScript कार्यक्षमता (initParticles, setupEventListeners, resetIdleTimer) ...
    initParticles();
    setupEventListeners();
    resetIdleTimer();
  });

  // Particles initialization
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

  // Event listeners setup
  function setupEventListeners() {
    const navButtons = document.querySelectorAll(".nav-btn[data-section]");
    const mobileMenuToggle = document.querySelector(".nav-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileMenuClose = document.querySelector(".mobile-menu-close");
    const searchToggle = document.getElementById("search-toggle");
    const searchContainer = document.querySelector(".nav-content + .search-container");
    const searchInput = document.getElementById("search-input");
    const mobileSearchToggle = document.getElementById("mobile-search-toggle");
    const mobileSearchContainer = document.querySelector(".mobile-menu .search-container");
    const mobileSearchInput = document.getElementById("mobile-search-input");
    const sections = document.querySelectorAll(".section");

    // Navigation buttons
    navButtons.forEach((button) => {
      button.addEventListener("click", () => {
        changeSection(button.dataset.section);
      });
    });

    // Setup mobile menu
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.add("active");
      });

      mobileMenuClose.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });

      document.querySelectorAll('.mobile-menu .nav-btn[data-section]').forEach(button => {
        button.addEventListener('click', () => {
          changeSection(button.dataset.section);
          mobileMenu.classList.remove("active");
        });
      });

      const mobileSearchToggle = document.getElementById("mobile-search-toggle");
      const mobileSearchContainer = document.querySelector(".mobile-menu .search-container");
      const mobileSearchInput = document.getElementById("mobile-search-input");

      if (mobileSearchToggle && mobileSearchContainer && mobileSearchInput) {
        mobileSearchToggle.addEventListener("click", () => {
          mobileSearchContainer.style.display =
            mobileSearchContainer.style.display === "none" ? "block" : "none";
          if (mobileSearchContainer.style.display === "block") {
            mobileSearchInput.focus();
          }
        });

        mobileSearchInput.addEventListener("input", () => {
          filterAnimeCards(mobileSearchInput.value);
        });
      }
    }

    // Search toggle buttons
    if (searchToggle && searchContainer && searchInput) {
      searchToggle.addEventListener("click", () => {
        searchContainer.style.display =
          searchContainer.style.display === "none" ? "block" : "none";
        if (searchContainer.style.display === "block") {
          searchInput.focus();
        }
      });

      searchInput.addEventListener("input", () => {
        filterAnimeCards(searchInput.value);
      });
    }

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
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        btn.appendChild(ripple);

        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

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

  // Handle parallax
  function handleParallax(e) {
    const xOffset = e.clientX / window.innerWidth - 0.5;
    const yOffset = e.clientY / window.innerHeight - 0.5;
    const intensity = 20;

    const bgImage = document.querySelector(".bg-image");
    if (bgImage) {
      bgImage.style.transform = `translate(${
        xOffset * -intensity
      }px, ${yOffset * -intensity}px)`;
    }
  }

  // Konami code check
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

  // Madara mode toggle
  function toggleMadaraMode() {
    document.body.classList.toggle("madara-mode");
  }

  // Filter anime cards
  function filterAnimeCards(searchTerm) {
    const searchInput = document.getElementById("search-input");
    const mobileSearchInput = document.getElementById("mobile-search-input");
    if (searchInput) searchInput.value = searchTerm;
    if (mobileSearchInput) mobileSearchInput.value = searchTerm;
    visibleCards = 3;
    renderAnimeCards();
  }

  // Idle detection
  let idleTimer;

  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(activateIdleMode, 30000); // 30 seconds
  }

  function activateIdleMode() {
    const particles = document.getElementById("particleCanvas");
    if (particles) particles.style.opacity = "0.6";

    document.querySelectorAll(".btn, .nav-btn").forEach((elem) => {
      elem.classList.add("animate-glow-pulse");
    });

    document.querySelectorAll(".anime-card").forEach((card) => {
      card.classList.add("animate-float");
    });

    const introTitle = document.querySelector(".intro-title");
    if (introTitle) {
      introTitle.textContent = "Are you still there...?";
      introTitle.classList.add("animate-flicker");
    }

    window.addEventListener("mousemove", exitIdleMode, { once: true });
    window.addEventListener("keydown", exitIdleMode, { once: true });
  }

  function exitIdleMode() {
    const particles = document.getElementById("particleCanvas");
    if (particles) particles.style.opacity = "0.2";

    document.querySelectorAll(".btn, .nav-btn").forEach((elem) => {
      elem.classList.remove("animate-glow-pulse");
    });

    document.querySelectorAll(".anime-card").forEach((card) => {
      card.classList.remove("animate-float");
    });

    const introTitle = document.querySelector(".intro-title");
    if (introTitle) {
      introTitle.innerHTML = '<span class="typewriter">Zen1x_</span>';
      introTitle.classList.add("animate-flicker");
    }

    resetIdleTimer();
  }

  // Change section function
  function changeSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    const navButtons = document.querySelectorAll(".nav-btn[data-section]");

    sections.forEach((section) => {
      section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");

    navButtons.forEach((button) => {
      button.classList.remove("active");
      if (button.dataset.section === sectionId) {
        button.classList.add("active");
      }
    });
  }

  // Mobile menu setup
  function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector(".nav-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileMenuClose = document.querySelector(".mobile-menu-close");

    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.add("active");
      });

      mobileMenuClose.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });

      document.querySelectorAll('.mobile-menu .nav-btn[data-section]').forEach(button => {
        button.addEventListener('click', () => {
          changeSection(button.dataset.section);
          mobileMenu.classList.remove("active");
        });
      });

      const mobileSearchToggle = document.getElementById("mobile-search-toggle");
      const mobileSearchContainer = document.querySelector(".mobile-menu .search-container");
      const mobileSearchInput = document.getElementById("mobile-search-input");

      if (mobileSearchToggle && mobileSearchContainer && mobileSearchInput) {
        mobileSearchToggle.addEventListener("click", () => {
          mobileSearchContainer.style.display =
            mobileSearchContainer.style.display === "none" ? "block" : "none";
          if (mobileSearchContainer.style.display === "block") {
            mobileSearchInput.focus();
          }
        });

        mobileSearchInput.addEventListener("input", () => {
          filterAnimeCards(mobileSearchInput.value);
        });
      }
    }
  }
