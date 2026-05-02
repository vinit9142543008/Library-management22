import express from 'express';
import { registerUser,loginUser,getAllUsers, resetPassword, blockUser, unblockUser } from '../controllers/auth.controllers.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.post('/reset-password',resetPassword)
router.put('/block/:id', blockUser);
router.put('/unblock/:id', unblockUser);
export default router;