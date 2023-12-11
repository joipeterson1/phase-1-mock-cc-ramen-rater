/*
See all ramen images in the div with the id of ramen-menu.
When the page loads(dom content loaded), request the data from the server to get (fetch) all the ramen objects. 
Then, display the image for each (forEach) of the ramen using an img tag inside the #ramen-menu div
*/

//request the data from the server to get (fetch) all the ramen objects. 
function loadRamen(){
    fetch ('http://localhost:3000/ramens')
    .then((res) => res.json())
    .then((data)=> {
        //use the map function to create an array of image URLs:
       const imageUrls = data.map(ramen => ramen.imageUrl)
       const ramenMenuDiv = document.getElementById('ramen-menu');
 //create an img tag inside the #ramen-menu div for each image
 imageUrls.forEach(imageUrl => {
   const img = document.createElement('img');
   img.src = imageUrl;
   ramenMenuDiv.appendChild(img);
 })
    })
  .catch(error => {
    console.error('Error:', error);
  });
 
}
document.addEventListener('DOMContentLoaded', loadRamen)
// make sure the page is loaded first, NEED CALLBACK to load images
