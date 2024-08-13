import express from 'express';
import LostItem from '../models/LostItem.js';
import { ensureAuthenticated } from '../middlewares/auth.js'; // Create a middleware to check authentication

const router = express.Router();

// Route to submit a lost item report
router.post('/', ensureAuthenticated, async (req, res) => {
  const { location, itemName, category, date, description, images } = req.body;

  try {
    const lostItem = new LostItem({
      location,
      itemName,
      category,
      date,
      description,
      images,
      user: req.user._id, // Link report to the logged-in user
    });

    await lostItem.save();
    res.status(200).json({ message: 'Lost item reported successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error reporting lost item' });
  }
});

// Route to get all lost items
router.get('/', async (req, res) => {
  try {
    const lostItems = await LostItem.find().populate('user');
    res.status(200).json(lostItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lost items' });
  }
});



export default router;
