if (response.ok) {
  localStorage.setItem('userId', data.userId);
  localStorage.setItem('userType', data.userType);

  alert('Login successful!');
  if (data.userType === 'elderly') {
      window.location.href = 'dashboard.html';
  } else if (data.userType === 'volunteer') {
      window.location.href = 'volunteer.html';
  }
}
