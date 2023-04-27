const db = require('../config/connection');
const { User, Thought } = require('../models');

db.once('open', async () => {
  // Delete any existing data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create four users
  const users = [];
  for (let i = 0; i < 4; i++) {
    const username = `user${i}`;
    const email = `user${i}@example.com`;
    const user = await User.create({ username, email });
    users.push(user);
  }

  // Make users friends
  await Promise.all([
    users[0].updateOne({ $push: { friends: users[1]._id } }),
    users[1].updateOne({ $push: { friends: users[0]._id } }),
    users[2].updateOne({ $push: { friends: users[0]._id } }),
    users[3].updateOne({ $push: { friends: users[0]._id } })
  ]);

  // Create some thoughts and reactions
  const thoughts = [
    {
      thoughtText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      username: "user1",
      reactions: [
        { reactionBody: "Wow", username: "user2" },
        { reactionBody: "Cool", username: "user3" },
        { reactionBody: "Amazing", username: "user4" },
      ]
    },
    {
      thoughtText: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      username: "user2",
      reactions: [
        { reactionBody: "Nice", username: "user1" },
        { reactionBody: "Great", username: "user3" },
      ]
    },
    {
      thoughtText: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      username: "user3",
      reactions: [
        { reactionBody: "Interesting", username: "user1" },
        { reactionBody: "Awesome", username: "user2" },
        { reactionBody: "Fantastic", username: "user4" },
      ]
    },
    {
      thoughtText: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      username: "user4",
      reactions: [
        { reactionBody: "Impressive", username: "user1" },
        { reactionBody: "Excellent", username: "user2" },
        { reactionBody: "Superb", username: "user3" },
      ]
    }
  ];

  for (const thought of thoughts) {
    await Thought.create(thought);
  }

  console.log('Seed data generated!');
  process.exit(0);
});