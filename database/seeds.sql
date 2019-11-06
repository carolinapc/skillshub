/*Automatic execution when the server starts up on the development enviroment */

-- /*test data*/
INSERT INTO User VALUES 
(1,'Carol','Cavalcanti','carolinapc@gmail.com','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra','M4Y1H5',null,5,1,'2019-09-14 14:31:49','2019-09-14 14:32:51'),
(2,'John','Doe','user1','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,null,3,1,'2019-09-14 14:31:49','2019-09-14 14:32:51'),
(3,'Mary','Jane','user2','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,null,3,1,'2019-09-14 14:31:49','2019-09-14 14:32:51'),
(4,'Frank','Russel','user3','$2b$10$fo85sCgXJsNGGC0Sk28d/u5j7TmmjyxgVbETTYzKwKOAEFobJD8Ra',null,null,3,1,'2019-09-14 14:31:49','2019-09-14 14:32:51');

INSERT INTO Category VALUES
(1, 'Maintaning','2019-11-01 12:00:00','2019-11-01 12:00:00'),
(2, 'Construction','2019-11-01 12:00:00','2019-11-01 12:00:00'),
(3, 'Softwares','2019-11-01 12:00:00','2019-11-01 12:00:00'),
(4, 'Training','2019-11-01 12:00:00','2019-11-01 12:00:00'),
(5, 'Consulting','2019-11-01 12:00:00','2019-11-01 12:00:00'),
(6, 'Translating/Interpreter','2019-11-01 12:00:00','2019-11-01 12:00:00'),
(7, 'Teaching','2019-11-01 12:00:00','2019-11-01 12:00:00'),
(8, 'Other','2019-11-01 12:00:00','2019-11-01 12:00:00');

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