const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'adminRoot'
})

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    db.query('TaskAppHaGroup', (err, result) => {
      if (err) {
        console.log(`Database can't be created`);
      } else {
        console.log(`Database created successfully`);
      }
    })
  }
})
