// // frontend/js/dashboard.js

// document.addEventListener('DOMContentLoaded', async () => {
//   // Fetch Elderly User Data
//   async function fetchElderlyData() {
//       try {
//           const response = await fetch('http://localhost:3000/api/user/elderly-id'); // Replace with actual elderly user ID
//           if (!response.ok) throw new Error('Failed to fetch elderly data');

//           const elderlyUser = await response.json();

//           document.getElementById('elderName').textContent = elderlyUser.name;
//           document.getElementById('elderAge').textContent = elderlyUser.age;
//           document.getElementById('elderLocation').textContent = elderlyUser.location;
//           document.getElementById('elderNeeds').textContent = elderlyUser.needs;
//           document.getElementById('elderHealth').textContent = elderlyUser.health;
//           document.getElementById('elderContact').textContent = elderlyUser.contact;
//       } catch (error) {
//           console.error('Error fetching elderly data:', error);
//           alert('Error loading profile.');
//       }
//   }

//   // Fetch Volunteers from Backend
//   async function fetchVolunteers() {
//       try {
//           const response = await fetch('http://localhost:3000/api/volunteers');
//           if (!response.ok) throw new Error('Failed to fetch volunteers');

//           const volunteers = await response.json();

//           const volunteerList = document.getElementById('volunteerList');
//           if (volunteers.length === 0) {
//               volunteerList.textContent = 'No available volunteers yet.';
//           } else {
//               volunteerList.innerHTML = volunteers.map(v => `
//                   <div class="volunteer-card">
//                       <p><strong>Name:</strong> ${v.name}</p>
//                       <p><strong>Skills:</strong> ${v.skills}</p>
//                       <p><strong>Location:</strong> ${v.location}</p>
//                       <p><strong>Availability:</strong> ${v.availability}</p>
//                   </div>
//               `).join('');
//           }
//       } catch (error) {
//           console.error('Error fetching volunteers:', error);
//           alert('Error loading volunteers.');
//       }
//   }

//   // Submit Assistance Request
//   async function submitRequest(e) {
//       e.preventDefault();

//       const requestData = {
//           helpType: document.getElementById('helpType').value,
//           urgency: document.getElementById('urgency').value,
//           preferredTime: document.getElementById('preferredTime').value,
//           location: document.getElementById('location').value,
//           createdBy: 'elderly-id' // Replace with actual logged-in elderly user ID
//       };

//       try {
//           const response = await fetch('http://localhost:3000/api/tasks', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify(requestData)
//           });

//           if (!response.ok) throw new Error('Failed to submit request');

//           alert('Assistance request submitted successfully!');
//           e.target.reset();
//       } catch (error) {
//           console.error('Error submitting request:', error);
//           alert('Error submitting request.');
//       }
//   }

//   // Logout Functionality
//   window.logout = function () {
//       alert('Logged out successfully.');
//       window.location.href = '../pages/index.html';
//   };

//   // Initialize Dashboard
//   await fetchElderlyData();
//   await fetchVolunteers();

//   // Attach event listener for request submission
//   document.getElementById('request-form').addEventListener('submit', submitRequest);
// });



// // frontend/js/dashboard.js

// document.addEventListener('DOMContentLoaded', async () => {

//   // Get Elderly ID (Example: Retrieve from localStorage after login)
//   const elderlyId = localStorage.getItem('elderlyId');

//   // Fetch Elderly User Data
//   async function fetchElderlyData() {
//       try {
//           if (!elderlyId) {
//               alert('User not authenticated. Redirecting to login...');
//               window.location.href = '../pages/loginPage.html';
//               return;
//           }

//           const response = await fetch(`http://localhost:3000/api/user/${elderlyId}`);
//           if (!response.ok) throw new Error('Failed to fetch elderly data');

//           const elderlyUser = await response.json();

//           // Populate Profile Info
//           document.getElementById('elderName').textContent = elderlyUser.name;
//           document.getElementById('elderAge').textContent = elderlyUser.age || '--';
//           document.getElementById('elderLocation').textContent = elderlyUser.location || '--';
//           document.getElementById('elderNeeds').textContent = elderlyUser.needs || '--';
//           document.getElementById('elderHealth').textContent = elderlyUser.healthConditions || '--';
//           document.getElementById('elderContact').textContent = elderlyUser.contact || '--';

