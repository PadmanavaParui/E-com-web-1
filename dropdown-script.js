// Profile dropdown delay hide logic
// Place this script at the end of your HTML or as a module

document.addEventListener('DOMContentLoaded', function() {
  const profile = document.querySelector('.header_profile');
  const dropdown = document.querySelector('.profile_dropdown');
  let hideTimeout;
  if (profile && dropdown) {
    profile.addEventListener('mouseenter', () => {
      clearTimeout(hideTimeout);
      dropdown.style.display = 'block';
    });
    profile.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        dropdown.style.display = '';
      }, 300); // 300ms delay
    });
    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(hideTimeout);
      dropdown.style.display = 'block';
    });
    dropdown.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        dropdown.style.display = '';
      }, 300);
    });
  }
});
