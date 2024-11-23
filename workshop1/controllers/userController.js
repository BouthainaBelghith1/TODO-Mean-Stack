import User from '../models/userModel';  // Assurez-vous que le chemin est correct
import bcrypt from 'bcryptjs';  // Pour le hash des mots de passe

// Contrôleur pour créer un utilisateur
export const createUser = async (req, res, next) => {
    try {
        const { name, email, password, address, phone } = req.body;

        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash du mot de passe
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Création de l'utilisateur
        const newUser = new User({
            name,
            email,
            passwordHash,
            address,
            phone
        });

        // Sauvegarder dans la base de données
        await newUser.save();

        // Réponse
        res.status(201).json({
            message: 'User created successfully',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                createdAt: newUser.createdAt
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        next(error);
    }
};

// Contrôleur pour récupérer tous les utilisateurs
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        next(error);
    }
};

// Contrôleur pour récupérer un utilisateur par ID
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        next(error);
    }
};

// Contrôleur pour mettre à jour un utilisateur par ID
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        next(error);
    }
};

// Contrôleur pour supprimer un utilisateur par ID
export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        next(error);
    }
};
