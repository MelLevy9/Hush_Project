require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const Post = require('./models/Post');
const { ObjectId } = mongoose.Types;
const Group = require('./models/Group');


const seedUsers = async () => {
    try {
        await User.deleteMany();

        const mockUsers = [
            {
                _id: new ObjectId("647b712e0790ea734bcca1b4"),
                userName: 'Admin',
                email: 'admin@gmail.com',
                password: await bcrypt.hash('admin123',10),
                role: 'admin',
             },
            {
                _id: new ObjectId("647b712e0790ea734bcca1b5"),
                userName: 'User1',
                email: 'user1@gmail.com',
                password: await bcrypt.hash('user111',10),
                role: 'user',
             },
             {
                _id: new ObjectId("647b712e0790ea734bcca1b6"),
                userName: 'User2',
                email: 'user2@gmail.com',
                password: await bcrypt.hash('user222',10),
                role: 'user',
            },
            {
                _id: new ObjectId("647b712e0790ea734bcca1b7"),
                userName: 'User3',
                email: 'user3@gmail.com',
                password: await bcrypt.hash('user333',10),
                role: 'user',
            },
            {
                _id: new ObjectId("647b712e0790ea734bcca1b8"),
                userName: 'User4',
                email: 'user4@gmail.com',
                password: await bcrypt.hash('user444',10),
                role: 'user',
            },
            {
                _id: new ObjectId("647b712e0790ea734bcca1b9"),
                userName: 'User5',
                email: 'user5@gmail.com',
                password: await bcrypt.hash('user555',10),
                role: 'user',
            },
            {
                _id: new ObjectId("647b712e0790ea734bcca1ba"),
                userName: 'User6',
                email: 'user6@gmail.com',
                password: await bcrypt.hash('user666',10),
                role: 'user',
            },
            {
                _id: new ObjectId("647b712e0790ea734bcca1bb"),
                userName: 'User7',
                email: 'user7@gmail.com',
                password: await bcrypt.hash('user777',10),
                role: 'user',
            },
            {
                _id: new ObjectId("647b712e0790ea734bcca1bc"),
                userName: 'User8',
                email: 'user8@gmail.com',
                password: await bcrypt.hash('user888',10),
                role: 'user',
            },
            {
                _id: new ObjectId("647b712e0790ea734bcca1bd"),
                userName: 'User9',
                email: 'user9@gmail.com',
                password: await bcrypt.hash('user999',10),
                role: 'user',
            }, 
            {
                _id: new ObjectId("647b712e0790ea734bcca1be"),
                userName: 'User10',
                email: 'user10@gmail.com',
                password: await bcrypt.hash('user101010',10),
                role: 'user',
            }
        ];

        await User.create(mockUsers);
        console.log('Mockup users created successfully');
    
        } catch(error) {
            console.log('Error occured while seeding Users : ',error)
        }
    };
    
  const seedPosts = async () => {
        try {
            await Post.deleteMany();
    
            const seedPostsJson = require('./data/seedPosts.json');
    
            await Post.create(seedPostsJson);
    
            console.log('Seed posts added successfully');
    
        } catch(error) {
            console.log('Error occured while seeding posts to database', error);
        }
    };

    const seedGroups = async () => {
         try {
        await Group.deleteMany();

        const mockGroups = [
            {
                _id: new ObjectId("64847442404a2b77e9f913cc"),
                name: "Gaming",
                description: "",
            }, 
            {
                _id: new ObjectId("64847442404a2b77e9f913cd"),
                name: "Anime",
                description: "",
            },
            {
                _id: new ObjectId("64847442404a2b77e9f913cb"),
                name: "Movie",
                description: "",
            },
            {
                _id: new ObjectId("64847442404a2b77e9f913ce"),
                name: "Childfree",
                description: "Discussion topics and links of interest to childfree individuals.",
            }, 
            {
                _id: new ObjectId("64847442404a2b77e9f913cf"),
                name: "Cars and Motor Vehicles",
                description: "",
            },
            {
                _id: new ObjectId("64847442404a2b77e9f913d0"),
                name: "RegretfulParents",
                description: "This is a SAFE place for parents who think they shouldn't have become parents to rant, confess, get off their chest about their kids, significant others, families, whatever. Parents can also suggest ways to get closer to their children, help, advice and words of wisdom and encouragement. No Judgement or bullying allowed!",
            }, 
            {
                _id: new ObjectId("64847442404a2b77e9f913d1"),
                name: "Reading, Writing and Literature",
                description: "",
            },
            {
                _id: new ObjectId("64847442404a2b77e9f913d2"),
                name: "Confession",
                description: "Confession is a place to admit your wrongdoings, acknowledge your guilt, and alleviate your conscience.",
            }, 
            {
                _id: new ObjectId("64847442404a2b77e9f913d3"),
                name: "Programing",
                description: "",
            },
        ];

        await Group.create(mockGroups);
        console.log('Mockup groups created successfully');
    
        } catch(error) {
            console.log('Error occured while seeding Groups : ',error)
        }
    };
    

    const seedAll = async () => {
    
        const arguments = process.argv;
    
        if (!arguments.includes('i-am-sure')) {
            console.log('WARNING!!');
            console.log('You are about to replace all the data in your database');
            console.log('with mockup / seed data ! This operation is ireversable !!');
            console.log('If you know what you are doing, add "i-am-sure" argument.');
            process.exit(1);
        };
    
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        await seedUsers();
        await seedPosts();
        await seedGroups();
    
        console.log('Done seeding');
        process.exit(0);
    }
    
    seedAll();