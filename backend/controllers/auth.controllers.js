import fs from 'fs'
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

const _filename=fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const filePath=path.join(_dirname,'../data/users.json');

const getUsers = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath));
};


const saveUsers=(users)=>{
    fs.writeFileSync(filePath,JSON.stringify(users,null,2))
}

export const  registerUser=async(req,res)=>{
    console.log('Incoming Data:', req.body);
    
    const {firstname,lastname,email,password,repeatPassword,mobileNumber}=req.body;


    if(!firstname || !lastname || !email || !mobileNumber || !password || !repeatPassword){
        return res.status(400).json ({message:'All fields required'});

    }
    if(password!==repeatPassword){
        return res.status(400).json({message:"Passwords do not match "});
    }

    const users=getUsers();
    if(users.find(u=> u.email===email)){
        return res.status(400).json({ message: 'Email already exists' });
    }

const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    firstname,
    lastname,
    email,
    mobileNumber,
    password: hashedPassword,
    role:'student',
    isBlocked:false
  };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'Registered successfully' });
};

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const users = getUsers();
//   const user = users.find(u => u.email === email);

//   if (!user) {
//     return res.status(400).json({ message: 'User not found' });
//   }

//   if(user.isBlocked){
//     return res.json(403).json({
//       message:'You are Blocked By admin'
//     })
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     return res.status(400).json({ message: 'Invalid password' });
//   }

//   const token = jwt.sign(
//     { id: user.id, email: user.email,role:user.role },
//     'SECRET_KEY',
//     { expiresIn: '1h' }
//   );
//   res.json({
//     message:'Login Success',
//     token,
//     user:{
//       id:user.id,
//       firstname:user.firstname,
//       lastname:user.lastname,
//       email:user.email,
//       mobileNumber:user.mobileNumber,
//       role:user.role
//     }
//   })

//   // res.json({ message: 'Login success', token });
// };

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found'
    });
  }

  if (user.isBlocked) {
    return res.status(403).json({
      success: false,
      message: 'You are Blocked By admin'
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Invalid password'
    });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    'SECRET_KEY',
    { expiresIn: '1h' }
  );

  return res.json({
    success: true,
    token,
    user: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role
    }
  });
};

 export const getAllUsers=(req,res)=>{
  try{
    const users=getUsers();
    const safeUsers=users.map(u=>({
      id:u.id,
      firstname:u.firstname,
      lastname:u.lastname,
      password:u.password,
      mobileNumber:u.mobileNumber,
      email:u.email,
      role:u.role,
      isBlocked:Boolean(u.isBlocked)
    }));
    res.json(safeUsers)
  } catch(err) {
  console.log(err);
  res.status(500).json({message:'Error fethcing users'})
  }
 }

 export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and new password required'
      });
    }

    const users = getUsers();

    const index = users.findIndex(u => u.email === email);

    if (index === -1) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users[index].password = hashedPassword;

    saveUsers(users);

    res.json({
      message: "Password reset successful"
    });

  } catch (err) {
    console.log("RESET ERROR:", err);
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const blockUser = (req, res) => {
  try {
    const { id } = req.params;

    const users = getUsers();
    const user = users.find(u => u.id == id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isBlocked = true;

    saveUsers(users);

    res.json({ message: 'User blocked successfully' });

  } catch (err) {
    console.log("BLOCK ERROR:", err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const unblockUser = (req, res) => {
  try {
    const { id } = req.params;

    const users = getUsers();
    const user = users.find(u => u.id == id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isBlocked = false;

    saveUsers(users);

    res.json({ message: 'User unblocked successfully' });

  } catch (err) {
    console.log("UNBLOCK ERROR:", err);
    res.status(500).json({ message: 'Server error' });
  }
};