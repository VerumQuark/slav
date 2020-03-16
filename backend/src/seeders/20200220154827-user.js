'use strict';
const bcrypt = require( 'bcrypt' );
const { SALT_ROUND } = require( '../constants' );

const firstNames = [
  'Emma',
  'Olivia',
  'Ava',
  'Isabella',
  'Sophia',
  'Charlotte',
  'Mia',
  'Amelia',
  'Harper',
  'Evelyn',
  'Abigail',
  'Emily',
  'Elizabeth',
  'Mila',
  'Ella',
  'Avery',
  'Sofia',
  'Camila',
  'Aria',
  'Scarlett',
  'Victoria',
  'Madison',
  'Luna',
  'Grace',
  'Chloe',
  'Penelope',
  'Layla',
  'Riley',
  'Zoey',
  'Nora',
  'Lily',
  'Eleanor',
  'Hannah',
  'Lillian',
  'Addison',
  'Aubrey',
  'Ellie',
  'Stella',
  'Natalie',
  'Zoe',
  'Leah',
  'Hazel',
  'Violet',
  'Aurora',
  'Savannah',
  'Audrey',
  'Brooklyn',
  'Bella',
  'Claire',
  'Skylar',
  'Lucy',
  'Paisley',
  'Everly',
  'Anna',
  'Caroline',
  'Nova',
  'Genesis',
  'Emilia',
  'Kennedy',
  'Samantha',
  'Maya',
  'Willow',
  'Kinsley',
  'Naomi',
  'Aaliyah',
  'Elena',
  'Sarah',
  'Ariana',
  'Allison',
  'Gabriella',
  'Alice',
  'Madelyn',
  'Cora',
  'Ruby',
  'Eva',
  'Serenity',
  'Autumn',
  'Adeline',
  'Hailey',
  'Gianna',
  'Valentina',
  'Isla',
  'Eliana',
  'Quinn',
  'Nevaeh',
  'Ivy',
  'Sadie',
  'Piper',
  'Lydia',
  'Alexa',
  'Josephine',
  'Emery',
  'Julia',
  'Delilah',
  'Arianna',
  'Vivian',
  'Kaylee',
  'Sophie',
  'Brielle',
  'Madeline',
  'Peyton',
  'Rylee',
  'Clara',
  'Hadley',
  'Melanie',
  'Mackenzie',
  'Reagan',
  'Adalynn',
  'Liliana',
  'Aubree',
  'Jade',
  'Katherine',
  'Isabelle',
  'Natalia',
  'Raelynn',
  'Maria',
  'Athena',
  'Ximena',
  'Arya',
  'Leilani',
  'Taylor',
  'Faith',
  'Rose',
  'Kylie',
  'Alexandra',
  'Mary',
  'Margaret',
  'Lyla',
  'Ashley',
  'Amaya',
  'Eliza',
  'Brianna',
  'Bailey',
  'Andrea',
  'Khloe',
  'Jasmine',
  'Melody',
  'Iris',
  'Isabel',
  'Norah',
  'Annabelle',
  'Valeria',
  'Emerson',
  'Adalyn',
  'Ryleigh',
  'Eden',
  'Emersyn',
  'Anastasia',
  'Kayla',
  'Alyssa',
  'Juliana',
  'Charlie',
  'Esther',
  'Ariel',
  'Cecilia',
  'Valerie',
  'Alina',
  'Molly',
  'Reese',
  'Aliyah',
  'Lilly',
  'Parker',
  'Finley',
  'Morgan',
  'Sydney',
  'Jordyn',
  'Eloise',
  'Trinity',
  'Daisy',
  'Kimberly',
  'Lauren',
  'Genevieve',
  'Sara',
  'Arabella',
  'Harmony',
  'Elise',
  'Remi',
  'Teagan',
  'Alexis',
  'London',
  'Sloane',
  'Laila',
  'Lucia',
  'Diana',
  'Juliette',
  'Sienna',
  'Elliana',
  'Londyn',
  'Ayla',
  'Callie',
  'Gracie',
  'Josie',
  'Amara',
  'Jocelyn',
  'Daniela',
  'Everleigh',
  'Mya',
  'Rachel',
  'Summer',
  'Alana',
  'Brooke',
  'Alaina',
  'Mckenzie',
  'Catherine',
  'Amy',
  'Presley',
  'Journee',
  'Rosalie',
  'Ember',
  'Brynlee',
  'Rowan',
  'Joanna',
  'Paige',
  'Rebecca',
  'Ana',
  'Sawyer',
  'Mariah',
  'Nicole',
  'Brooklynn',
  'Payton',
  'Marley',
  'Fiona',
  'Georgia',
  'Lila',
  'Harley',
  'Adelyn',
  'Alivia',
  'Noelle',
  'Gemma',
  'Vanessa',
  'Journey',
  'Makayla',
  'Angelina',
  'Adaline',
  'Catalina',
  'Alayna',
  'Julianna',
  'Leila',
  'Lola',
  'Adriana',
  'June',
  'Juliet',
  'Jayla',
  'River',
  'Tessa',
  'Lia',
  'Dakota',
  'Delaney',
  'Selena',
  'Blakely',
  'Ada',
  'Camille',
  'Zara',
  'Malia',
  'Hope',
  'Samara',
  'Vera',
  'Mckenna',
  'Briella',
  'Izabella',
  'Hayden',
  'Raegan',
  'Michelle',
  'Angela',
  'Ruth',
  'Freya',
  'Kamila',
  'Vivienne',
  'Aspen',
  'Olive',
  'Kendall',
  'Elaina',
  'Thea',
  'Kali',
  'Destiny',
  'Amiyah',
  'Evangeline',
  'Cali',
  'Blake',
  'Elsie',
  'Juniper',
  'Alexandria',
  'Myla',
  'Ariella',
  'Kate',
  'Mariana',
  'Lilah',
  'Charlee',
  'Daleyza',
  'Nyla',
  'Jane',
  'Maggie',
  'Zuri',
  'Aniyah',
  'Lucille',
  'Leia',
  'Melissa',
  'Adelaide',
  'Amina',
  'Giselle',
  'Lena',
  'Camilla',
  'Miriam',
  'Millie',
  'Brynn',
  'Gabrielle',
  'Sage',
  'Annie',
  'Logan',
  'Lilliana',
  'Haven',
  'Jessica',
  'Kaia',
  'Magnolia',
  'Amira',
  'Adelynn',
  'Makenzie',
  'Stephanie',
  'Nina',
  'Phoebe',
  'Arielle',
  'Evie',
  'Lyric',
  'Alessandra',
  'Gabriela',
  'Paislee',
  'Raelyn',
  'Madilyn',
  'Paris',
  'Makenna',
  'Kinley',
  'Gracelyn',
  'Talia',
  'Maeve',
  'Rylie',
  'Kiara',
  'Evelynn',
  'Brinley',
  'Jacqueline',
  'Laura',
  'Gracelynn',
  'Lexi',
  'Ariah',
  'Fatima',
  'Jennifer',
  'Kehlani',
  'Alani',
  'Ariyah',
  'Luciana',
  'Allie',
  'Heidi',
  'Maci',
  'Phoenix',
  'Felicity',
  'Joy',
  'Kenzie',
  'Veronica',
  'Margot',
  'Addilyn',
  'Lana',
  'Cassidy',
  'Remington',
  'Saylor',
  'Ryan',
  'Keira',
  'Harlow',
  'Miranda',
  'Angel',
  'Amanda',
  'Daniella',
  'Royalty',
  'Gwendolyn',
  'Ophelia',
  'Heaven',
  'Jordan',
  'Madeleine',
  'Esmeralda',
  'Kira',
  'Miracle',
  'Elle',
  'Amari',
  'Danielle',
  'Daphne',
  'Willa',
  'Haley',
  'Gia',
  'Kaitlyn',
  'Oakley',
  'Kailani',
  'Winter',
  'Alicia',
  'Serena',
  'Nadia',
  'Aviana',
  'Demi',
  'Jada',
  'Braelynn',
  'Dylan',
  'Ainsley',
  'Alison',
  'Camryn',
  'Avianna',
  'Bianca',
  'Skyler',
  'Scarlet',
  'Maddison',
  'Nylah',
  'Sarai',
  'Regina',
  'Dahlia',
  'Nayeli',
  'Raven',
  'Helen',
  'Adrianna',
  'Averie',
  'Skye',
  'Kelsey',
  'Tatum',
  'Kensley',
  'Maliyah',
  'Erin',
  'Viviana',
  'Jenna',
  'Anaya',
  'Carolina',
  'Shelby',
  'Sabrina',
  'Mikayla',
  'Annalise',
  'Octavia',
  'Lennon',
  'Blair',
  'Carmen',
  'Yaretzi',
  'Kennedi',
  'Mabel',
  'Zariah',
  'Kyla',
  'Christina',
  'Selah',
  'Celeste',
  'Eve',
  'Mckinley',
  'Milani',
  'Frances',
  'Jimena',
  'Kylee',
  'Leighton',
  'Katie',
  'Aitana',
  'Kayleigh',
  'Sierra',
  'Kathryn',
  'Rosemary',
  'Jolene',
  'Alondra',
  'Elisa',
  'Helena',
  'Charleigh',
  'Hallie',
  'Lainey',
  'Avah',
  'Jazlyn',
  'Kamryn',
  'Mira',
  'Cheyenne',
  'Francesca',
  'Antonella',
  'Wren',
  'Chelsea',
  'Amber',
  'Emory',
  'Lorelei',
  'Nia',
  'Abby',
  'April',
  'Emelia',
  'Carter',
  'Aylin',
  'Cataleya',
  'Bethany',
  'Marlee',
  'Carly',
  'Kaylani',
  'Emely',
  'Liana',
  'Madelynn',
  'Cadence',
  'Matilda',
  'Sylvia',
  'Myra',
  'Fernanda',
  'Oaklyn',
  'Elianna',
  'Hattie',
  'Dayana',
  'Kendra',
  'Maisie',
  'Malaysia',
  'Kara',
  'Katelyn',
  'Maia',
  'Celine',
  'Cameron',
  'Renata',
  'Jayleen',
  'Charli',
  'Emmalyn',
  'Holly',
  'Azalea',
  'Leona',
  'Alejandra',
  'Bristol',
  'Collins',
  'Imani',
  'Meadow',
  'Alexia',
  'Edith',
  'Kaydence',
  'Leslie',
  'Lilith',
  'Kora',
  'Aisha',
  'Meredith',
  'Danna',
  'Wynter',
  'Emberly',
  'Julieta',
  'Michaela',
  'Alayah',
  'Jemma',
  'Reign',
  'Colette',
  'Kaliyah',
  'Elliott',
  'Johanna',
  'Remy',
  'Sutton',
  'Emmy',
  'Virginia',
  'Briana',
  'Oaklynn',
  'Adelina',
  'Everlee',
  'Megan',
  'Angelica',
  'Justice',
  'Mariam',
  'Khaleesi',
  'Macie',
  'Karsyn',
  'Alanna',
  'Aleah',
  'Mae',
  'Mallory',
  'Esme',
  'Skyla',
  'Madilynn',
  'Charley',
  'Allyson',
  'Hanna',
  'Shiloh',
  'Henley',
  'Macy',
  'Maryam',
  'Ivanna',
  'Ashlynn',
  'Lorelai',
  'Amora',
  'Ashlyn',
  'Sasha',
  'Baylee',
  'Beatrice',
  'Itzel',
  'Priscilla',
  'Marie',
  'Jayda',
  'Liberty',
  'Rory',
  'Alessia',
  'Alaia',
  'Janelle',
  'Kalani',
  'Gloria',
  'Sloan',
  'Dorothy',
  'Greta',
  'Julie',
  'Zahra',
  'Savanna',
  'Annabella',
  'Poppy',
  'Amalia',
  'Zaylee',
  'Cecelia',
  'Coraline',
  'Kimber',
  'Emmie',
  'Liam',
  'Noah',
  'William',
  'James',
  'Oliver',
  'Benjamin',
  'Elijah',
  'Lucas',
  'Mason',
  'Logan',
  'Alexander',
  'Ethan',
  'Jacob',
  'Michael',
  'Daniel',
  'Henry',
  'Jackson',
  'Sebastian',
  'Aiden',
  'Matthew',
  'Samuel',
  'David',
  'Joseph',
  'Carter',
  'Owen',
  'Wyatt',
  'John',
  'Jack',
  'Luke',
  'Jayden',
  'Dylan',
  'Grayson',
  'Levi',
  'Isaac',
  'Gabriel',
  'Julian',
  'Mateo',
  'Anthony',
  'Jaxon',
  'Lincoln',
  'Joshua',
  'Christopher',
  'Andrew',
  'Theodore',
  'Caleb',
  'Ryan',
  'Asher',
  'Nathan',
  'Thomas',
  'Leo',
  'Isaiah',
  'Charles',
  'Josiah',
  'Hudson',
  'Christian',
  'Hunter',
  'Connor',
  'Eli',
  'Ezra',
  'Aaron',
  'Landon',
  'Adrian',
  'Jonathan',
  'Nolan',
  'Jeremiah',
  'Easton',
  'Elias',
  'Colton',
  'Cameron',
  'Carson',
  'Robert',
  'Angel',
  'Maverick',
  'Nicholas',
  'Dominic',
  'Jaxson',
  'Greyson',
  'Adam',
  'Ian',
  'Austin',
  'Santiago',
  'Jordan',
  'Cooper',
  'Brayden',
  'Roman',
  'Evan',
  'Ezekiel',
  'Xavier',
  'Jose',
  'Jace',
  'Jameson',
  'Leonardo',
  'Bryson',
  'Axel',
  'Everett',
  'Parker',
  'Kayden',
  'Miles',
  'Sawyer',
  'Jason',
  'Declan',
  'Weston',
  'Micah',
  'Ayden',
  'Wesley',
  'Luca',
  'Vincent',
  'Damian',
  'Zachary',
  'Silas',
  'Gavin',
  'Chase',
  'Kai',
  'Emmett',
  'Harrison',
  'Nathaniel',
  'Kingston',
  'Cole',
  'Tyler',
  'Bennett',
  'Bentley',
  'Ryker',
  'Tristan',
  'Brandon',
  'Kevin',
  'Luis',
  'George',
  'Ashton',
  'Rowan',
  'Braxton',
  'Ryder',
  'Gael',
  'Ivan',
  'Diego',
  'Maxwell',
  'Max',
  'Carlos',
  'Kaiden',
  'Juan',
  'Maddox',
  'Justin',
  'Waylon',
  'Calvin',
  'Giovanni',
  'Jonah',
  'Abel',
  'Jayce',
  'Jesus',
  'Amir',
  'King',
  'Beau',
  'Camden',
  'Alex',
  'Jasper',
  'Malachi',
  'Brody',
  'Jude',
  'Blake',
  'Emmanuel',
  'Eric',
  'Brooks',
  'Elliot',
  'Antonio',
  'Abraham',
  'Timothy',
  'Finn',
  'Rhett',
  'Elliott',
  'Edward',
  'August',
  'Xander',
  'Alan',
  'Dean',
  'Lorenzo',
  'Bryce',
  'Karter',
  'Victor',
  'Milo',
  'Miguel',
  'Hayden',
  'Graham',
  'Grant',
  'Zion',
  'Tucker',
  'Jesse',
  'Zayden',
  'Joel',
  'Richard',
  'Patrick',
  'Emiliano',
  'Avery',
  'Nicolas',
  'Brantley',
  'Dawson',
  'Myles',
  'Matteo',
  'River',
  'Steven',
  'Thiago',
  'Zane',
  'Matias',
  'Judah',
  'Messiah',
  'Jeremy',
  'Preston',
  'Oscar',
  'Kaleb',
  'Alejandro',
  'Marcus',
  'Mark',
  'Peter',
  'Maximus',
  'Barrett',
  'Jax',
  'Andres',
  'Holden',
  'Legend',
  'Charlie',
  'Knox',
  'Kaden',
  'Paxton',
  'Kyrie',
  'Kyle',
  'Griffin',
  'Josue',
  'Kenneth',
  'Beckett',
  'Enzo',
  'Adriel',
  'Arthur',
  'Felix',
  'Bryan',
  'Lukas',
  'Paul',
  'Brian',
  'Colt',
  'Caden',
  'Leon',
  'Archer',
  'Omar',
  'Israel',
  'Aidan',
  'Theo',
  'Javier',
  'Remington',
  'Jaden',
  'Bradley',
  'Emilio',
  'Colin',
  'Riley',
  'Cayden',
  'Phoenix',
  'Clayton',
  'Simon',
  'Ace',
  'Nash',
  'Derek',
  'Rafael',
  'Zander',
  'Brady',
  'Jorge',
  'Jake',
  'Louis',
  'Damien',
  'Karson',
  'Walker',
  'Maximiliano',
  'Amari',
  'Sean',
  'Chance',
  'Walter',
  'Martin',
  'Finley',
  'Andre',
  'Tobias',
  'Cash',
  'Corbin',
  'Arlo',
  'Iker',
  'Erick',
  'Emerson',
  'Gunner',
  'Cody',
  'Stephen',
  'Francisco',
  'Killian',
  'Dallas',
  'Reid',
  'Manuel',
  'Lane',
  'Atlas',
  'Rylan',
  'Jensen',
  'Ronan',
  'Beckham',
  'Daxton',
  'Anderson',
  'Kameron',
  'Raymond',
  'Orion',
  'Cristian',
  'Tanner',
  'Kyler',
  'Jett',
  'Cohen',
  'Ricardo',
  'Spencer',
  'Gideon',
  'Ali',
  'Fernando',
  'Jaiden',
  'Titus',
  'Travis',
  'Bodhi',
  'Eduardo',
  'Dante',
  'Ellis',
  'Prince',
  'Kane',
  'Luka',
  'Kash',
  'Hendrix',
  'Desmond',
  'Donovan',
  'Mario',
  'Atticus',
  'Cruz',
  'Garrett',
  'Hector',
  'Angelo',
  'Jeffrey',
  'Edwin',
  'Cesar',
  'Zayn',
  'Devin',
  'Conor',
  'Warren',
  'Odin',
  'Jayceon',
  'Romeo',
  'Julius',
  'Jaylen',
  'Hayes',
  'Kayson',
  'Muhammad',
  'Jaxton',
  'Joaquin',
  'Caiden',
  'Dakota',
  'Major',
  'Keegan',
  'Sergio',
  'Marshall',
  'Johnny',
  'Kade',
  'Edgar',
  'Leonel',
  'Ismael',
  'Marco',
  'Tyson',
  'Wade',
  'Collin',
  'Troy',
  'Nasir',
  'Conner',
  'Adonis',
  'Jared',
  'Rory',
  'Andy',
  'Jase',
  'Lennox',
  'Shane',
  'Malik',
  'Ari',
  'Reed',
  'Seth',
  'Clark',
  'Erik',
  'Lawson',
  'Trevor',
  'Gage',
  'Nico',
  'Malakai',
  'Quinn',
  'Cade',
  'Johnathan',
  'Sullivan',
  'Solomon',
  'Cyrus',
  'Fabian',
  'Pedro',
  'Frank',
  'Shawn',
  'Malcolm',
  'Khalil',
  'Nehemiah',
  'Dalton',
  'Mathias',
  'Jay',
  'Ibrahim',
  'Peyton',
  'Winston',
  'Kason',
  'Zayne',
  'Noel',
  'Princeton',
  'Matthias',
  'Gregory',
  'Sterling',
  'Dominick',
  'Elian',
  'Grady',
  'Russell',
  'Finnegan',
  'Ruben',
  'Gianni',
  'Porter',
  'Kendrick',
  'Leland',
  'Pablo',
  'Allen',
  'Hugo',
  'Raiden',
  'Kolton',
  'Remy',
  'Ezequiel',
  'Damon',
  'Emanuel',
  'Zaiden',
  'Otto',
  'Bowen',
  'Marcos',
  'Abram',
  'Kasen',
  'Franklin',
  'Royce',
  'Jonas',
  'Sage',
  'Philip',
  'Esteban',
  'Drake',
  'Kashton',
  'Roberto',
  'Harvey',
  'Alexis',
  'Kian',
  'Jamison',
  'Maximilian',
  'Adan',
  'Milan',
  'Phillip',
  'Albert',
  'Dax',
  'Mohamed',
  'Ronin',
  'Kamden',
  'Hank',
  'Memphis',
  'Oakley',
  'Augustus',
  'Drew',
  'Moises',
  'Armani',
  'Rhys',
  'Benson',
  'Jayson',
  'Kyson',
  'Braylen',
  'Corey',
  'Gunnar',
  'Omari',
  'Alonzo',
  'Landen',
  'Armando',
  'Derrick',
  'Dexter',
  'Enrique',
  'Bruce',
  'Nikolai',
  'Francis',
  'Rocco',
  'Kairo',
  'Royal',
  'Zachariah',
  'Arjun',
  'Deacon',
  'Skyler',
  'Eden',
  'Alijah',
  'Rowen',
  'Pierce',
  'Uriel',
  'Ronald',
  'Luciano',
  'Tate',
  'Frederick',
  'Kieran',
  'Lawrence',
];
const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Jones',
  'Brown',
  'Davis',
  'Miller',
  'Wilson',
  'Moore',
  'Taylor',
  'Anderson',
  'Thomas',
  'Jackson',
  'White',
  'Harris',
  'Martin',
  'Thompson',
  'Garcia',
  'Martinez',
  'Robinson',
  'Clark',
  'Rodriguez',
  'Lewis',
  'Lee',
  'Walker',
  'Hall',
  'Allen',
  'Young',
  'Hernandez',
  'King',
  'Wright',
  'Lopez',
  'Hill',
  'Scott',
  'Green',
  'Adams',
  'Baker',
  'Gonzalez',
  'Nelson',
  'Carter',
  'Mitchell',
  'Perez',
  'Roberts',
  'Turner',
  'Phillips',
  'Campbell',
  'Parker',
  'Evans',
  'Edwards',
  'Collins',
  'Stewart',
  'Sanchez',
  'Morris',
  'Rogers',
  'Reed',
  'Cook',
  'Morgan',
  'Bell',
  'Murphy',
  'Bailey',
  'Rivera',
  'Cooper',
  'Richardson',
  'Cox',
  'Howard',
  'Ward',
  'Torres',
  'Peterson',
  'Gray',
  'Ramirez',
  'James',
  'Watson',
  'Brooks',
  'Kelly',
  'Sanders',
  'Price',
  'Bennett',
  'Wood',
  'Barnes',
  'Ross',
  'Henderson',
  'Coleman',
  'Jenkins',
  'Perry',
  'Powell',
  'Long',
  'Patterson',
  'Hughes',
  'Flores',
  'Washington',
  'Butler',
  'Simmons',
  'Foster',
  'Gonzales',
  'Bryant',
  'Alexander',
  'Russell',
  'Griffin',
  'Diaz',
  'Hayes',
];
const pictures = [
  'https://www.phdmedia.com/panama/wp-content/uploads/sites/97/2015/05/temp-people-profile.jpg',
  'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  'https://blogadmin.planning.center/content/images/2018/09/emily-1.jpg',
  'https://cdn-ep19.pressidium.com/wp-content/uploads/2018/10/cool-profile-pictures-retouching-1.jpg',
  'https://images.squarespace-cdn.com/content/v1/5070f2f8c4aa65eb3b6394d0/1436318760553-FXYJT6WFQ1707RGHAICV/ke17ZwdGBToddI8pDm48kMIebV6MdNPQMcRDrC5oPxMUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKc73FUbOtyHSZLq0696RfXhzOQ1C7e-4RYctpOI87j69--0uIsXqDbvJ5MkV0zcn4f/LYB+People+Profile+%2807%29.jpg?format=1500w',
  'data:image/jpeg;base64,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',
  'https://cdn.images.express.co.uk/img/dynamic/25/590x/secondary/Holidays-2019-Japan-1652989.jpg?r=1546335017280',
  'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
];

function generateUsers (count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const surname = lastNames[Math.floor( Math.random() * lastNames.length )];
    users.push( {
                  firstName: firstNames[Math.floor( Math.random() * firstNames.length )],
                  lastName: surname,
                  email: `user_${surname}${i}@gmail.com`,
                  passwordHash: bcrypt.hashSync( 'paSSword123', bcrypt.genSaltSync( SALT_ROUND ) ),
                  profilePicture: pictures[Math.floor( Math.random() * pictures.length )],
                  createdAt: new Date(),
                  updatedAt: new Date(),
                } );
  }
  return users;
}

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert( 'Users', generateUsers( 2000 ), {} );

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete( 'Users', null, {} );

  }
};
