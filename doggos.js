const url = 'https://dog.ceo/api/breeds/image/random';
const breedListUrl = 'https://dog.ceo/api/breeds/list/all';
const breedList = document.querySelector('#breed');
const dogImage = document.querySelector('.dogImage');
const dogEmoji = document.querySelector('.dogEmoji');
const imageArea = document.querySelector('.imageArea');

// populate dog breed to select items
function getBreed() {
  fetch(breedListUrl)
    .then((res) => res.json())
    .then((data) => {
      const breeds = Object.keys(data.message);
      breeds.forEach((breed) => {
        const option = document.createElement('option');
        option.value = breed;
        option.innerText = breed;
        breedList.appendChild(option);
        // console.log(breedList.appendChild(option));
      });
      //   console.log(breeds);
    })
    .catch((err) => console.log(err));
}

function getDogImage() {
  setTimeout(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dogEmoji.style.display = 'none';
        dogImage.src = data.message;
        dogImage.alt = 'Cute Doggo';
        imageArea.style.display = 'block';
      })
      .catch((err) => console.log(err));
  }, 3000);
}

getDogImage();
getBreed();

breedList.addEventListener('change', (e) => {
  if (breedList.value === '') {
    return;
  } else {
    imageArea.style.display = 'none';
    dogEmoji.style.display = 'block';
    setTimeout(() => {
      fetch(`https://dog.ceo/api/breed/${e.target.value}/images`)
        .then((res) => res.json())
        .then((data) => {
          dogEmoji.style.display = 'none';
          imageArea.style.display = 'block';
          const randImageIndex = Math.floor(
            Math.random() * data.message.length
          );
          dogImage.src = data.message[randImageIndex];
        })
        .catch((err) => console.log(err));
    }, 3000);
  }
});

// const doggos = document.querySelector('.doggos');
// const img = document.querySelector('img');

// function getDoggo() {
//   const promise = fetch(url);
//   promise
//     .then((res) => res.json())
//     .then((data) => {
//       const img = document.createElement('img');
//       img.src = data.message;
//       img.alt = 'dogImage';
//       doggos.appendChild(img);
//       //   img.src = data.message;
//       //   img.alt = 'Cute Doggo';
//     })
//     .catch((err) => console.log(err));
// }

// document.querySelector('.addDoggo').addEventListener('click', getDoggo);
