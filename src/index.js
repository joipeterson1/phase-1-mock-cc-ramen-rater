/*
See all ramen images in the div with the id of ramen-menu.
When the page loads(dom content loaded), request the data from the server to get (fetch) all the ramen objects. 
Then, display the image for each (forEach) of the ramen using an img tag inside the #ramen-menu div
*/
//create variable for form
const form = document.getElementById('new-ramen')
let ramens = []
//request the data from the server to get (fetch) all the ramen objects. 
function loadRamen(){
    fetch ('http://localhost:3000/ramens')
    .then((res) => res.json())
    .then((data)=> {
      const ramenMenuDiv = document.getElementById('ramen-menu');
      ramens = data
      data.forEach(ramen => {
        //use the map function to create an array of image URLs:
   const ramenImg = document.createElement('img');
   ramenImg.src = ramen.image;
   ramenImg.setAttribute('data-name', ramen.name);
   ramenImg.setAttribute('data-restaurant', ramen.restaurant);
   ramenImg.setAttribute('data-rating', ramen.rating);
   ramenImg.setAttribute('data-comment', ramen.comment)
   ramenMenuDiv.appendChild(ramenImg);
   //Create an event listener to click on the images 
   ramenImg.addEventListener('click', clickImage)
   form.addEventListener('submit', submitForm)
    })

})

}
/*
Click on an image from the #ramen-menu div and 
see all the info about that ramen displayed inside the #ramen-detail div and 
where it says insert comment here and insert rating here.
*/
  //call back will show all deatils on #ramen-deatils
 function clickImage(event) { 
  // Access the clicked image using event.target
  const targetImage = event.target
  //const ramenId = parseInt(targetImage.id)
    //append the details and create the variables
    const clickedImageContainer = document.querySelector('img.detail-image')
    const nameContainer = document.querySelector('h2.name')
    const restaurantContainer = document.querySelector('h3.restaurant')
    const ratingContainer = document.querySelector('#rating-display')
    const commentContainer = document.querySelector('#comment-display')

    const src = targetImage.src
    const name = targetImage.dataset.name;
    const restaurant = targetImage.dataset.restaurant;
    const rating = targetImage.dataset.rating;
    const comment = targetImage.dataset.comment;

   clickedImageContainer.src = src
    nameContainer.innerText = name;
    restaurantContainer.innerText = restaurant;
    ratingContainer.innerText = `${rating}/10`;
    commentContainer.innerText = comment
} 

/*
Create a new ramen after submitting the new-ramen form. 
The new ramen should be added to the#ramen-menu div. 
The new ramen does not need to persist; 
if you refresh the page, it's okay that the new ramen is no longer on the page.
*/

//create event for submit event
function submitForm(){
    const nameInput = document.getElementById('new-name')
    const restaurantInput = document.getElementById('new-restaurant')
    const imgInput = document.getElementById('new-image')
    const ratingInput = document.getElementById('new-rating')
    const commentInput = document.getElementById('new-comment')

    const src = imgInput.src
    const name = nameInput.value
    const restaurant = restaurantInput.value
    const rating = ratingInput.value
    const comment = commentInput.value

   const newRamenInput = {
  name: name,
  restaurant: restaurant,
  image: src,
  rating: parseInt(rating),
  comment: comment
    }

    //fetch data based on input using POST
    fetch ('http://localhost:3000/ramens',{
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newRamenInput),
    })
    .then(response => response.json())
    .then(data => {
      const newRamen = document.createElement('img')
      newRamen.src =  src
        //add data to the DOM
      const ramenMenuDiv = document.getElementById('ramen-menu')
      ramenMenuDiv.appendChild(newRamen)
        })
}
document.addEventListener('DOMContentLoaded', loadRamen)