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

const OMB = document.getElementById('MB');
const modal = document.getElementById('modal');
const CanB = document.getElementById('CB');
const DelB = document.getElementById('DB');
const DIND = document.getElementById('LMI');

OMB.addEventListener('click', () => {
  modal.style.display = 'flex';
});

CanB.addEventListener('click', () => {
  closeModal();
});
DelB.addEventListener('click', async () => {
  const index = DIND.value.trim();
  if (!index) {
    alert('Please enter a valid index.');
    return;
  }
  try {
    const response = await fetch(`/Landmarks/${index}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert(`Item with index ${index} deleted successfully.`);
    } else {
      const errorText = await response.text();
      alert(`Error: ${errorText}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while deleting the item.');
  }
  closeModal();
});
function closeModal() {
  modal.style.display = 'none';
  DIND.value = '';
}