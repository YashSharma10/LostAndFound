import express from 'express';
import FoundItem from '../models/FoundItems.js';
import { ensureAuthenticated } from '../middlewares/auth.js'; // Create a middleware to check authentication

const router = express.Router();

// Route to submit a found item report
router.post('/', ensureAuthenticated, async (req, res) => {
  const { location, itemName, category, date, description, images } = req.body;

  try {
    const foundItem = new FoundItem({
      location,
      itemName,
      category,
      date,
      description,
      images,
      user: req.user._id, // Link report to the logged-in user
    });

    await foundItem.save();
    res.status(200).json({ message: 'Found item reported successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error reporting found item' });
  }
});

// Route to get all found items
router.get('/', async (req, res) => {
  try {
    const foundItems = await FoundItem.find().populate('user');
    res.status(200).json(foundItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching found items' });
  }
});

export default router;
