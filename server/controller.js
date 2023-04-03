const Sequelize = require('sequelize')
const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
        rejectUnauthorized: false
    }
  }
})


module.exports = {
  getTasks: (req, res) => {
    sequelize.query(`SELECT * FROM tasks
    ORDER BY status,
      CASE priority
        WHEN 'High' THEN 1
        WHEN 'Medium' THEN 2
        WHEN 'Low' THEN 3
        ELSE 4
      END;`)
        .then(dbRes => {
          res.status(200).send(dbRes[0])
        })
  },

  addTask: (req, res) => {
    const {name, priority} = req.body

    let status = false

    sequelize.query(`INSERT INTO tasks (name, priority, status)
      VALUES ('${name}', '${priority}', ${status});
    `)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500))
    
  }
}