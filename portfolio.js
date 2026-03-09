document.addEventListener('DOMContentLoaded', () => {
  // Loading animation
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 300);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href').slice(1);
      const el=document.getElementById(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
    });
  });

  // Scroll Reveal Animations with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  document.querySelectorAll('.section, .card').forEach(el => {
    observer.observe(el);
  });

  // Typing Animation for Hero
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle && heroTitle.textContent) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let charIndex = 0;
    const typingSpeed = 50;
    
    function typeChar() {
      if (charIndex < originalText.length) {
        heroTitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, typingSpeed);
      }
    }
    
    setTimeout(typeChar, 500);
  }

  // Enhanced card stagger animation
  const projectCards = document.querySelectorAll('#projects .card');
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
  });

  // Collapsible details sections
  document.querySelectorAll('[data-collapsible]').forEach(section=>{
    const header = section.querySelector('.details-header');
    const body = section.querySelector('.details-body');
    const label = section.querySelector('.toggle');
    if(header && body){
      // Store original text (without arrow)
      const originalText = label.textContent.replace(/[▼▲]/g, '').trim();
      
      header.addEventListener('click', ()=>{
        const isOpen = body.classList.toggle('open');
        label.textContent = isOpen ? `${originalText} ▲` : `${originalText} ▼`;
        // optional: scroll into view when opening on mobile
        if(isOpen && window.innerWidth<840){ section.scrollIntoView({behavior:'smooth', block:'start'}); }
      });
    }
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });

  // Cursor Trail Effect
  const colors = ['#67e8f9', '#a78bfa']; // cyan and purple
  let trailIndex = 0;
  
  document.addEventListener('mousemove', (e) => {
    // Skip if on mobile
    if (window.innerWidth <= 840) return;
    
    // Create trail particle more frequently
    if (trailIndex % 2 === 0) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      trail.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      document.body.appendChild(trail);
      
      // Trigger animation
      requestAnimationFrame(() => {
        trail.classList.add('active');
      });
      
      // Remove after animation
      setTimeout(() => {
        trail.remove();
      }, 600);
    }
    
    trailIndex++;
  });

  // Custom Glowing Cursor
  if (window.innerWidth > 840) {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorRing = document.createElement('div');
    cursorRing.className = 'custom-cursor-ring';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorRing);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Smooth cursor follow animation
    function animateCursor() {
      // Cursor follows instantly
      cursorX = mouseX;
      cursorY = mouseY;
      
      // Ring follows with delay (smooth trailing effect)
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Enhance hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .card, [data-collapsible]');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursor.style.background = '#a78bfa';
        cursorRing.style.width = '50px';
        cursorRing.style.height = '50px';
        cursorRing.style.opacity = '1';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursor.style.background = '#67e8f9';
        cursorRing.style.width = '30px';
        cursorRing.style.height = '30px';
        cursorRing.style.opacity = '0.8';
      });
    });
  }
});