//           // Show Rejection Message if Available
//           if (elderlyUser.rejectionMessage) {
//               document.getElementById('rejectionMessage').textContent = `Request Rejected: ${elderlyUser.rejectionMessage}`;
//           }

//       } catch (error) {
//           console.error('Error fetching elderly data:', error);
//           alert('Error loading profile.');
//       }
//   }

//   // Fetch Volunteers from Backend
//   async function fetchVolunteers() {
//       try {
//           const response = await fetch('http://localhost:3000/api/volunteers');
//           if (!response.ok) throw new Error('Failed to fetch volunteers');

//           const volunteers = await response.json();

//           const volunteerList = document.getElementById('volunteerList');
//           if (volunteers.length === 0) {
//               volunteerList.textContent = 'No available volunteers yet.';
//           } else {
//               volunteerList.innerHTML = volunteers.map(v => `
//                   <div class="volunteer-card">
//                       <p><strong>Name:</strong> ${v.name}</p>
//                       <p><strong>Skills:</strong> ${v.skills}</p>
//                       <p><strong>Location:</strong> ${v.location}</p>
//                       <p><strong>Availability:</strong> ${v.availability}</p>
//                       <p><strong>Payment Rate:</strong> $${v.paymentRate || 'N/A'}</p>
//                   </div>
//               `).join('');
//           }
//       } catch (error) {
//           console.error('Error fetching volunteers:', error);
//           alert('Error loading volunteers.');
//       }
//   }

//   // Submit Assistance Request
//   async function submitRequest(e) {
//       e.preventDefault();

//       const requestData = {
//           helpType: document.getElementById('helpType').value,
//           urgency: document.getElementById('urgency').value,
//           preferredTime: document.getElementById('preferredTime').value,
//           location: document.getElementById('location').value,
//           budget: parseFloat(document.getElementById('budget').value), // Include budget field
//           createdBy: elderlyId
//       };

//       try {
//           const response = await fetch('http://localhost:3000/api/tasks', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify(requestData)
//           });

//           if (!response.ok) throw new Error('Failed to submit request');

//           alert('Assistance request submitted successfully!');
//           e.target.reset();
//       } catch (error) {
//           console.error('Error submitting request:', error);
//           alert('Error submitting request.');
//       }
//   }

//   // Logout Functionality
//   window.logout = function () {
//       localStorage.removeItem('elderlyId'); // Clear user session
//       alert('Logged out successfully.');
//       window.location.href = '../pages/loginPage.html';
//   };

//   // Initialize Dashboard
//   await fetchElderlyData();
//   await fetchVolunteers();

//   // Attach event listener for request submission
//   document.getElementById('request-form').addEventListener('submit', submitRequest);
// });





// document.addEventListener('DOMContentLoaded', async () => {

//     // Get Elderly ID (from localStorage after login)
//     const elderlyId = localStorage.getItem('userId');
  
//     // Fetch Elderly User Data
//     async function fetchElderlyData() {
//         try {
//             if (!elderlyId) {
//                 alert('User not authenticated. Redirecting to login...');
//                 window.location.href = '../pages/loginPage.html';
//                 return;
//             }
  
//             const response = await fetch(`http://localhost:3000/api/users/${elderlyId}`);
//             if (!response.ok) throw new Error('Failed to fetch elderly data');
  
//             const elderlyUser = await response.json();
  
//             // Populate Profile Info
//             document.getElementById('elderName').textContent = elderlyUser.name;
//             document.getElementById('elderAge').textContent = elderlyUser.age || '--';
//             document.getElementById('elderLocation').textContent = elderlyUser.location || '--';
//             document.getElementById('elderNeeds').textContent = elderlyUser.needs || '--';
//             document.getElementById('elderHealth').textContent = elderlyUser.healthConditions || '--';
//             document.getElementById('elderContact').textContent = elderlyUser.contact || '--';
  
//             // Show Rejection Message if Available
//             if (elderlyUser.rejectionMessage) {
//                 document.getElementById('rejectionMessage').textContent = `Request Rejected: ${elderlyUser.rejectionMessage}`;
//             }
  
