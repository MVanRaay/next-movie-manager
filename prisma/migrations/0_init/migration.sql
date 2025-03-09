-- CreateTable
CREATE TABLE "genre" (
    "genre_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "movie" (
    "movie_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "year" INTEGER,
    "rating" REAL,
    "genre_id" INTEGER,
    CONSTRAINT "movie_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genre" ("genre_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

