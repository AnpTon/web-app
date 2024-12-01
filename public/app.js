document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('LandAdd');
    const usersTable = document.getElementById('LandTable').getElementsByTagName('tbody')[0];
  
    function fetchUsers() {
      fetch('/Landmarks')
        .then(response => response.json())
        .then(Landmarks => {
          usersTable.innerHTML = '';
            Landmarks.forEach(Landmarks => {
            const row = usersTable.insertRow();
            row.innerHTML = `
              <td>${Landmarks.id}</td>
              <td>${Landmarks.Landmark}</td>
              <td>${Landmarks.Details}</td>
            `;
          });
        })
        .catch(error => console.error('Error fetching Landmarks:', error));
    }
      userForm.addEventListener('submit', function(event) {
      event.preventDefault(); 
  
      const Landmark = document.getElementById('Landmark').value;
      const Details = document.getElementById('Details').value;
  
      fetch('/Landmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Landmark, Details })
      })
        .then(response => response.json())
        .then(Landmarks => {
          userForm.reset();
          fetchUsers();
        })
        .catch(error => console.error('Error adding user:', error));
    });
      fetchUsers();
  });