//         } catch (error) {
//             console.error('Error fetching elderly data:', error);
//             alert('Error loading profile.');
//         }
//     }
  
//     // Fetch Volunteers from Backend
//     async function fetchVolunteers() {
//         try {
//             const response = await fetch('http://localhost:3000/api/volunteers');
//             if (!response.ok) throw new Error('Failed to fetch volunteers');
  
//             const volunteers = await response.json();
  
//             const volunteerList = document.getElementById('volunteerList');
//             if (volunteers.length === 0) {
//                 volunteerList.textContent = 'No available volunteers yet.';
//             } else {
//                 volunteerList.innerHTML = volunteers.map(v => `
//                     <div class="volunteer-card">
//                         <p><strong>Name:</strong> ${v.name}</p>
//                         <p><strong>Skills:</strong> ${v.skills}</p>
//                         <p><strong>Location:</strong> ${v.location}</p>
//                         <p><strong>Availability:</strong> ${v.availability}</p>
//                         <p><strong>Payment Rate:</strong> $${v.paymentRate || 'N/A'}</p>
//                     </div>
//                 `).join('');
//             }
//         } catch (error) {
//             console.error('Error fetching volunteers:', error);
//             alert('Error loading volunteers.');
//         }
//     }
  
//     // Submit Assistance Request
//     async function submitRequest(e) {
//         e.preventDefault();
  
//         const requestData = {
//             helpType: document.getElementById('helpType').value,
//             urgency: document.getElementById('urgency').value,
//             preferredTime: document.getElementById('preferredTime').value,
//             location: document.getElementById('location').value,
//             budget: parseFloat(document.getElementById('budget').value),
//             createdBy: elderlyId
//         };
  
//         try {
//             const response = await fetch('http://localhost:3000/api/tasks', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(requestData)
//             });
  
//             if (!response.ok) throw new Error('Failed to submit request');
  
//             alert('Assistance request submitted successfully!');
//             e.target.reset();
//         } catch (error) {
//             console.error('Error submitting request:', error);
//             alert('Error submitting request.');
//         }
//     }
  
//     // Logout Functionality
//     window.logout = function () {
//         localStorage.removeItem('userId'); // Clear user session
//         alert('Logged out successfully.');
//         window.location.href = '../pages/loginPage.html';
//     };
  
//     // Initialize Dashboard
//     await fetchElderlyData();
//     await fetchVolunteers();
  
//     // Attach event listener for request submission
//     document.getElementById('request-form').addEventListener('submit', submitRequest);
  
//   });




