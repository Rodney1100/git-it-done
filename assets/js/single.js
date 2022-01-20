var issuesContainerEl = document.querySelector("#issues-container");
var limitEl = document.getElementById("limit-warning");
var nameOfRepo = document.getElementById("repo-name");

getRepoName=()=>{
    var queryString =  document.location.search;
    var repoName =queryString.split('=')[1];
    if(repoName){
        getRepoIssues(repoName)
        nameOfRepo.textContent = repoName
    }else{
document.location.replace('./index.html')
}

}


var getRepoIssues = function (repo) {
    console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data);
                
                
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
        document.location.replace('./index.html')
    }
  });
};

var displayWarning = function (repo) {
  limitEl.textContent = "To see more than 30 issues, visit ";
  var linkEl = document.createElement("a");
  linkEl.textContent = "See More Issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  limitEl.appendChild(linkEl);
};
var displayIssues = (issues) => {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }
  for (var i = 0; i < issues.length; i++) {
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;
    issueEl.appendChild(titleEl);
    var typeEl = document.createElement("span");
    // check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    // append to container
    issueEl.appendChild(typeEl);
    issuesContainerEl.appendChild(issueEl);
  }
};

// getRepoIssues(repoName);
getRepoName()