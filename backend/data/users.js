import bcrypt from 'bcryptjs'

const users = [
  {
    firstName: 'Admin User',
    lastName: 'Diouf',
    propertyAddress: '1101 32ND ave sw apt',
    phoneNumber: '9016575465',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    firstName: 'John Doe',
    lastName: 'Fall',
    propertyAddress: '1801 32ND ave sw apt 12',
    phoneNumber: '4016575465',
    email: 'joahn@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    firstName: 'adama',
    lastName: 'Diouf',
    propertyAddress: '1101 32ND ave sw apt 15',
    phoneNumber: '7016575465',
    email: 'adama@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]

export default users
