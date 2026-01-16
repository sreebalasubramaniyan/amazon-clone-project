document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');

  if (!hamburger || !mobileMenu || !overlay) {
    console.error('Header elements not found');
    return;
  }

  // Toggle mobile menu on hamburger click
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  // Close menu when overlay is clicked
  overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Close menu when a menu item is clicked
  const menuItems = document.querySelectorAll('.mobile-menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.hamburger') && !e.target.closest('.mobile-menu')) {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
    }
  });
});