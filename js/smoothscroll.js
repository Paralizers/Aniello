// SmoothScroll.js
document.addEventListener('DOMContentLoaded', function() {
  // Seleziona tutti i link con href che inizia con #
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  // Aggiungi evento click a ogni link
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Previeni il comportamento predefinito
      
      // Ottieni l'elemento target
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calcola la posizione target considerando l'header fisso
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Animazione smooth
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Aggiorna l'URL (opzionale, senza ricaricare la pagina)
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }
      }
    });
  });
  
  // Correzione per i refresh di pagina con hash nell'URL
  if (window.location.hash) {
    setTimeout(() => {
      const hash = window.location.hash;
      window.location.hash = '';
      window.location.hash = hash;
    }, 100);
  }
});