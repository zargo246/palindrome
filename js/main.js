document.querySelector('#checkButton').addEventListener('click', checkPalindrome)

function checkPalindrome() {

  const userInput = document.querySelector('#userInput').value

  fetch(`/api?input=${encodeURIComponent(userInput)}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)

      document.querySelector('#result').innerText = data.message
    })
    .catch(error => {
      console.log(error)
    })
}