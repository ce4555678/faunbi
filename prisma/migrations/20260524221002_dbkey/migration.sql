-- CreateTable
CREATE TABLE "dbkey" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "dbkey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dbkey_userId_key" ON "dbkey"("userId");

-- AddForeignKey
ALTER TABLE "dbkey" ADD CONSTRAINT "dbkey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
