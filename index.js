const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const port = 3000
const saltRounds = 10

let dbUsers = [
    {
        username: "polo bon",
        password: "password",
        name: "Bon Zi Qin",
        email: "bon@utem.edu.my"
    },
    {
        username: "hoho",
        password: "123456",
        name: "HoHo",
        email: "hoho@utem.edu.my"
    },
    {
        username: "ako",
        password: "012345",
        name: "Ako",
        email: "ako@utem.edu.my"
    }
  ]

  //encrypt existing user password in dbUsers
  for (let i = 0; i < dbUsers.length; i++) {
    dbUsers[i].password = bcrypt.hashSync(dbUsers[i].password, saltRounds)
  }
  
  // login function
  function login(username, password) {
    console.log("someone try to login with", username, password)
  
    let matched = dbUsers.find(element => element.username == username)

    if (matched) {
       const match = bcrypt.compareSync(password, matched.password)

         if(match) {
            return matched
         }
         else {
            return "Password not matched"
         }
        }
    else {
        return "Username not found"
    }
}

  // register function
  function register(newusername, newpassword, newname, newemail) {
    let matched = dbUsers.find(element => element.username == newusername) 
  
    if (matched) {
       return "username already exist in earth"
    } 

    else {
        const hash = bcrypt.hashSync(newpassword, saltRounds)

        dbUsers.push({
            username: newusername,
            password: hash,
            name: newname,
            email: newemail
        })

        return "new account has been created"
    }
  }

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/login', (req, res) => {
    let data = req.body
    res.send(login(data.username, data.password)
    )
})

app.post('/register', (req, res) => {
    let data = req.body
    res.send(
      register(
        data.username,
        data.password,
        data.name,
        data.email
      )
    )
})



