document.addEventListener('DOMContentLoaded', async () => {
  // Get Elderly ID (from localStorage after login)
  const elderlyId = localStorage.getItem('userId');

  // Fetch Elderly User Data
  async function fetchElderlyData() {
      try {
          if (!elderlyId) {
              alert('User not authenticated. Redirecting to login...');
              window.location.href = '../pages/loginPage.html';
              return;
          }

          const response = await fetch(`http://localhost:3000/api/users/${elderlyId}`);
          if (!response.ok) throw new Error('Failed to fetch elderly data');

          const elderlyUser = await response.json();

          // Populate displayed name and location in profile header
          document.getElementById('displayName').textContent = elderlyUser.name || 'Your Name';
          document.getElementById('displayLocation').textContent = elderlyUser.location || 'Your Location';
          
          // Pre-fill profile form with existing data
          document.getElementById('name').value = elderlyUser.name || '';
          document.getElementById('age').value = elderlyUser.age || '';
          document.getElementById('location').value = elderlyUser.location || '';
          document.getElementById('specificNeeds').value = elderlyUser.needs || '';
          document.getElementById('healthConditions').value = elderlyUser.healthConditions || '';
          document.getElementById('contact').value = elderlyUser.contact || '';
          
          // Pre-fill additional fields if they exist in the user data
          if (elderlyUser.gender) document.getElementById('gender').value = elderlyUser.gender;
          if (elderlyUser.bloodGroup) document.getElementById('bloodGroup').value = elderlyUser.bloodGroup;
          if (elderlyUser.budget) document.getElementById('budget').value = elderlyUser.budget;
          if (elderlyUser.email) document.getElementById('email').value = elderlyUser.email;
          
          // Show profile image if available
          if (elderlyUser.profileImage) {
              document.getElementById('profileImage').src = elderlyUser.profileImage;
          }

          // Show Task Status and Rejection Message if Available
          if (elderlyUser.tasks && elderlyUser.tasks.length > 0) {
              const latestTask = elderlyUser.tasks[elderlyUser.tasks.length - 1];
              
              // Create a task status element if it doesn't exist
              let taskStatusElem = document.getElementById('taskStatus');
              if (!taskStatusElem) {
                  taskStatusElem = document.createElement('p');
                  taskStatusElem.id = 'taskStatus';
                  taskStatusElem.className = 'task-status';
                  document.querySelector('.profile-header').appendChild(taskStatusElem);
              }
              
              taskStatusElem.textContent = `Task Status: ${latestTask.status}`;
              
              // Display rejection message if applicable
              if (latestTask.status === 'rejected' && latestTask.rejectionMessage) {
                  const rejectionElem = document.getElementById('rejectionMessage');
                  rejectionElem.textContent = `Request Rejected: ${latestTask.rejectionMessage}`;
                  rejectionElem.style.display = 'block';
              }
          }

      } catch (error) {
          console.error('Error fetching elderly data:', error);
          // More user-friendly error handling
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.textContent = 'Could not load your profile data. Please try refreshing the page.';
          document.querySelector('.profile-section').prepend(errorMsg);
      }
  }

  // Function to update profile
  async function updateProfile(e) {
      e.preventDefault();
      
      const profileData = {
          name: document.getElementById('name').value,
          age: document.getElementById('age').value,
          gender: document.getElementById('gender').value,
          location: document.getElementById('location').value,
          contact: document.getElementById('contact').value,
          email: document.getElementById('email').value,
          bloodGroup: document.getElementById('bloodGroup').value,
          budget: document.getElementById('budget').value,
          needs: document.getElementById('specificNeeds').value,
          healthConditions: document.getElementById('healthConditions').value
      };
      
      try {
          const response = await fetch(`http://localhost:3000/api/users/${elderlyId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(profileData)
          });
          
          if (!response.ok) throw new Error('Failed to update profile');
          
          // Update displayed name and location
          document.getElementById('displayName').textContent = profileData.name || 'Your Name';
          document.getElementById('displayLocation').textContent = profileData.location || 'Your Location';
          
          // Show success notification
          const notification = document.createElement('div');
          notification.className = 'success-notification';
          notification.textContent = 'Profile updated successfully!';
          notification.style.position = 'fixed';
          notification.style.top = '20px';
          notification.style.right = '20px';
          notification.style.padding = '10px 20px';
          notification.style.backgroundColor = '#4CAF50';
          notification.style.color = 'white';
          notification.style.borderRadius = '4px';
          notification.style.zIndex = '1000';
          
          document.body.appendChild(notification);
          
          // Remove notification after 3 seconds
          setTimeout(() => {
              notification.remove();
          }, 3000);
          
      } catch (error) {
          console.error('Error updating profile:', error);
          alert('Error updating profile. Please try again.');
      }
  }

  // Submit Assistance Request
  async function submitRequest(e) {
      e.preventDefault();

      const requestData = {
          helpType: document.getElementById('helpType').value,
          urgency: document.getElementById('urgency').value,
          preferredTime: document.getElementById('preferredTime').value,
          location: document.getElementById('requestLocation').value,
          budget: parseFloat(document.getElementById('requestBudget').value),
          additionalInfo: document.getElementById('additionalInfo').value,
          createdBy: elderlyId
      };

      try {
          const response = await fetch('http://localhost:3000/api/tasks', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestData)
          });

          if (!response.ok) throw new Error('Failed to submit request');

          // Show success notification
          const notification = document.createElement('div');
          notification.className = 'success-notification';
          notification.textContent = 'Assistance request submitted successfully!';
          notification.style.position = 'fixed';
          notification.style.top = '20px';
          notification.style.right = '20px';
          notification.style.padding = '10px 20px';
          notification.style.backgroundColor = '#4CAF50';
          notification.style.color = 'white';
          notification.style.borderRadius = '4px';
          notification.style.zIndex = '1000';
          
          document.body.appendChild(notification);
          
          // Remove notification after 3 seconds
          setTimeout(() => {
              notification.remove();
          }, 3000);
          
          e.target.reset();
      } catch (error) {
          console.error('Error submitting request:', error);
          alert('Error submitting request. Please try again.');
      }
  }

  // Function to handle profile image upload
  async function uploadProfileImage(file) {
      // Create FormData object for file upload
      const formData = new FormData();
      formData.append('profileImage', file);
      
      try {
          const response = await fetch(`http://localhost:3000/api/users/${elderlyId}/profile-image`, {
              method: 'POST',
              body: formData
          });
          
          if (!response.ok) throw new Error('Failed to upload image');
          
          // Success message
          console.log('Profile image uploaded successfully');
          
      } catch (error) {
          console.error('Error uploading profile image:', error);
          alert('Error uploading profile image. Please try again.');
      }
  }

  // Update profile image when selected
  window.updateProfileImage = function(input) {
      if (input.files && input.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
              document.getElementById('profileImage').src = e.target.result;
              
              // Upload the image to the server
              uploadProfileImage(input.files[0]);
          };
          reader.readAsDataURL(input.files[0]);
      }
  };

  // Logout Functionality
  window.logout = function () {
      localStorage.removeItem('userId'); // Clear user session
      alert('Logged out successfully.');
      window.location.href = '../pages/loginPage.html';
  };

  // Initialize Dashboard
  await fetchElderlyData();

  // Attach event listeners
  document.getElementById('request-form').addEventListener('submit', submitRequest);
  document.getElementById('profile-form').addEventListener('submit', updateProfile);
});