let input = document.querySelector('.get-repos input');
let getBtn = document.querySelector('.getBtn');
let data = document.querySelector('.data');

getBtn.onclick = function () {
    getRepos();
}

function getRepos() {
    if(input.value == ''){

        data.innerHTML = `<span>Please Enter Github Username</span>`

    }else {
        fetch(`https://api.github.com/users/${input.value}/repos`)
            .then(response => response.json())
            .then((repos) => {
                data.innerHTML = '';
                repos.forEach(repo => {
                    
                    // create main div and text
                    let mainDiv = document.createElement('div');
                    let mainText = document.createTextNode(repo.name);
                    mainDiv.appendChild(mainText);

                    // create url and text
                    let mainUrl = document.createElement('a');
                    let urlText = document.createTextNode('visit');
                    mainUrl.href = `https://github.com/${input.value}/${repo.name}`;
                    mainUrl.setAttribute('target', '_blank');
                    mainUrl.appendChild(urlText);
                    mainDiv.appendChild(mainUrl);

                    // create star span and text
                    let starSpan = document.createElement('span');
                    let spanText = document.createTextNode(`Star ${repo.stargazers_count}`);
                    starSpan.appendChild(spanText);
                    mainDiv.appendChild(starSpan);

                    mainDiv.className = 'box';
                    data.appendChild(mainDiv);
                });
            });
    }
}