const overview = document.querySelector(".overview"); // Div inside of the intro
const username = "estebonbon"; // Personal github username
const repoList = document.querySelector(".repo-list");

const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const user = await userInfo.json();

    displayUserInfo(user);

    //console.log(user);

};

gitUserInfo(); 

const displayUserInfo = function(user) { //The user paramater has become a type of object literal
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
    gitRepos();
}; 

const gitRepos = async function () { // The purpose of this function is to gather information about the repos. Don't forget to place the "async or else the function will not operate"
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await fetchRepos.json();

    //console.log(repos);
    displayRepo(repos); // Repos is the array containing all the repos we fetched. And by putting it as an argument we can pass it on to the displayRepo function.
};


const displayRepo = function(repos) { // Repos is the array that is being passed down, from the gitRepos function.
    for(let repo of repos) { // The for of loop is a great way to iterate through each repo of "the repos array" and create a list element for each.
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.full_name}</h3>`;
        repoList.append(repoItem);
    }
};

