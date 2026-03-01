const Pickup = require('../models/pickup');
const Bin = require('../models/bin');

// @desc    Get assigned pickups for logged-in worker
// @route   GET /api/worker/tasks
// @access  Private/Worker
const getAssignedPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ assignedTo: req.user._id, status: { $ne: 'completed' } })
      .populate('bin', 'location status binId')
      .populate('user', 'name email');
    res.json(pickups);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching assigned tasks' });
  }
};

// @desc    Complete a pickup with a photo
// @route   PUT /api/worker/pickups/:id/complete
// @access  Private/Worker
const completePickupPhoto = async (req, res) => {
  try {
    const { workerPhoto } = req.body;
    const pickup = await Pickup.findById(req.params.id);

    if (!pickup) {
      return res.status(404).json({ message: 'Pickup not found' });
    }

    if (pickup.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to complete this pickup' });
    }

    pickup.status = 'completed';
    pickup.completedDate = Date.now();
    pickup.workerPhoto = workerPhoto || null;

    const updatedPickup = await pickup.save();

    // Also update the associated bin's status to empty
    const bin = await Bin.findById(pickup.bin);
    if (bin) {
      bin.status = 'empty';
      bin.lastEmptied = Date.now();
      await bin.save();
    }

    res.json(updatedPickup);
  } catch (error) {
    res.status(500).json({ message: 'Server Error completing pickup' });
  }
};

// @desc    Get dashboard stats for logged-in worker
// @route   GET /api/worker/stats
// @access  Private/Worker
const getWorkerDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalCompleted = await Pickup.countDocuments({ assignedTo: req.user._id, status: 'completed' });
    const pendingTasks = await Pickup.countDocuments({ assignedTo: req.user._id, status: { $ne: 'completed' } });
    const dailyCompleted = await Pickup.countDocuments({ 
        assignedTo: req.user._id, 
        status: 'completed', 
        completedDate: { $gte: today } 
    });

    res.json({ totalCompleted, pendingTasks, dailyCompleted });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};

module.exports = { getAssignedPickups, completePickupPhoto, getWorkerDashboardStats };
