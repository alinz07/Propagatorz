const db = require('./connection');
const { User, Post } = require('../models');

db.once('open', async () => {

    // Post seeds
    await Post.deleteMany();

    const posts = await Post.insertMany([
        {
            title: 'Leaves Falling Off Daily',
            plantType: 'Fiddle Leaf Fig',
            description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            picture: 'picture',
            username: 'Betty',
            comments: [
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    username: "Scott"
                },
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    username: "Sara"
                }
            ]
        },
        {
            title: 'Yellow Leaves',
            plantType: 'Spider Plant',
            description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            picture: 'picture',
            username: 'Betty',
            comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

        },
        {
            title: 'Shriveled Leaves',
            plantType: 'Rattlesnake Plant',
            description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            picture: 'picture',
            username: 'Scott',
            comments: [
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    username: "Sara"
                }
            ]

        }
    ]);

    console.log('posts seeded');

    // User seeds
    await User.deleteMany();

    await User.create({
        username: 'Betty',
        email: 'betty@email.com',
        password: 'password',
        posts: [posts[0]._id, posts[1]._id]
    });

    await User.create({
        username: 'Scott',
        email: 'scott@email.com',
        password: 'password',
        posts: [posts[2]._id]
    });

    await User.create({
        username: 'Sara',
        email: 'sara@email.com',
        password: 'password'
    });

    console.log('users seeded');

    process.exit();
});
