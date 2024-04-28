function uploadResume() {
  const fileInput = document.getElementById('resumeInput');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select a file.');
    return;
  }

  const formData = new FormData();
  formData.append('resume', file);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    document.getElementById('resumeContent').innerText = data;
    document.getElementById('resumeContent').classList.remove('hidden');
  })
  .catch(error => console.error('Error:', error));
}
