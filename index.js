const axios = require("axios");

const inquirer = require("inquirer");

const fs = require("fs");

const createHTML = require("create-html");

const puppeteer = require("puppeteer");

require("dotenv").config();
let questions = [
  {
    type: "input",
    name: "github",
    message: "Enter your github"
  },
  {
    type: "input",
    name: "color",
    message: "Enter Favorite Color"
  }
];
inquirer.prompt(questions).then(answers => {
  let url = `https://api.github.com/users/${answers.github}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
  axios
    .get(url)
    .then(function(response) {
      console.log(response);
      let profileImg = response.data.avatar_url;
      let name = response.data.name;
      let userLocation = response.data.location;
      let userGithubProfile = response.data.url;
      let blog = response.data.blog;
      let publicRepos = response.data.public_repos;
      let followers = response.data.followers;
      let githubStars;
      let usersFollowing = response.data.following;

      var html = createHTML({
        title: "example",

        css: "style.css",

        head: '<meta name="description" content="example">',
        body: `<div class="container wrapper">
        <div class="container">
        <div class="row">
            <div class="col-sm name">
                <h1>Hello, my name is, ${name}</h1>
                </div>
        </div> 
        </div>
        <div class="container cards">
                <div class="row">
                    <div class="col-sm card repos">
                        <h1>Repositories</h1>
                        </div>
                </div>
                <div class="row">
                    <div class="col-sm  card stars">
                        <h1>Stars</h1>
                        </div>
                </div>
                <div class="row">
                    <div class="col-sm  card followers">
                        <h1>Followers</h1>
                        </div>
                </div>
                <div class="row">
                    <div class="col-sm card following">
                        <h1>Following</h1>
                        </div>
                </div>
                </div>
            
            <div class="container">
                    <div id="circle" style="background: ${answers.color};">
                    
                    <img id="photo" src="${profileImg}">
                    </div>
            </div>
    </div>`



      });

      fs.writeFile("index2.html", html, function(err) {
        if (err) console.log(err);
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}); 



// JS to PDF function below

// (asyncfunction() {
//     try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();

//         await page.setContent();
//         await page.emulateMedia('screen');
//         await page.pdf({
//             path: 'mypdf.pdf',
//             format: "A4",
//             printBackground: true  
// });

// console.log('done');
// await browser.close();
// process.exit();

// } catch (e) {
//     console.log("our error", e);
// }
// })();
