let express = require("express");
let path = require("path");
let mysql = require("mysql2");
let app = express();
let port = 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'TUtu22@#',
    database: 'ruraleducation'
});

db.connect(() => {

    console.log('Connected to MySQL database');
});
try {
    db.query("SHOW TABLES", (err, result) => {
        if (err) throw err;
        console.log(result);
    })
}
catch (err) {
    console.log(err);
}

//student register
app.post("/register", (req, res) => {
    let { user, email, age, study, pass, cpass } = req.body;
    const sql = 'INSERT INTO users_db (user, email,age,study,pass,cpass) VALUES (?,?,?,?,?,?)';
    try {

        db.query(sql, [user, email, age, study, pass, cpass], (err, result) => {
            if (err) throw err;
            console.log('User registered');
            console.log();
            res.render("index.ejs", { user, email, age, study, pass, cpass });
        })
    }
    catch (err) {
        console.log(err);
    }

});
//student login
app.post("/login", (req, res) => {
    let { user, pass1 } = req.body;
    const sql = 'SELECT  user FROM users_db WHERE email = ? AND pass=?';
    db.query(sql, [user,pass1], (err, results) => {
        if (err) throw err;
        //console.log(results[0].user);
        if (results.length > 0) {
            user=results[0].user;
            console.log(results.type);
            res.render("index.ejs",{user});
        } 
        else 
        {
            
             res.render("errorstudent.ejs",{ error: 'Invalid username or password' });
           
        }
    });
})
app.get("/", (req, res) => {
    console.log("response");
});

app.listen(port, () => {
    console.log("app listening to client");
})

//techer register
app.post("/registerteacher", (req, res) => {
    let { user, email, age, study, pass, cpass } = req.body;
    const sql = 'INSERT INTO users_db (user, email,age,study,pass,cpass) VALUES (?,?,?,?,?,?)';
    try {

        db.query(sql, [user, email, age, study, pass, cpass], (err, result) => {
            if (err) throw err;
            console.log('User registered');
            console.log();
            res.render("indexteacher.ejs", { user, email, age, study, pass, cpass });
        })
    }
    catch (err) {
        console.log(err);
    }

});

//teacher login
app.post("/loginteacher", (req, res) => {
    let { user, pass1 } = req.body;
    const sql = 'SELECT  user FROM users_db WHERE email = ? AND pass=?';
    db.query(sql, [user,pass1], (err, results) => {
        if (err) throw err;
        //console.log(results[0].user);
        if (results.length > 0) {
            user=results[0].user;
            console.log(results.type);
            res.render("indexteacher.ejs",{user});
        } 
        else 
        {
            
             res.render("errorteacher.ejs",{ error: 'Invalid username or password' });
           
        }
    });
})


