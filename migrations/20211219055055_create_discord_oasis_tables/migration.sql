-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "prefix" TEXT,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plugin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Plugin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GuildToPlugin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
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

-- AddForeignKey
ALTER TABLE "_GuildToPlugin" ADD FOREIGN KEY ("A") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuildToPlugin" ADD FOREIGN KEY ("B") REFERENCES "Plugin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
