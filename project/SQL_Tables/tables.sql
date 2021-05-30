

-- users table create


--CREATE TABLE [dbo].[Users](
--	[user_id] [int] Primary key default NEWID(),
--	[username] [varchar](30) NOT NULL UNIQUE,
--	[password] [varchar](300) NOT NULL,
--	[firstname] [varchar](30) ,
--	[lastname] [varchar](30) ,
--	[country] [varchar](30) ,
--	[email] [varchar](80),
--);







-- games table create

-- Create a new table called 'Games' in schema 'dbo'
-- Drop the table if it already exists
--IF OBJECT_ID('dbo.Games', 'U') IS NOT NULL
--DROP TABLE dbo.Games
--GO
-- Create the table in the specified schema
--CREATE TABLE dbo.Games
--(
--	[game_id] [INT] IDENTITY(1,1) Primary key,
--	[date] [datetime] NOT NULL,
--	[homeTeamId] [INT] NOT NULL,
--	[awayTeamId] [INT] NOT NULL,
--	[homeTeamScore] [INT],
--	[awayTeamScore] [INT],
--  [stadium] [varchar](50) NOT NULL
--  [referee] [varchar](50)
--);
--GO



-- favoritesgames table create

-- Create a new table called 'FavoriteGames' in schema 'dbo'
-- Drop the table if it already exists
--IF OBJECT_ID('dbo.FavoriteGames', 'U') IS NOT NULL
--DROP TABLE dbo.FavoriteGames
--GO
-- Create the table in the specified schema
--CREATE TABLE dbo.FavoriteGames
--(
--	[FavoriteGame_id] [INT] IDENTITY(1,1) Primary key,
--	[user_id] [datetime] NOT NULL,
--	[game_id] [INT] NOT NULL,
  --  FOREIGN KEY(game_id) REFERENCES Games(game_id)
--);
--GO








-- Create a new table called 'FavoriteGames' in schema 'dbo'
-- Drop the table if it already exists
--IF OBJECT_ID('dbo.FavoriteGames', 'U') IS NOT NULL
--DROP TABLE dbo.FavoriteGames
--GO
-- Create the table in the specified schema
--CREATE TABLE dbo.FavoriteGames
--(
--    [FavoriteGameId] INT NOT NULL PRIMARY KEY, -- primary key column
--    [UsersId] [uniqueidentifier] NOT NULL,
--    [game_id] [uniqueidentifier] NOT NULL
--    FOREIGN KEY(game_id) REFERENCES Games(game_id)
--);
--GO







-- --Insert rows into table 'Games'
-- INSERT INTO Games
-- ( -- columns to insert data into
-- [date], [homeTeamId], [awayTeamId], [homeTeamScore], [awayTeamScore], [stadium]
-- )
-- VALUES
-- ( -- first row: values for the columns in the list above
-- '2022-05-27 19:00:00' , 939, 830, 2, 0, 'blabla'
-- ),
-- ( -- second row: values for the columns in the list above
-- '2023-05-27 19:01:00', 565, 939, 1, 1, 'Erev Tov'
-- ),
-- (
-- '2022-05-28 16:00:00', 830, 565, 4, 2, 'Erev Hara'
-- )
-- --add more rows here
-- GO