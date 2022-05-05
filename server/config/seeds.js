const db = require('./connection');
const { User, Post } = require('../models');

db.once('open', async () => {

    // Post seeds
    await Post.deleteMany();

    const posts = await Post.insertMany([
        {
            title: 'Leaves Falling Off Daily',
            plantType: 'Fiddle Leaf Fig',
            description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
            picture: 'https://res.cloudinary.com/dk53zrwwe/image/upload/v1651630945/Plants/fiddleleaffig_b2otqh.jpg',
            username: 'Betty',
            comments: [
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    username: "Scott"
                },
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    username: "Sara"
                }
            ]
        },
        {
            title: 'Yellow Leaves',
            plantType: 'Spider Plant',
            description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
            picture: 'https://res.cloudinary.com/dk53zrwwe/image/upload/v1651630946/Plants/spiderplant_eoiulz.jpg',
            username: 'Betty',
            comments: [
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    username: "Sara"
                }
            ]

        },
        {
            title: 'Shriveled Leaves',
            plantType: 'Rattlesnake Plant',
            description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
            picture: 'https://res.cloudinary.com/dk53zrwwe/image/upload/v1651630946/Plants/rattlesnackplant_mbrnbx.webp',
            username: 'Scott',
            comments: [
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    username: "Sara"
                }
            ]

        },
        {
            title: 'Cactus Never Flowers',
            plantType: 'Christmas Cactus',
            description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
            picture: 'https://res.cloudinary.com/dk53zrwwe/image/upload/v1651631458/Plants/xmascactus_fncqkm.webp',
            username: 'Nancy',
            comments: [
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    username: "Sara"
                },
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    username: "Scott"
                },
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    username: "Nancy"
                }
            ]

        },
        {
            title: 'Leaves Not Splitting',
            plantType: 'Monstera',
            description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
            picture: 'https://res.cloudinary.com/dk53zrwwe/image/upload/v1651631762/Plants/monstera_vfj1sw.webp',
            username: 'Betty',
            comments: [
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    username: "Sara"
                },
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    username: "Scott"
                },
                {
                    commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    username: "Nancy"
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
        posts: [posts[0]._id, posts[1]._id, posts[4]._id]
    });

    await User.create({
        username: 'Scott',
        email: 'scott@email.com',
        password: 'password',
        posts: [posts[2]._id]
    });

    await User.create({
        username: 'Nancy',
        email: 'nancy@email.com',
        password: 'password',
        posts: [posts[3]._id]
    });

    await User.create({
        username: 'Sara',
        email: 'sara@email.com',
        password: 'password'
    });

    console.log('users seeded');

    process.exit();
});
