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
(1,'Skill 1','Description of Skill 1',100,'J','M4Y1H5',1,1,3),
(2,'Skill 2','Description of Skill 2',50,'H','M4Y1H5',1,2,2),
(3,'Skill 3','Description of Skill 3',10.5,'H','M4Y1H5',1,2,5),
(4,'Skill 4','Description of Skill 4',500,'D','M4Y1H5',3,2,0),
(5,'Skill 5','Description of Skill 5',90.50,'H','M4Y1H5',3,1,0),
(6,'Skill 6','Description of Skill 6',60,'J','M4Y1H5',5,1,0),
(7,'Skill 7','Description of Skill 7',5000,'J','M4Y1H5',3,1,0),
(8,'Skill 8','Description of Skill 8',45.80,'H','M4Y1H5',6,1,0),
(9,'Skill 9','Description of Skill 9',349,'D','M4Y1H5',6,2,0),
(10,'Skill 10','Description of Skill 10',400,'D','M4Y1H5',6,1,0),
(11,'Skill 11','Description of Skill 11',160,'J','M4Y1H5',3,1,0);


INSERT INTO Review
(review,score,UserId,SkillId)
VALUES
('Review 1 comment',3,1,1),
('Review 2 comment',3,1,1),
('Review 3 comment',3,1,1),
('Review 4 comment',5,2,3),
('Review 5 comment',5,3,3),
('Review 6 comment',2,4,2),
('Review 7 comment',2,1,2),
('Review 8 comment',2,1,2);