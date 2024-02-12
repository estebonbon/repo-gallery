const overview = document.querySelector(".overview"); // Div inside of the intro
const username = "estebonbon"; // Personal github username

const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const user = await userInfo.json();

    displayUserInfo(user);

    //console.log(user);

};

gitUserInfo(); 

const displayUserInfo = function(user) { // the user paramater has become a type of object literal
    const div = document.createElement("div"); // The purpose of this variable is to add to it HTML properties of an actual div, div itself is not an HTML property. But it will contain properties of a div inside of it.
    div.classList.add("user-info"); // user-info is a pre-existing css-styles class.

    div.innerHTML = // Below is everything that the div element contains
    `<figure> <img alt="user avatar" src=${user.avatar_url} /> </figure> 
    <div>
        <p><strong>Name:</strong> ${user.name}</p> <!-- user is followed by a period to display the information from the key-value name that was called. -->
        <p><strong>Bio:</strong> ${user.bio}</p>
        <p><strong>Location:</strong> ${user.location}</p>
        <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
    </div>`

    overview.append(div);
}; 