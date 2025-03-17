document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Collect form data
  const userType = document.getElementById('userType').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const additionalData = {};
  if (userType === 'elderly') {
      additionalData.age = document.getElementById('age').value;
      additionalData.needs = document.getElementById('needs').value;
  } else if (userType === 'volunteer') {
      additionalData.skills = document.getElementById('skills').value;
      additionalData.availability = document.getElementById('availability').value;
  }

  // Debugging: Log the form data
  console.log('Form Data Sent:', { userType, name, email, password, ...additionalData });

  try {
      const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userType, name, email, password, ...additionalData }),
      });

      const data = await response.json();

      if (response.ok) {
          alert('Registration successful!');
          window.location.href = 'loginPage.html';
      } else {
          alert(data.error || 'Registration failed. Please try again.');
      }
  } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
  }
});