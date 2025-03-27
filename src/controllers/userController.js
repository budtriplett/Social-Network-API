const { Thought, User } = require('../models');

module.exports = {
  async getUser(req, res) {
    try {
      const users = await User.find().populate('friends').populate('thoughts');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No users with that Id' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      
      res.status(200).json(user);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    console.log('Request: ', req.params);
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No users with that Id' });
      }
      
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and thoughts are deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidator: true, new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      const friend = await User.findById(req.params.friendId);

      if (!user || !friend) {
        return res.status(404).json({ message: 'That User or Friend was not found' });
      }

      if (!user.friends.includes(req.params.friendId)) {
        user.friends.push(req.params.friendId);
        await user.save();
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      user.friends = user.friends.filter(friendId => friendId.toString() !== req.params.friendId);
      await user.save();

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};