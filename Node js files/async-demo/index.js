console.log('Before');
// getUser(1, (user) =>{
//     console.log('User:', user);
//     getRepo(user.githubName, (list) => {
//         console.log('Repo(s)', list);
//         getCommits(list[0], (commits) =>{
//             console.log(commits);
//         });
//     });

// });
console.log('After');


getUser(1)
    .then(user => getRepo(user.githubName))
    .then(list => getCommits(list[0]))
    .then(commits => console.log(commits));



function getUser(id){

    return new Promise((resolve,reject) =>{

        setTimeout(() =>{
            console.log('Reading User from Database...');
            resolve({id:id, githubName:'Any'});
        },4000);

    });

};

function getRepo(name){

    return new Promise((resolve,reject) =>{

        setTimeout(() => {
            console.log('Fetching Github Repo(s)...');
            resolve(['repo1','repo2','repo3']);
        },2000);

    });
    
}

function getCommits(repo){

    return new Promise((resolve, reject) =>{

        setTimeout(() =>{
            console.log('Calling Github API...');
            resolve(['commits']);
        },2000);    

    });

    
}