import Review from '../models/review.js';
import mongoose from 'mongoose';


// Créer une nouvelle revue
export const createReview = async (req, res, next) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
};

export const getReviewsByItemId = async (req, res, next) => {
    try {
        console.log("ItemId in request params:", req.params.itemId);

        // Utilisez directement itemId comme une chaîne de caractères
        const itemId = req.params.itemId;

        // Requête pour récupérer les revues par itemId (en tant que chaîne de caractères)
        const reviews = await Review.find({ itemId: itemId });

        console.log("Fetched reviews:", reviews);  // Afficher les revues récupérées
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this item' });
        }
        res.json(reviews);
    } catch (error) {
        console.error("Error in fetching reviews:", error);  // Afficher les erreurs
        next(error);
    }
};



// Récupérer une revue par son ID
export const getReviewById = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        next(error);
    }
};

// Mettre à jour une revue par son ID
export const updateReview = async (req, res, next) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(updatedReview);
    } catch (error) {
        next(error);
    }
};

// Supprimer une revue par son ID
export const deleteReview = async (req, res, next) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review deleted' });
    } catch (error) {
        next(error);
    }
};


