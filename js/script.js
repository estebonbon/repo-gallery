const overview = document.querySelector(".overview"); // Div inside of the intro
const username = "estebonbon"; // Personal github username
const repoList = document.querySelector(".repo-list"); // This is the unordered list
const repoGallery = document.querySelector(".repos"); // The section with a class of “repos” where all your repo information appears. 
const repoDataDisplay = document.querySelector(".repo-data"); // This is where the individual repo data will appear.
const backButton = document.querySelector(".view-repos"); // This will trigger repo's to re-appear.
const filterInput = document.querySelector(".filter-repos"); // This is the input for the search bar.


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
    displayRepos(repos); // Repos is the array containing all the repos we fetched. And by putting it as an argument we can pass it on to the displayRepo function.
};


const displayRepos = function(repos) { // Repos is the array that is being passed down, from the gitRepos function.
    
    filterInput.classList.remove("hide");
    for(let repo of repos) { // The for of loop is a great way to iterate through each repo of "the repos array" and create a list element for each.
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo"); // This statement is essential for defing the repo's with a class list of ".repo" in the filterInput eventListener.
        repoItem.innerHTML = `<h3>${repo.name}</h3>`; // with repo.full_name it was presenting my username and the repo name, instead of only the repo name vyit
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function(event) { // perform a specific action only when the clicked element is an "h3" heading. For event listeners the bracket pair must go at the end "} ->)<- ;".
    if(event.target.matches("h3")) {
        const repoName = event.target.innerText; // targets the innerText where the event happens.
        console.log(repoName);
        getRepoInfo(repoName);
    }
    
});

const getRepoInfo = async function (repoName) {
    const fetchRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`); //Make a fetch request to grab information about the specific repository. repoName represents the specefic repository. ERROR 404 fixed by putting repoName inside a template literal. ${}.
    const repoInfo = await fetchRepo.json();

    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url); // It is not necessary to rewrite (`https://api.github.com/repos/${username}/${repoName}/languages_url`) everything is already stored in the "repoInfo" so fetch from there. Treat them like key value properties, also no backticks are needed.
    const languageData = await fetchLanguages.json(); // languageData is now an object

    const languages = []; // the array where the languages will be pushed to.

    for(const language in languageData) { // I needed to change it from a "for of loop" to a "for in loop". 
        languages.push(language);
    }

    console.log(languages);
    displayProperties(repoInfo,languages); // Two arugments were passed, so there properties can be used latter on.
}; 

const displayProperties = async function(repoInfo, languages) {
    repoDataDisplay.innerHTML = ""; // ERROR message popped up, becuase I didn't put ".innerHTML"
    const div = document.createElement("div");
    div.innerHTML =
    `<h3>Name: ${repoInfo.name}</h3>
     <p>Description: ${repoInfo.description}</p>
     <p>Default Branch: ${repoInfo.default_branch}</P>
     <p>Languages: ${languages.join(", ")}</P> <!-- This joins the elements in the array -->
     <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noopener">View Repo on GitHub!</a>
    `
    repoDataDisplay.append(div); // This adds all the NEW HTML Information to the bottom of the page!
    repoDataDisplay.classList.remove("hide"); 
    repoGallery.classList.add("hide"); // Saves the hassle from having to scroll all the way to the bottom of the page to read about the repo that was selected.
    backButton.classList.remove("hide"); // This presents the user with the back button.
};

backButton.addEventListener("click", function() {
    repoGallery.classList.remove("hide");
    backButton.classList.add("hide");
    repoDataDisplay.classList.add("hide"); // Hides the previous repo information
    clearInput();
});

filterInput.addEventListener("input", function(event) { // The first argument is the event type we want to listen for, which is `'input'` in this case. Inside the event listener function, `event.target.value` gives us the current value of the input element
    const textInput = event.target.value; // capture the value of the search text.
    const repos = document.querySelectorAll(".repo") // select ALL elements on the page with a class of “repo”.
    const textLowerCase = textInput.toLowerCase(); // Create lowercase value of the search text.

    for(const repo of repos) {
        const repoLowerCase = repo.innerText.toLowerCase(); // Assign lowercase values for the innerText of the repo.

        if(!repoLowerCase.includes(textLowerCase)){ // ^Note 1)
            repo.classList.add("hide");
        } else { // included an `else` statement to remove the "hide" class if the text matches, so that previously hidden elements can be shown again
            repo.classList.remove("hide");
        }
    };
    console.log(textInput);
});

const clearInput = function () {
    filterInput.value = ""; // To clear the text in the search bar, It is not about clearing the innerText. It is about clearing the value attached to filterInput!
}


/* Arrow function syntax is a more concise way to write functions in JavaScript. 
It provides a shorter and simpler syntax compared to traditional function expressions.  "=>" 

^Note 1) When filtering the search results, you want to check if the lowercase `repoLowerCase` string includes the lowercase `textLowerCase` string. 
In other words, you want to see if the search text is found within the repository text, */
