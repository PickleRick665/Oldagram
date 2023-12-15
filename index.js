import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, update, child} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-cart-e4268-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const oldagram_post_list_in_DB = ref(database,"oldagram-posts")

const testButton = document.getElementById("test")
const post_container_el = document.getElementById("post-container")

onValue(oldagram_post_list_in_DB, function(snapshot){
    if(snapshot.exists() === false){
        alert("Database is Empty")
    }

    else{
        let oldagram_post_list = Object.entries(snapshot.val())
        let posts_Array = []
        let posts_id_Array = []
        
        for(let i=0; i<oldagram_post_list.length; i++){
            let oldagram_post_list_array = oldagram_post_list[i]
            let oldagram_post_list_array_ID = oldagram_post_list_array[0]
            let oldagram_post_list_array_object = oldagram_post_list_array[1]

            // create_post(oldagram_post_list_array_ID, oldagram_post_list_array_object)
            posts_Array.push(oldagram_post_list_array_object)
            // console.log(oldagram_post_list_array_object)
            posts_id_Array.push(oldagram_post_list_array_ID)
        }
        
        console.log(posts_Array,posts_id_Array)
        create_post(posts_Array,posts_id_Array)


    }
})

//deletes the content inside the post container
function clear_post(){
    post_container_el.innerHTML = " "
}



//creates the posts using the values from the database
function create_post(posts,posts_id){

    for(let i=0; i<posts.length; i++){

        //<section>
        //creates a section that contains the below div
        const account_name_container_el = document.createElement("section")
        account_name_container_el.setAttribute("class","account-name-container")
        account_name_container_el.setAttribute("id","account-name-container")
        post_container_el.appendChild(account_name_container_el)

            //<div>
            //create a div that contains profile picture, name and location
            const postHeader = document.createElement("div")
            postHeader.setAttribute("class","post-header")
            account_name_container_el.appendChild(postHeader)

                //creates an img element 
                const newImage = document.createElement("img")
                newImage.setAttribute("src",`${posts[i].imageLink}`)
                newImage.setAttribute("class","profile-picture")
                postHeader.appendChild(newImage)

                //<div>
                //creates a div for name and location to be turned into flex
                const name_and_location_container = document.createElement("div")
                name_and_location_container.setAttribute("class","name-and-location-mini-container")
                postHeader.appendChild(name_and_location_container)

                    //creates a div for the name of the oldagram poster
                    const posterName = document.createElement("div")
                    posterName.setAttribute("class","acc-name-inside-post")
                    posterName.innerHTML += posts[i].name;
                    name_and_location_container.appendChild(posterName)

                    //creates a div for the location of the oldagram poster
                    const posterLocation = document.createElement("div")
                    posterLocation.setAttribute("class","acc-location-inside-post")
                    posterLocation.innerHTML += posts[i].location
                    name_and_location_container.appendChild(posterLocation)

                //</div>
            //</div>
        //</section>


        //<section>
        //creates a section that contains the below div
        const post_image_container_el = document.createElement("section")
        post_image_container_el.setAttribute("class","post-image-container")
        post_image_container_el.setAttribute("id","post-image-container")
        post_container_el.appendChild(post_image_container_el)

            //div
            const post_image = document.createElement("img")
            post_image.setAttribute("class","post-image")
            post_image.setAttribute("src",`${posts[i].post}`)
            post_image_container_el.appendChild(post_image)
            
            //</div>

        //</section>

        //<section>
        //creates a section that contains the below div
        const likes_and_post_caption_container_el = document.createElement("section")
        likes_and_post_caption_container_el.setAttribute("class","likes-and-post-caption-container")
        likes_and_post_caption_container_el.setAttribute("id","likes-and-post-caption-container")
        post_container_el.appendChild(likes_and_post_caption_container_el)


            //<div>
            //creates a div for the post buttons (heart, comment, and dm)
            const post_buttons_container = document.createElement("div")
            post_buttons_container.setAttribute("class","post-buttons-container")
            likes_and_post_caption_container_el.appendChild(post_buttons_container)

                //creates a new img element for the heart icon
                const heart_image_button = document.createElement("img")
                heart_image_button.setAttribute("class","post-icons")
                heart_image_button.setAttribute("id","heart-button")
                heart_image_button.setAttribute("src","images/icon-heart.png")
                heart_image_button.setAttribute("onmouseover","this.src='images/icon-heart-hover.png'")
                heart_image_button.setAttribute("onmouseout","this.src='images/icon-heart.png'")
                post_buttons_container.appendChild(heart_image_button)

                //creates a new img element for the comment icon
                const comment_image_button = document.createElement("img")
                comment_image_button.setAttribute("class","post-icons")
                comment_image_button.setAttribute("src","images/icon-comment.png")
                comment_image_button.setAttribute("onmouseover","this.src='images/icon-comment-hover.png'")
                comment_image_button.setAttribute("onmouseout","this.src='images/icon-comment.png'")
                post_buttons_container.appendChild(comment_image_button)

                //creates a new img element for the dm icon
                const dm_image_button = document.createElement("img")
                dm_image_button.setAttribute("class","post-icons")
                dm_image_button.setAttribute("src","images/icon-dm.png")
                dm_image_button.setAttribute("onmouseover","this.src='images/icon-dm-hover.png'")
                dm_image_button.setAttribute("onmouseout","this.src='images/icon-dm.png'")
                post_buttons_container.appendChild(dm_image_button)

            //</div>

            //<p>
            //create p element for likes
            const post_like_count = document.createElement("p")
            post_like_count.setAttribute("class","post-like-count")
            post_like_count.innerHTML = `<span class="boldened-text">${posts[i].likes} likes</span>`
            likes_and_post_caption_container_el.appendChild(post_like_count)
            //</p>

            //<p>
            //create p element for post description
            const post_description = document.createElement("p")
            post_description.setAttribute("class","post-description")
            post_description.innerHTML = `<span class="boldened-text">${posts[i].username}</span> ${posts[i].comment}`
            likes_and_post_caption_container_el.appendChild(post_description)
            //</p>

            const post_divider = document.createElement("hr")
            likes_and_post_caption_container_el.appendChild(post_divider)

        //</section>

        //create an eventlistener for the heart button for this specific post
        heart_image_button.addEventListener("click", function(){

                clear_post()

                addLikesInPost(posts_id[i], posts[i].likes)
        })
    }
}

function addLikesInPost(posts_id, post_likes) {
    const db = getDatabase()

    post_likes += 1;

    const updates = {};
    updates['/oldagram-posts/' + posts_id + `/likes`] = post_likes;

    return update(ref(db), updates);
}