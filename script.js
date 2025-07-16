// ✅ Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ✅ Scroll Reveal Animation
window.addEventListener("scroll", revealElements);
function revealElements() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("visible");
    }
  });
}
revealElements();

// ✅ Toast Message (with fade & slide animation)
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ✅ Confetti Effect 🎉 (White & Blue, from left & right)
function launchConfetti() {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 9999;
  canvas.style.pointerEvents = 'none';

  const particles = [];
  const colors = ['#ffffff', '#3b82f6']; // Only white and blue

  for (let i = 0; i < 100; i++) {
    const fromLeft = i % 2 === 0;
    particles.push({
      x: fromLeft ? 0 : canvas.width,
      y: Math.random() * canvas.height * 0.5,
      radius: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocityX: fromLeft ? Math.random() * 6 + 2 : -Math.random() * 6 - 2,
      velocityY: Math.random() * -3 - 2,
      gravity: 0.15,
      alpha: 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.velocityX;
      p.y += p.velocityY;
      p.velocityY += p.gravity;
      p.alpha -= 0.008;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
      }

      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  }

  animate();
}

// ✅ Auth Modal Logic
let isSignup = false;
const authModal = document.getElementById("authModal");
const authTitle = document.getElementById("authTitle");
const authUsername = document.getElementById("authUsername");
const authPassword = document.getElementById("authPassword");

function toggleAuthMode() {
  isSignup = !isSignup;
  authTitle.textContent = isSignup ? "Sign Up" : "Login";
  document.querySelector(".switch-auth").innerHTML =
    isSignup
      ? `Already have an account? <span onclick="toggleAuthMode()">Login</span>`
      : `Don't have an account? <span onclick="toggleAuthMode()">Sign up</span>`;
}

function handleAuth() {
  const user = authUsername.value.trim();
  const pass = authPassword.value.trim();

  if (!user || !pass) return showToast("Please fill in both fields");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (isSignup) {
    if (users.find(u => u.username === user)) return showToast("User already exists");
    users.push({ username: user, password: pass });
    localStorage.setItem("users", JSON.stringify(users));
    showToast("Signup successful! You can now login.");
    toggleAuthMode();
  } else {
    const found = users.find(u => u.username === user && u.password === pass);
    if (found) {
      showToast("Login successful!");
      launchConfetti(); // 🎉
      authModal.style.display = "none";

      // show name in dashboard and overlay
      document.getElementById("userNameDisplay").textContent = user;
      document.getElementById("welcomeName").textContent = user;

      // show welcome overlay
      const overlay = document.getElementById("welcomeOverlay");
      overlay.classList.remove("fade-out");
      overlay.style.display = "flex";

      // hide after 3 seconds with fade
      setTimeout(() => {
        overlay.classList.add("fade-out");
        setTimeout(() => {
          overlay.style.display = "none";
        }, 500);
      }, 3000);

    } else {
      showToast("Invalid credentials!");
    }
  }
}

// ✅ Show Auth Modal on Page Load
window.addEventListener("load", () => {
  authModal.style.display = "flex";
});

// ✅ Typing Animation for Hero
const typedText = document.getElementById("typedText");
const phrases = ["Design That Moves", "Design That Inspires", "Design That Works"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = phrases[phraseIndex];
  typedText.textContent = current.substring(0, charIndex);

  if (!isDeleting) {
    if (charIndex < current.length) {
      charIndex++;
    } else {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
    } else {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 45 : 90);
}
typeEffect();

// ✅ Sticky Glass Navbar on Scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ✅ Mac Dock-like Scale Effect on Hover (with JS)
document.querySelectorAll('.feature-card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.12)';
    card.style.transition = 'transform 0.2s ease-out';
    card.style.zIndex = '2';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
    card.style.transition = 'transform 0.2s ease-in';
    card.style.zIndex = '1';
  });
});
