-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prefix" TEXT
);

-- CreateTable
CREATE TABLE "Plugin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GuildToPlugin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Plugin" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_id_key" ON "Guild"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Plugin_id_key" ON "Plugin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Plugin_name_key" ON "Plugin"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_GuildToPlugin_AB_unique" ON "_GuildToPlugin"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildToPlugin_B_index" ON "_GuildToPlugin"("B");
