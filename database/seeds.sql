/*Automatic execution when the server starts up on the development enviroment */

-- /*test data*/
INSERT INTO User 
(id,firstName,lastName,email,password,zipCode,image)
VALUES 
(1,'Carol','Cavalcanti','carolinapc@gmail.com','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra','M4Y1H5','profile_1.jpg'),
(2,'John','Doe','user1','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'profile_2.jpg'),
(3,'Mary','Jane','user2','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'profile_3.jpg'),
(4,'Frank','Russel','user3','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,'profile_4.jpg'),
(5, 'Maggie', 'MacVey', 'user4', '$2b$10$odgCqiMprJfgLJPGXiLS4eCbr0dQYXIVSuxFHsZT76ismKyzyXfiy', null, 'profile_5.jpg' );

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
(17, 'Auto Services', 'mechanic.jpg');


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
(11,'painting','painter team reasonable and fast jobs',160,'J','M4Y1H5',2,1,0);


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