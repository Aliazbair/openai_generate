// create onSubmit function
function onSubmit(e) {
  e.preventDefault();

  // get the message text h2
  document.querySelector('.msg').textContent = '';

  // get image src
  document.querySelector('#image').src = '';

  // get prompt value and size
  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  // check the prompt
  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  // genereting image
  generateImageRequest(prompt, size);
}

// create generateImageRequest
async function generateImageRequest(prompt, size) {
  try {
     showSpinner();
    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, size }),
    });

    if (!response.ok) {
         removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();

    // console.log(data);
    const imageUrl=data.data
    document.querySelector('#image').src = imageUrl;
     removeSpinner();
  } catch (error) {
     document.querySelector('.msg').textContent = error;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}
document.querySelector('#img-form').addEventListener('submit', onSubmit);
