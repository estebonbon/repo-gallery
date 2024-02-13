const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
}; 








const displayRepos = function(repos) { // Repos is the array that is being passed down, from the gitRepos function.
    for(let repo of repos) { // The for of loop is a great way to iterate through each repo of "the repos array" and create a list element for each.
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.full_name}</h3>`;
        repoList.append(repoItem);
    }
};