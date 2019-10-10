// TABLES
export const createTableYogaSession =
  `CREATE TABLE IF NOT EXISTS YogaSession (
   YogaSessionID INTEGER PRIMARY KEY NOT NULL,
   Style VARCHAR(100),
   Location VARCHAR(200),
   Date INTEGER
   );`

export const createTableCustomer =
  `CREATE TABLE IF NOT EXISTS Customer (
   CustomerID INTEGER PRIMARY KEY NOT NULL,
   FirstName VARCHAR(30) NOT NULL,
   LastName VARCHAR(30) NOT NULL,
   StreetAddress VARCHAR(50) NOT NULL,
   PostalCode VARCHAR(10) NOT NULL,
   Email VARCHAR(255) NOT NULL
   );`

export const createTableYogaSessionCustomer =
  `CREATE TABLE IF NOT EXISTS YogaSessionCustomer (
   CustomerID INTEGER NOT NULL,
   YogaSessionID INTEGER NOT NULL,
   PRIMARY KEY(CustomerID, YogaSessionID)
   FOREIGN KEY(CustomerID) REFERENCES Customer(CustomerID)
   FOREIGN KEY(YogaSessionID) REFERENCES YogaSession(YogaSessionID)
   );`

// INSERTS
export const insertCustomer =
  `INSERT INTO Customer (FirstName, LastName, StreetAddress, PostalCode, Email)
   VALUES (?, ?, ?, ?, ?);`

export const insertYogaSession =
  `INSERT INTO YogaSession (Style, Location, Date)
   VALUES (?, ?, ?);`

export const insertYogaSessionCustomer =
  `INSERT INTO YogaSessionCustomer (CustomerID, YogaSessionID)
   VALUES (?, ?);`


// SELECTS
export const selectAllCustomers =
  `SELECT * FROM Customer;`

export const selectCustomerById =
  `SELECT * FROM Customer
   WHERE CustomerID = ?;`

export const selectAllYogaSessions =
  `SELECT * FROM YogaSession
   ORDER BY Date DESC`

export const selectAllYogaSessionCustomers =
  `SELECT * FROM YogaSessionCustomer`

export const selectYogaSessionCustomersBySessionId =
  `SELECT *
   FROM YogaSessionCustomer
   LEFT JOIN Customer ON YogaSessionCustomer.CustomerID = Customer.CustomerID
   WHERE YogaSessionID = ?;`

// DELETES

export const deleteYogaSessionCustomer =
  `DELETE FROM YogaSessionCustomer
   WHERE CustomerID = ? AND YogaSessionID = ?;
`

export const deleteYogaSessionById =
  `DELETE FROM YogaSession
   WHERE YogaSessionID = ?;
`

export const deleteYogaSessionCustomerByYogaSessionId =
  `DELETE FROM YogaSessionCustomer
   WHERE YogaSessionID = ?;
`

export const deleteYogaSessionCustomerbyCustomerId =
  `DELETE FROM YogaSessionCustomer
   WHERE CustomerID = ?;
`

export const deleteCustomerById =
  `DELETE FROM Customer
   WHERE CustomerID = ?;
`

// UPDATES

export const editCustomer =
  `UPDATE Customer
   SET FirstName = ?,
   LastName = ?,
   Email = ?,
   StreetAddress = ?,
   PostalCode = ?
   WHERE CustomerID = ?
  `