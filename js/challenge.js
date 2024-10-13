document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const counter = document.getElementById('counter');
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');
    const heartButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const likesList = document.querySelector('.likes');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('list');
  
    let count = 0;
    let isPaused = false;
    let likes = {};
    let timer = setInterval(incrementCounter, 1000);
  
    // Timer functions
    function incrementCounter() {
      if (!isPaused) {
        count++;
        updateCounter();
      }
    }
  
    function updateCounter() {
      counter.innerText = count;
    }
  
    // Event Listeners
    plusButton.addEventListener('click', () => {
      count++;
      updateCounter();
    });
  
    minusButton.addEventListener('click', () => {
      count--;
      updateCounter();
    });
  
    heartButton.addEventListener('click', () => {
      if (!likes[count]) {
        likes[count] = 0;
      }
      likes[count]++;
      renderLikes();
    });
  
    function renderLikes() {
      likesList.innerHTML = '';
      for (const number in likes) {
        const likeItem = document.createElement('li');
        likeItem.innerText = `Number ${number} has been liked ${likes[number]} time(s)`;
        likesList.appendChild(likeItem);
      }
    }
  
    pauseButton.addEventListener('click', () => {
      isPaused = !isPaused;
      if (isPaused) {
        clearInterval(timer);
        pauseButton.innerText = 'resume';
        disableButtons(true);
      } else {
        timer = setInterval(incrementCounter, 1000);
        pauseButton.innerText = 'pause';
        disableButtons(false);
      }
    });
  
    function disableButtons(state) {
      minusButton.disabled = state;
      plusButton.disabled = state;
      heartButton.disabled = state;
    }
  
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const commentText = commentInput.value;
      if (commentText) {
        const comment = document.createElement('p');
        comment.innerText = commentText;
        commentsList.appendChild(comment);
        commentInput.value = '';
      }
    });
  });
  