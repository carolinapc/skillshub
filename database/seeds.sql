/*Automatic execution when the server starts up on the development enviroment */

-- /*test data*/
INSERT INTO User
    (id,firstName,lastName,email,password,zipCode,image)
VALUES
    (1, 'Carol', 'Cavalcanti', 'carolinapc@gmail.com', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', 'M4Y1H5', 'profile_1.jpg'),
    (2, 'John', 'Doe', 'user1', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'profile_2.jpg'),
    (3, 'Mary', 'Jane', 'user2', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'profile_3.jpg'),
    (4, 'Frank', 'Russel', 'user3', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'profile_4.jpg'),
    (5, 'Maggie', 'MacVey', 'maggimacvey7@gmail.com', '$2b$10$odgCqiMprJfgLJPGXiLS4eCbr0dQYXIVSuxFHsZT76ismKyzyXfiy', null, 'profile_5.jpg' ),
    (6, 'Angie', 'Dob', 'user4', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'angieprofile.jpg'),
    (7, 'Jenn', 'Siggy', 'user5', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'jennprofile.jpg'),
    (8, 'Jeremy', 'Delzo', 'user6', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'jeremyprofile.jpg'),
    (9, 'Sam', 'McK', 'user7', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'samprofile.jpg'),
    (10, 'Amanda', 'Dob', 'user8', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'amandaprofile.jpg'),
    (11, 'Matty', 'Bort', 'user9', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'mattprofile.jpg'),
    (12, 'Andy', 'Jam', 'user10', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'andyprofile.jpg'),
    (13, 'Jordan', 'Caddle', 'user11', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'jordanprofile.jpg'),
    (14, 'Andrew', 'Harden', 'user12', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'hardyprofile.jpg'),
    (15, 'Emily', 'Lem', 'user13', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'emilyprofile.jpg'),
    (16, 'Rachael', 'G', 'user14', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'rachaelprofile.jpg'),
    (17, 'Alex', 'Alto', 'user15', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'alexprofile.jpg'),
    (18, 'Robyn', 'Bird', 'user16', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'robynprofile.jpg'),
    (19, 'Anna', 'Jan', 'user17', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'annaprofile.jpg'),
    (20, 'Veronika', 'Trolley', 'user18', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'veronikaprofile.jpg'),
    (21, 'Alexis', 'Amb', 'user19', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'alexisprofile.jpg'),
    (22, 'Jay', 'Beach', 'user20', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'jayprofile.jpg'),
    (23, 'Kallvis', 'Sew', 'user21', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'kallvisprofile.jpg'),
    (24, 'Julien', 'Craig', 'user22', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'julienprofile.jpg'),
    (25, 'Jorge', 'Mex', 'user23', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'jorgeprofile.jpg'),
    (26, 'Kevin', 'Kevon', 'user24', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'kevinprofile.jpg'),
    (27, 'Melissa', 'Lima', 'user25', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'melissaprofile.jpg'),
    (28, 'Mike', 'Carlo', 'user26', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'mikeprofile.jpg'),
    (29, 'Stefanie', 'Barr', 'user27', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'stefanieprofile.jpg'),
    (30, 'Phoenix', 'Pink', 'user28', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'phoenixprofile.jpg'),
    (31, 'Sandra', 'Rose', 'user29', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'sandraprofile.jpg'),
    (32, 'Tara', 'Wells', 'user30', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'taraprofile.jpg'),
    (33, 'Wade', 'Edmon', 'user31', '$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra', null, 'wadeprofile.jpg');

INSERT INTO Category
    (id, name, image)
VALUES
    (1, 'Handy Work', 'handyman.jpg'),
    (2, 'Home Reno', 'construction.jpg'),
    (3, 'Technology', 'technology.jpg'),
    (4, 'DIY & Arts and Crafts', 'DIY.jpg'),
    (5, 'Coaching', 'coaching.jpg'),
    (6, 'Language', 'translation.jpg'),
    (7, 'Education', 'education.jpg'),
    (8, 'Misc. Errands', 'errands.jpg'),
    (9, 'Childcare', 'childcare.jpg'),
    (10, 'Supernatural Services', 'psychic.jpg'),
    (11, 'Cleaning', 'cleaning.jpg'),
    (12, 'Pet Care', 'pet.jpg'),
    (13, 'Cooking', 'cooking.jpg'),
    (14, 'Health & Fitness', 'health.jpg'),
    (15, 'Beauty', 'beauty.jpg'),
    (16, 'Alterations & Tailoring', 'tailoring.jpg'),
    (17, 'Auto Services', 'mechanic.jpg'),
    (18, 'Landscaping', 'landscaping.jpg');




INSERT INTO Skill
(id,name,description,price,pricetype,zipcode,CategoryId,UserId,score,latitude,longitude)
VALUES
INSERT INTO Skill
    (id,name,description,price,pricetype,zipcode,CategoryId,UserId,score)
VALUES
    (1, 'roofing', 'With winter coming we all need to make sure that our roofs are winter and spring ready!  We have 15 year years experience, we do shingles, steel, and clay roofs.  Contact us for pricing! ', 100, 'J', 'M4Y1H5', 2, 1, 3),
    (2, 'accounting', 'INCOME TAX -From $19.99, Corporate Tax form $100, Business from $50, E-FILE, PERSONAL TAX and CORPORATE TAX RETURNS BUSINESS, SELF EMPLOYED RETURNS FROM $ 50, DISABILITY TAX CREDIT APPLICATION LAST 10 YEARS TAX CAN FILE MAXIMUM REFUND GUARANTEE We Specialize in: . Corporate & Personal Tax Retunes E-File . Accounting & Payroll Services . Prepare T4, T4a & Summary E-File to CRA . Business Plan . Business Registration . CRA Tax Audit Representation . Dissolve Corporation . QUALITY SERVICES WITH ...', 50, 'H', 'M4Y1H5', 4, 2, 2),
    (3, 'Math Tutor', 'I am a second year commerce student at Ryerson University that specializes in financial math and english. I can help with all levels of math. $25/hour for Grades 1-5, $30/hour for Grades 6-8 and $40/hour for Grades 9-', 10.5, 'H', 'M4Y1H5', 1, 2, 5),
    (4, 'translating', 'Need Help in Chinese Learning? Experienced teacher offering Adult & Children Classes!
We guarantee your progress! Please feel free to call.  TEACHERS QUALIFICATIONS/SKILLS
Over 5 years experience of university teaching
Excellent skills interpersonal communication
Rich experience in teaching Chinese in Canada
Bilingual – Fluent in English and Mandarin
Certified in Teaching Chinese as a Second Language
Superior professional work ethic & self reliance', 500, 'D', 'M4Y1H5', 6, 2, 0),
    (5, 'Back-end developer', 'I am Experienced It Proffessional. I Have More Than 2 Years Of Experience In It Industry. I Worked on Salesforce, Java, Node Js And Some Other Front End Technology. I did 6 Projects Throughout this Journey. I am About To Finish My Diploma In Web Design And Already Finished My Batchelor Of Computer. If Anyone Has Any Part Time Or Internship Position Available Please Let Me Know.thank You', 90.50, 'H', 'M4Y1H5', 3, 1, 0),
    (6, 'mechanic', 'Services include:
Pre purchase vehicle Inspections
Timing belt replacement
Brake Replacement
Complete tune ups
Suspension repair
Engine diagnostics and repair
Electrical Repair
Battery, Alternator and Starter replacement
Tire repair and On Rim Tire Change Overs', 60, 'J', 'M4Y1H5', 8, 1, 0),
    (7, 'flooring', 'Im an experienced carpet and flooring contractor with many years in the trade, covering both the COMMERCIAL & RESIDENTIAL aspects of the business.
Our goal is to offer you the highest levels of service and the best range of quality workmanship and affordable material, all for the most reasonable price possible.', 20, 'J', 'M4Y1H5', 2, 1, 0),
    (8, 'law', 'WE HAVE OVER A DECADE OF EXPERIENCE DEFENDING CLIENTS THROUGHOUT SOUTHERN ONTARIO. WE ONLY PRACTICE CRIMINAL LAW. If you have been arrested or are being investigated by law enforcement, your freedom and reputation are potentially in jeopardy. With so much at stake, your choice of defense attorney is one of the most critical decisions you will ever make. You need a dedicated and experienced professional with a versatile set of skills.', 450.80, 'H', 'M4Y1H5', 5, 1, 0),
    (9, 'cleaning', '****FREE QUOTE AND CONSULTATION****

The best price for complete cleaning and maintenance:
-Office Buildings
-Medical/Dental Offices
-Restaurants
-Shopping Malls/Retail Factories
-Factories/Warehouses
-Residential Properties
-Floor (Strip/Refinish)
-Carpet Cleaning
-Construction/Renovation', 250, 'D', 'M4Y1H5', 1, 2, 0),
    (10, 'dance teacher', 'Looking to learn a Bollywood number to surprise your friends and family at your next event? Or maybe looking for choreography to your first dance?

We provide Bollywood dance choreography for all levels. We can either come to your place or you can come to one of our studio spaces in Mississauga.', 20, 'D', 'M4Y1H5', 4, 1, 0),
    (11, 'painting', 'Looking to paint a small room or the whole house? Tired of getting outrageous quotes? Professional house painter here with over 15 years experience… Feel free to contact me at anytime', 160, 'J', 'M4Y1H5', 2, 1, 0),
    (12, 'Plumber', 'PLUMBING - DRAIN SEWER SERVICES :

Brampton Nobleton Mississauga Oakville Toronto Milton scarborough markham richmond hill woodbrdige aurora newmarket north york caledon bolton vaughan georgetown aurora

Emergency Licensed Plumbers 24/7', 45.50, 'H', 'M4Y1H5', 2, 6, 0),
    (13, 'Front-end Developer', 'Web developer with 3 years experience, comfortable with most front-end technologies.', 27, 'H', 'M4Y1H5', 3, 7, 0),
    (14, 'Clay pot Making', 'Ever wish for a streaming service with how-to clay videos taught by professional artists? Youve got it with CLAYflicks. Check out our free trial offer! 24/7. The best clay instruction. CLAYflicks. Courses: Wheel Throwing, Handbuilding Pottery, Glazing Pottery', 60, 'J', 'M4Y1H5', 4, 8, 0),
    (15, 'Life Coach', 'Looking for a life coach/support system?
Are you feeling down about life and just lost? Are you ready to transform your health and life?
Would you like to gain energy, confidence and bring that smile back to your face?
Were here to help!
Ill work one on one with you sending positive and inspirational words your way that will get you back on your feet with a positive breakthrough!
Send us a message and we will be more than happy to help you out!', 150, 'D', 'M4Y1H5', 5, 9, 0),
    (16, 'Learn Spanish', 'Native spanish speaker who is fluent in english seeking to help you learn some spanish', 20, 'H', 'M4Y1H5', 6, 10, 0),
    (17, 'Math Tutor', 'Providing Math tutoring for students form grade 8 to 12', 40, 'H', 'M4Y1H5', 7, 11, 0),
    (18, 'Errand Runner', 'Busy? I can run those pesky errands that you have dreading for you!', 15, 'H', 'M4Y1H5', 8, 12, 0),
    (19, 'Home Daycare', 'Soon to be licensed with Building Opportunities Home Child Care Agency

SMOKE FREE HOME
CPR & FIRST AID TRAINED PROVIDER
PLANNED PROGRAM
2 SNACKS 1 LUNCH
HOME FOLLOWS ALL PROVINCIAL HEALTH & SAFETY STANDARDS
SPACIOUS BACKYARD
2-3 UNANNOUNCED VISITS BY THE AGENCY

SLEEP ROOM IS LOCATED ON MAIN FLOOR', 60, 'D', 'M4Y1H5', 9, 13, 0),
    (20, 'Psychic', 'PSYCHIC READINGS
Text -$25
Phone $50
Email $45
In person $90
I make Anulets to attract money,prosperity,success and wealth
I make guard rings to protect you from envy,hex,bad luck ,curses,and more
For help with job,curses or hexes,bad luck,Santeria, witchcraft, voodoo, obeah, and more
Contact mother lola via text,email, or phone', 40, 'J', 'M4Y1H5', 10, 14, 0),
    (21, 'Home Cleaning', 'I prefrom all house cleaning duties, I am highly detailed oriented', 15, 'H', 'M4Y1H5', 11, 15, 0),
    (22, 'Dog Walker', 'Lovely weather, isnt it?
If youd prefer not to slip and slide around the corners, or cant make it home for lunch - let me know and i will walk your pup for you.
Have experience with large breeds, senior dogs, puppies and used to walk "troubled" dogs for the Mississauga Humane society.
One on one walks, unless requested otherwise.', 50, 'H', 'M4Y1H5', 12, 16, 0),
    (23, 'Meal Planner', 'Simplify Meal Planning With Custom Recipes & Easy Grocery Lists To Help You Eat Better. 10-Day Free Trial. Optional Grocery Delivery. Save Time & Reduce Waste. Types: Batch Cooking, Low Carb,, Weight Loss, Clean Eating, Plant-Based, Keto, Paleo.
See How It Works
·
What Sets Us Apart', 400, 'J', 'M4Y1H5', 13, 17, 0),
    (24, 'Personal Trainer', 'I can help you achieve your fitness goals.  I have 5 years of expierence in creating and designing personalized work outs.', 30, 'H', 'M4Y1H5', 14, 18, 0),
    (25, 'Nail technician', 'WEDDING PARTY, BIRTHDAYS, Any SPECIAL DAY or "JUST BECAUSE...." Etc...

Private Home Studio Salon
* Skilled Licensed Nail Technician *

*** Nails Nails Nails ***
Classic Manicure
Coloured Acrylic,
Nail Art / Nail Design / Nail w/Gems
Ombre, Glow in the Dark
Custom Design, Infuzed, encapsulated
Etc...', 40, 'H', 'M4Y1H5', 15, 19, 0),
    (26, 'Dress alterations', 'I have 15 years of clothes alterations and specialize in wedding dresses alterations', 600, 'J', 'M4Y1H5', 16, 20, 0),
    (27, 'Tire Services', 'Need tire care and no time to deal with it? I provide mobile tire care services!', 55, 'H', 'M4Y1H5', 17, 21, 0),
    (28, 'Lawn Care', 'We have availability to help you with your residential / commercial FALL and WINTER maintenance needs!
Be sure to have your yard professionally CLEANED and CLEARED of all your FALL LEAF and TREE DEBRIS!!
We understand and know how to properly CUTBACK your PERENNIALS so they BLOOM PERFECTLY next spring!
Hydrangeas, Hostas, Begonias, Peony, Ornamental Grasses we have the skills to prune trim and cut back each properly!

Quote:', 30, 'H', 'M4Y1H5', 18, 22, 0),
    (29, 'Handy man', 'Handyman:
Maintenance & Improvement
House, Condo, Offices
Painting Indoor & External
Doors and locks, hardware, repairs and installation, trims, baseboard, crown molding, wainscotting, columns,
archways and all carpentry works, shelves and closet design.

Flooring, Stairs, Railings
Ceiling popcorn removal, plastering
Lights fixture, chandeliers, switches, plugs, fans, pot lights....etc.', 25, 'H', 'M4Y1H5', 1, 23, 0),
    (30, 'Electrician', 'Licensed and insured with over 28 years
of experience, I am offering a wide variety of residential and commercial services as:
-generators hook-up ;
-panels upgrade; wiring and rewiring new and old houses;
-changing panels from fuses to breakers
-installing transformers,
-hot tubs hook-up, swimming pools and jacuzzi;
-pot lights, chandeliers, soffit light,
-audio-video, speakers, home theatre, phone and TVs
-trouble-shooting any electrical problem', 45, 'H', 'M4Y1H5', 2, 24, 0),
    (31, 'Full Stack Developer', 'Are you looking to develop a reliable and user-friendly web/mobile app at a low cost?
Are you looking to hire a team of developers at a rate less than hiring a person?

If yes, we are here to help.', 50, 'H', 'M4Y1H5', 4, 25, 0),
    (32, 'Vocal Coach', 'If Singing Is Your Passion, Dont Let It Go! Register To Audition For Frozen Jr. Today! Professional Training And Production. Make Friends And Build Confidence. Unmatched Training. Industry Professionals. Multiple Casts. Many Leading Roles. Services: Singing, Acting, Dancing, Musical Theatre', 55, 'H', 'M4Y1H5', 5, 26, 0),
    (33, 'Learn French', 'Bonjour ! Learning French Can be fun and exciting ! Learn Parisian French with an experienced , professional and knowledgeable teacher from France : Nicolas !

Available for all levels, adults and children, Nicolas is offering private , group lessons or simply conversational French. He is as well very familiar with the needs of children in immersion programs.', 25, 'H', 'M4Y1H5', 6, 27, 0),
    (34, 'Essay writing help', 'Quality Eassy Help with Guaranteed Grade As
Hello, I am offering you the best of the best quality writing services. This I offer according to your budget with around the clock customer service support. Do you have an urgent project? Are you stuck with your project? I am more than ready to assist you with your project. I am a proficient Finance graduate, editor, academic writer, and researcher with over six years writing experience.', 60, 'H', 'M4Y1H5', 7, 28, 0),
    (35, 'Taroat card reading', 'Best Indian Astrologer, Black Magic Removal, Love Spell Caster, Spiritual Healer, Tarot Card Reader, Numerology, Psychic Reading , Clairvoyant, Black Magic Specialist -', 42, 'H', 'M4Y1H5', 10, 29, 0),
    (36, 'Mobile pet groomers', 'Welcome to mutt cutts, we come to you and!', 150, 'j', 'M4Y1H5', 12, 30, 0),
    (37, 'Nutritionist', 'Have speacial dietary needs, need help knowing how to cope and what to eat. let me help you! ', 200, 'j', 'M4Y1H5', 14, 31, 0),
    (38, 'Mobile car detailing ', 'We do mobile detailing Weather permitted at an extra charge of $15 . If you bring your car to the shop  full car detail will cost you $75-$95 ( depending on the size of your vehicle) call  to book an appointment full car detailing includes:
Interior shampooing
Remove floor salt
Remove stain
Shampoo seats and floors
Leather protection
Wash and dry
Engine shampooing
Rims and tire dressing
Door frames', 200, 'j', 'M4Y1H5', 17, 32, 0),
    (39, 'Eye Lash Technician', '*** CLASSIC | VOLUME | HYBRID ***
Located in Mississauga, I specialize in the application of EYE LASH EXTENSIONS & EYE LASH LIFT.
Certified LASH TECH, my mission is to provide my clients with stunning lashes customized for your unique eyes. Serviced exclusively by a licensed technician dedicated to extending your lashes and maintaining the health of your natural lashes by proper lash placement and lash care education.', 300, 'j', 'M4D1H5', 15, 33, 0),
    (40, 'roofing', 'Weve been providing roofing services for many years.
We provide:

-Re-roofing & Repair( Shingled & Flat )
-Soffit, Fascia, Eavestroughs & downspouts
-Siding
-Skylight Installation and Repair

∙Friendly and Courteous Reception
∙Prompt Service
∙Good reputation
∙Quality work
∙Warranty on all finished work
∙15 years labour warranty
∙Prompt return on all call backs
∙24 hour Emergency repair service', 100, 'J', 'M4C1H5', 2, 1, 3),
    (41, 'accounting', 'skilled accounter comes and teaches all you need to manage your business', 50, 'H', 'M4R1H5', 4, 2, 2),
    (42, 'teaching', 'With musical knowledge spanning across many genres, Andrew offers structured and relatable lesson content that inspires and motivates his students to practice. With over a decades worth of teaching experience, Andrew combines his passion for learning, classical music and music technology into every lesson.', 10.5, 'H', 'M4N1H5', 1, 3, 5),
    (43, 'translating', 'My name is Inaza and I am a professional french translator (English-French) from Toronto who also offers French proofreading services. Competitive rates for editing and French proofreading services.', 500, 'D', 'M4T1H5', 6, 4, 0),
    (44, 'developer', 'Im an experienced mobile and web app developer. If you have a good idea or an existing project that needs to be complete, please give me a call.', 90.50, 'H', 'M4A1T5', 3, 5, 0),
    (45, 'mechanic', 'I come to your house and fix your vehicles
I am a apprentice mechanic looking for work
I come and change your snow tires in your driveway save you the hassle of lugging tires around and waiting for appointments
Brakes
Body work
Change tires
Oil changes
Wheel bearrings
And much more
Please contact for any inquiry
Thanks', 60, 'J', 'M5Y1H5', 8, 6, 0),
    (46, 'flooring', 'If you are looking to get your flooring installed you came to the right place, I can assure you we are the best at what we do and we back that up with a 1 year workmanship guarantee. We are professional installers who are fully insured and take great pride in all of our work. Do not hesitate to call for any questions or for a Free Estimate', 20, 'J', 'M4K1H5', 2, 7, 0),
    (47, 'law', 'WE ONLY PRACTICE FAMILY LAW AND CRIMINAL LAW:

Family law handles domestic matters involving partners, spouses, and children. Review the major legal issues related to family law, and learn how a family law attorney can help. We handle each Family Law case with compassion. The best interest of your children is our #1 priority. We specialize in the following:
-Divorce Contested/Uncontested
-Child Custody Access Rights
-Spousal Support Child Support', 450.80, 'H', 'M4C1L5', 5, 8, 0),
    (48, 'cleaning', 'I have a cleaning business I will clean your house at any time of the day. Ima available 7days a week. I live Scarborough , and will work around Scarborough. Any more information please call for inquiries!', 250, 'D', 'M4M1H5', 1, 9, 0),
    (49, 'dancing', 'Im looking for male or female those interested to learn Salsa dancing. Age group around 45 to 60 years.
It is in Mississauga, $10/- for a class. It is on Thursday and Friday...After 7.30 onward....Interested contact with your cell number ASAP.', 20, 'D', 'M4N1H5', 4, 10, 0),
    (50, 'painting', 'We are WSIB Compliant, have $5 million liability insurance, are CERTIFIED PAINTERS.

From older houses that require plastering, to new custom builds. We do it all. We are punctual, clean, and professional.

How does it work?

1. We provide you with a quote and timeline to start project, once agreed, you make paint colour selection.

2. We come on the day agreed upon, completely cover the work area, and finish the project with a crew of professional painters.

3. Upon completion, we tidy up the area and leave the work area nice and clean.

We do not just paint your walls, we also fix cracks and holes, sand it and use only PREMIUM VOC-Free acrylic paint.

We can spray paint, stain, varnish, seal, roll, and have superior straight edge brush cutting. We also provide exterior painting services.', 160, 'J', 'M4F1L5', 2, 11, 0),
    (51, 'Plumber', 'Plumber Licensed & Insured
Commerical and Residential
OUR SERVICES
We provide Plumbing Services
One Year Warranty on All Job
* Specialized Basement Underground Rough in (washroom, laundry, Kicthen, City Inpection no problem)
* Basement Unit Spliter
* Sprinker
* Tank Mixing Valave
* Custom house Plumbing
* Commercial Plumbing job
* New Laundry
* Sump Pump
* Replace copper pipe to pex', 45.50, 'H', 'M4G1H5', 2, 12, 0),
    (52, 'Front-end Developer', 'Web developer with 3 years experience, comfortable with most front-end technologies.', 27, 'H', 'M4H1H5', 3, 13, 0),
    (53, 'Clay pot Making', 'Come learn how to make your own custom clay pots', 60, 'J', 'M4I1H5', 4, 14, 0),
    (54, 'Life Coach', 'Gentlemen!
Do You Want To Improve Your Dating Life And Meet More Women?
Do you want to go on more dates?

Imagine this: You simply walk up to any girl that catches your eye, and youll know exactly what to say. Youll never be at a loss for words, and you wont be nervous. In minutes youll be walking away with her number and a good chance of seeing her later that week, or even later that same night! Let me teach you how.', 150, 'D', 'M4J1H5', 5, 15, 0),
    (55, 'Learn Spanish', 'Native spanish speaker who is fluent in english seeking to help you learn some spanish', 20, 'H', 'M4K1H5', 6, 16, 0),
    (56, 'Math Tutor', 'I graduated at the top of the Gifted Education Program in Ontario all through university (U of T Physics).

You will find that Im not your average tutor. Im able to connect with people and explain things MUCH better and simpler. I understand why things seem hard, and I make them easy.

If that is what you are in need of then let me share my gift with you.
Leave a number at which you can be reached.', 40, 'H', 'M4L1H5', 7, 17, 0),
    (57, 'Errand Runner', 'Busy? I can run those pesky errands that you have dreading for you!', 15, 'H', 'M4M1H5', 8, 18, 0),
    (58, 'Home Daycare', 'I run a home daycare, I have my ECE license and have 5 years expierence of child care services', 60, 'D', 'M4N1T5', 9, 19, 0),
    (59, 'Home Daycare', 'I run a home daycare, I have my ECE license and have 5 years expierence of child care services', 60, 'D', 'M4P1H5', 9, 20, 0),
    (60, 'Psychic', 'Curious about what lies ahead, come and see me so we can discover it', 40, 'J', 'M4C4V4', 10, 33, 0),
    (61, 'Home Cleaning', 'I prefrom all house cleaning duties, I am highly detailed oriented', 15, 'H', 'M4C4X2', 11, 32, 0),
    (62, 'Dog Walker', 'I am an animal lover and more specifically a dog lover, so let me walk your dog!', 50, 'H', 'M4C4X3', 12, 31, 0),
    (63, 'Meal Planner', 'I help design and prepare meal plans for a variety of dietary needs!', 400, 'J', 'M4C4X4', 13, 30, 0),
    (64, 'Personal Trainer', 'I can help you achieve your fitness goals.  I have 5 years of expierence in creating and designing personalized work outs.', 30, 'H', 'M4C4X5', 14, 29, 0),
    (65, 'Nail technician', 'I am a nail artist, i do acrylic and gel nails', 40, 'H', 'M4C4X6', 15, 28, 0),
    (66, 'Dress alterations', 'I have 15 years of clothes alterations and specialize in wedding dresses alterations', 600, 'J', 'M4C4X7', 16, 27, 0),
    (67, 'Tire Services', 'Need tire care and no time to deal with it? I provide mobile tire care services!', 55, 'H', 'M4C4Y4', 17, 26, 0),
    (68, 'Lawn Care', 'I provide you with all your lawn care needs, will water and treat your lawn for all its needs', 30, 'H', 'M4C4Y5', 18, 25, 0),
    (69, 'Handy man', 'I provide simple home repairs for a low price!', 25, 'H', 'M4C4Y6', 1, 24, 0),
    (70, 'Electrician', 'Licensed electrician with 5 years experience.', 45, 'H', 'M4C4Y7', 2, 23, 0),
    (71, 'Full Stack Developer', 'You can fulfil all of your web design and developments needs.', 50, 'H', 'M4C4Y8', 4, 22, 0),
    (72, 'Vocal Coach', 'Trained professioanl vocal coach ', 55, 'H', 'M4C5A7', 5, 21, 0),
    (73, 'Learn French', 'Let me help you improve your french language skills', 25, 'H', 'M1R0E9', 6, 20, 0),
    (74, 'Essay writing help', 'Let me help you write those annoying essays!', 60, 'H', 'M3C0C1', 7, 19, 0),
    (75, 'Taroat card reading', 'Dont know what the future has in store for you?  Well I do!', 42, 'H', 'M3C0C2', 10, 18, 0),
    (76, 'Mobile pet groomers', 'Welcome to mutt cutts, we come to you and!', 150, 'j', 'M3C0E3', 12, 17, 0),
    (77, 'Nutritionist', 'Have speacial dietary needs, need help knowing how to cope and what to eat. let me help you! ', 200, 'j', 'M3C0E4', 14, 16, 0),
    (78, 'Mobile car detailing ', 'WE come to you and detail your car.  We use the safest products that produce teh best results!', 200, 'j', 'M3C0H9', 17, 15, 0),
    (79, 'Eye Lash Technician', '3 years experience in making your eyes pop!', 300, 'j', 'M3C0L8', 15, 14, 0);

INSERT INTO Review
    (review,score,UserId,SkillId)
VALUES
    ('he was late but job was good', 3, 1, 1),
    ('thank you sir', 3, 1, 1),
    ('i love this web site', 3, 1, 1),
    ('amazing job', 5, 2, 3),
    ('thank you so much', 5, 3, 3),
    ('i dont know', 2, 4, 2),
    ('not good', 2, 1, 2),
    ('wouldnot recomend', 2, 1, 2);