document.addEventListener('DOMContentLoaded', async () => {

    // Get Elderly ID (from localStorage after login)
    const elderlyId = localStorage.getItem('userId');
    
    const taskStatusElement = document.getElementById('taskStatus');
if (taskStatusElement) {
    taskStatusElement.textContent = `Task Status: ${latestTask.status}`;
}
  
    // Fetch Elderly User Data
    async function fetchElderlyData() {
        try {
            if (!elderlyId) {
                alert('User not authenticated. Redirecting to login...');
                window.location.href = '../pages/loginPage.html';
                return;
            }
    
            const response = await fetch(`https://elder-aid.onrender.com/api/users/${elderlyId}`);
            if (!response.ok) throw new Error('Failed to fetch elderly data');
    
            const elderlyUser = await response.json();
    
            // Populate Profile Info
            if (document.getElementById('elderName')) {
                document.getElementById('elderName').textContent = elderlyUser.name || 'Dear Elder';
            }
            if (document.getElementById('elderAge')) {
                document.getElementById('elderAge').textContent = elderlyUser.age || '--';
            }
            if (document.getElementById('elderLocation')) {
                document.getElementById('elderLocation').textContent = elderlyUser.location || '--';
            }
            if (document.getElementById('elderNeeds')) {
                document.getElementById('elderNeeds').textContent = elderlyUser.needs || '--';
            }
            if (document.getElementById('elderHealth')) {
                document.getElementById('elderHealth').textContent = elderlyUser.healthConditions || '--';
            }
            if (document.getElementById('elderContact')) {
                document.getElementById('elderContact').textContent = elderlyUser.contact || '--';
            }
    
            // Show Task Status and Rejection Message if Available
            if (elderlyUser.tasks && elderlyUser.tasks.length > 0) {
                const latestTask = elderlyUser.tasks[elderlyUser.tasks.length - 1];
                
                const taskStatusElement = document.getElementById('taskStatus');
                if (taskStatusElement) {
                    taskStatusElement.textContent = `Task Status: ${latestTask.status}`;
                }
                
                if (latestTask.status === 'rejected' && latestTask.rejectionMessage) {
                    const rejectionElement = document.getElementById('rejectionMessage');
                    if (rejectionElement) {
                        rejectionElement.textContent = `Request Rejected: ${latestTask.rejectionMessage}`;
                    }
                }
            }
    
        } catch (error) {
            console.error('Error fetching elderly data:', error);
            //alert('Error loading profile.');
        }
    }
  
    // Fetch Volunteers from Backend
    async function fetchVolunteers() {
        try {
            const response = await fetch('https://elder-aid.onrender.com/api/volunteers');
            if (!response.ok) throw new Error('Failed to fetch volunteers');
  
            const volunteers = await response.json();
  
            const volunteerList = document.getElementById('volunteerList');
            if (volunteers.length === 0) {
                volunteerList.textContent = 'No available volunteers yet.';
            } else {
                volunteerList.innerHTML = volunteers.map(v => `
                    <div class="volunteer-card">
                        <p><strong>Name:</strong> ${v.name}</p>
                        <p><strong>Skills:</strong> ${v.skills}</p>
                        <p><strong>Location:</strong> ${v.location}</p>
                        <p><strong>Availability:</strong> ${v.availability}</p>
                        <p><strong>Payment Rate:</strong> $${v.paymentRate || 'N/A'}</p>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Error fetching volunteers:', error);
            //alert('Error loading volunteers.');
        }
    }
  
    // Submit Assistance Request
    // async function submitRequest(e) {
    //     e.preventDefault();
  
    //     const requestData = {
    //         helpType: document.getElementById('helpType').value,
    //         urgency: document.getElementById('urgency').value,
    //         preferredTime: document.getElementById('preferredTime').value,
    //         location: document.getElementById('location').value,
    //         budget: parseFloat(document.getElementById('budget').value),
    //         createdBy: elderlyId
    //     };
  
    //     try {
    //         const response = await fetch('http://localhost:3000/api/tasks', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(requestData)
    //         });
  
    //         if (!response.ok) throw new Error('Failed to submit request');
  
    //         alert('Assistance request submitted successfully!');
    //         e.target.reset();
    //     } catch (error) {
    //         console.error('Error submitting request:', error);
    //         alert('Error submitting request.');
    //     }
    // }

    //changes for pdf

    async function submitRequest(e) {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('helpType', document.getElementById('helpType').value);
        formData.append('urgency', document.getElementById('urgency').value);
        formData.append('preferredTime', document.getElementById('preferredTime').value);
        formData.append('location', document.getElementById('location').value);
        formData.append('budget', document.getElementById('budget').value);
        formData.append('createdBy', elderlyId);
        formData.append('medicalHistory', document.getElementById('medicalHistory').medicalHistoryFile);
    
        const medicalHistoryFile = document.getElementById('medicalHistory').files[0];
        if (medicalHistoryFile) {
            formData.append('medicalHistory', medicalHistoryFile);
        }
    
        try {
            const response = await fetch('https://elder-aid.onrender.com/api/tasks', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) throw new Error('Failed to submit request');
    
            alert('Assistance request submitted successfully!');
            e.target.reset();
        } catch (error) {
            console.error('Error submitting request:', error);
            alert('Error submitting request.');
        }
    }
    
  
    // Logout Functionality
    window.logout = function () {
        localStorage.removeItem('userId'); // Clear user session
        alert('Logged out successfully.');
        window.location.href = 'loginPage.html';
    };
  
    // Initialize Dashboard
    await fetchElderlyData();
    await fetchVolunteers();
  
    // Attach event listener for request submission
    document.getElementById('request-form').addEventListener('submit', submitRequest);
  
  });