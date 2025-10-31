document.getElementById('year').textContent = new Date().getFullYear();
const form = document.getElementById('signup');
const email = document.getElementById('email');
const message = document.getElementById('message');
const btn = document.getElementById('submitBtn');
const endpoint = "https://script.google.com/macros/s/AKfycbyT9EXvCMXKMbArC52satjUHt05gFz_05oiu5Yl7H996j4ytup0eYDJnukh5U5C7Rg3/exec";

// Inline thank-you with timed fade-out
let hideTimer = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (form.querySelector('.hp-field').value) return;

  const value = (email.value || '').trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
    message.textContent = 'Please enter a valid email.';
    message.className = 'message error';
    email.focus();
    return;
  }

  const data = new FormData(form);
  btn.disabled = true; btn.textContent = 'Submitting…';
  message.textContent = ''; message.className = 'message';

  try {
    await fetch(endpoint, { method: 'POST', mode: 'no-cors', body: data });
    setTimeout(() => {
      message.textContent = 'Thank you! You\'re on the list 🌿';
      message.className = 'message success';
      email.value = '';

      // Auto fade-out after 4s
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        message.className = 'message'; // resets to hidden (opacity 0)
        message.textContent = '';
      }, 4000);
    }, 200);
  } catch (err) {
    message.textContent = 'Something went wrong. Please try again.';
    message.className = 'message error';
  } finally {
    btn.disabled = false; btn.textContent = 'Get updates';
  }
});
