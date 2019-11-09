/*Automatic execution when the server starts up on the development enviroment */

-- /*test data*/
INSERT INTO User 
(id,firstName,lastName,email,password,zipCode,image)
VALUES 
(1,'Carol','Cavalcanti','carolinapc@gmail.com','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra','M4Y1H5','profile_1.jpg'),
(2,'John','Doe','user1','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'profile_2.jpg'),
(3,'Mary','Jane','user2','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'profile_3.jpg'),
(4,'Frank','Russel','user3','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'profile_4.jpg'),
(5, 'Maggie', 'MacVey', 'maggimacvey7@gmail.com', '$2b$10$odgCqiMprJfgLJPGXiLS4eCbr0dQYXIVSuxFHsZT76ismKyzyXfiy', null, 'profile_5.jpg' ),
(6,'Angie','Dob','user4','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'angieprofile.jpg'),
(7,'Jenn','Siggy','user5','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'jennprofile.jpg'),
(8,'Jeremy','Delzo','user6','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'jeremyprofile.jpg'),
(9,'Sam','McK','user7','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'samprofile.jpg'),
(10,'Amanda','Dob','user8','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'amandaprofile.jpg'),
(11,'Matty','Bort','user9','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'mattprofile.jpg'),
(12,'Andy','Jam','user10','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'andyprofile.jpg'),
(13,'Jordan','Caddle','user11','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'jordanprofile.jpg'),
(14,'Andrew','Harden','user12','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'hardyprofile.jpg'),
(15,'Emily','Lem','user13','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'emilyprofile.jpg'),
(16,'Rachael','G','user14','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'rachaelprofile.jpg'),
(17,'Alex','Alto','user15','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'alexprofile.jpg'),
(18,'Robyn','Bird','user16','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'robynprofile.jpg'),
(19,'Anna','Jan','user17','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'annaprofile.jpg'),
(20,'Veronika','Trolley','user18','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'veronikaprofile.jpg'),
(21,'Alexis','Amb','user19','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'alexisprofile.jpg'),
(22,'Jay','Beach','user20','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'jayprofile.jpg'),
(23,'Kallvis','Sew','user21','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'kallvisprofile.jpg'),
(24,'Julien','Craig','user22','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'julienprofile.jpg'),
(25,'Jorge','Mex','user23','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'jorgeprofile.jpg'),
(26,'Kevin','Kevon','user24','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'kevinprofile.jpg'),
(27,'Melissa','Lima','user25','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'melissaprofile.jpg'),
(28,'Mike','Carlo','user26','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'mikeprofile.jpg'),
(29,'Stefanie','Barr','user27','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'stefanieprofile.jpg'),
(30,'Phoenix','Pink','user28','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'phoenixprofile.jpg'),
(31,'Sandra','Rose','user29','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'sandraprofile.jpg'),
(32,'Tara','Wells','user30','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'taraprofile.jpg'),
(33,'Wade','Edmon','user31','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'wadeprofile.jpg');

INSERT INTO Category 
(id, name, image)
VALUES
(1, 'Handy Work','handyman.jpg'),
(2, 'Home Reno','construction.jpg'),
(3, 'Technology','technology.jpg'),
(4, 'DIY & Arts and Crafts','DIY.jpg'),
(5, 'Coaching','coaching.jpg'),
(6, 'Language','translation.jpg'),
(7, 'Education','education.jpg'),
(8, 'Misc. Errands','errands.jpg'),
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
(id,name,description,price,pricetype,zipcode,CategoryId,UserId,score)
VALUES
(1,'roofing','fast responsible roofers for comming winter',100,'J','M4Y1H5',2,1,3),
(2,'accounting','skilled accounter comes and teaches all you need to manage your business',50,'H','M4Y1H5',4,2,2),
(3,'teaching','math teacher for kids ',10.5,'H','M4Y1H5',1,2,5),
(4,'translating','chinese translater in toronto',500,'D','M4Y1H5',6,2,0),
(5,'developer','software developers make programs ',90.50,'H','M4Y1H5',3,1,0),
(6,'mechanic','we fix your car cheaper,faster,better',60,'J','M4Y1H5',8,1,0),
(7,'flooring','we are experienced flooring group, you will love our job',20,'J','M4Y1H5',2,1,0),
(8,'law','strong lawyers team help you in hard times',450.80,'H','M4Y1H5',5,1,0),
(9,'cleaning','cleaners around GTA',250,'D','M4Y1H5',1,2,0),
(10,'dancing','dance club',20,'D','M4Y1H5',4,1,0),
(11,'painting','painter team reasonable and fast jobs',160,'J','M4Y1H5',2,1,0),
(12,'Plumber','Licensed plumber with 5 years experience',45.50,'H','M4Y1H5',2,6,0),
(13,'Front-end Developer','Web developer with 3 years experience, comfortable with most front-end technologies.',27,'H','M4Y1H5',3,7,0),
(14,'Clay pot Making','Come learn how to make your own custom clay pots',60,'J','M4Y1H5',4,8,0),
(15,'Life Coach','Let me help you find your unlimted potential',150,'D','M4Y1H5',5,9,0),
(16,'Learn Spanish','Native spanish speaker who is fluent in english seeking to help you learn some spanish',20,'H','M4Y1H5',6,10,0),
(17,'Math Tutor','Providing Math tutoring for students form grade 8 to 12',40,'H','M4Y1H5',7,11,0),
(18,'Errand Runner','Busy? I can run those pesky errands that you have dreading for you!',15,'H','M4Y1H5',8,12,0),
(19,'Home Daycare','I run a home daycare, I have my ECE license and have 5 years expierence of child care services',60,'D','M4Y1H5',9,13,0),
(20,'Psychic','Curious about what lies ahead, come and see me so we can discover it',40,'J','M4Y1H5',10,14,0),
(21,'Home Cleaning','I prefrom all house cleaning duties, I am highly detailed oriented',15,'H','M4Y1H5',11,15,0),
(22,'Dog Walker','I am an animal lover and more specifically a dog lover, so let me walk your dog!',50,'H','M4Y1H5',12,16,0),
(23,'Meal Planner','I help design and prepare meal plans for a variety of dietary needs!',400,'J','M4Y1H5',13,17,0),
(24,'Personal Trainer','I can help you achieve your fitness goals.  I have 5 years of expierence in creating and designing personalized work outs.',30,'H','M4Y1H5',14,18,0),
(25,'Nail technician','I am a nail artist, i do acrylic and gel nails',40,'H','M4Y1H5',15,19,0),
(26,'Dress alterations','I have 15 years of clothes alterations and specialize in wedding dresses alterations',600,'J','M4Y1H5',16,20,0),
(27,'Tire Services','Need tire care and no time to deal with it? I provide mobile tire care services!',55,'H','M4Y1H5',17,21,0);
(28,'Lawn Care','I provide you with all your lawn care needs, will water and treat your lawn for all its needs',30,'H','M4Y1H5',18,22,0),
(29,'Handy man','I provide simple home repairs for a low price!',25,'H','M4Y1H5',1,23,0),
(30,'Electrician','Licensed electrician with 5 years experience.',45,'H','M4Y1H5',2,24,0),
(31,'Full Stack Developer','You can fulfil all of your web design and developments needs.',50,'H','M4Y1H5',4,25,0),
(32,'Vocal Coach','Trained professioanl vocal coach ',55,'H','M4Y1H5',5,26,0),
(33,'Learn French','Let me help you improve your french language skills',25,'H','M4Y1H5',6,27,0),
(34,'Essay writing help','Let me help you write those annoying essays!',60,'H','M4Y1H5',7,28,0),
(35,'Taroat card reading','Dont know what the future has in store for you?  Well I do!',42,'H','M4Y1H5',10,29,0),
(36,'Mobile pet groomers','Welcome to mutt cutts, we come to you and!',150,'j','M4Y1H5',12,30,0),
(37,'Nutritionist','Have speacial dietary needs, need help knowing how to cope and what to eat. let me help you! ',200,'j','M4Y1H5',14,31,0),
(38,'Mobile car detailing ','WE come to you and detail your car.  We use the safest products that produce teh best results!',200,'j','M4Y1H5',17,32,0),
(39,'Eye Lash Technician','3 years experience in making your eyes pop!',300,'j','M4Y1H5',15,33,0);


INSERT INTO Review
(review,score,UserId,SkillId)
VALUES
('he was late but job was good',3,1,1),
('thank you sir',3,1,1),
('i love this web site',3,1,1),
('amazing job',5,2,3),
('thank you so much',5,3,3),
('i dont know',2,4,2),
('not good',2,1,2),
('wouldnot recomend',2,1,2);