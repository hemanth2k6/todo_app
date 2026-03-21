import bcrypt from 'bcryptjs'
import {
  createUser,
  findUserByEmail,
  findUserById,
} from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Name, email and password are required.' })
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters.' })
    }

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    })

    return res.status(201).json({
      token: generateToken(user.id),
      user,
    })
  } catch (error) {
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await findUserByEmail(email.toLowerCase().trim())
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    return res.status(200).json({
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getMe(req, res, next) {
  try {
    const user = await findUserById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    return res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}
