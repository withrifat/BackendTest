require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 5000
// middleware
app.use(cors())

const GitHub = {
"login": "withrifat",
"id": 106229451,
"node_id": "U_kgDOBlTuyw",
"avatar_url": "https://avatars.githubusercontent.com/u/106229451?v=4",
"gravatar_id": "",
"url": "https://api.github.com/users/withrifat",
"html_url": "https://github.com/withrifat",
"followers_url": "https://api.github.com/users/withrifat/followers",
"following_url": "https://api.github.com/users/withrifat/following{/other_user}",
"gists_url": "https://api.github.com/users/withrifat/gists{/gist_id}",
"starred_url": "https://api.github.com/users/withrifat/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/withrifat/subscriptions",
"organizations_url": "https://api.github.com/users/withrifat/orgs",
"repos_url": "https://api.github.com/users/withrifat/repos",
"events_url": "https://api.github.com/users/withrifat/events{/privacy}",
"received_events_url": "https://api.github.com/users/withrifat/received_events",
"type": "User",
"user_view_type": "public",
"site_admin": false,
"name": "MD Rifat hossain",
"company": "The Digital Workshop",
"blog": "https://www.facebook.com/withrifathossain/",
"location": "Bangaldesh",
"email": null,
"hireable": null,
"bio": "Computer Scince Student In Bogura Politacnic Institute",
"twitter_username": null,
"public_repos": 29,
"public_gists": 0,
"followers": 20,
"following": 21,
"created_at": "2022-05-25T07:06:26Z",
"updated_at": "2026-02-07T12:51:04Z"
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/github', (req, res)=>{
  res.json(GitHub)
})

app.get('/facebook', (req, res) => {
  res.send('withrifat')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
