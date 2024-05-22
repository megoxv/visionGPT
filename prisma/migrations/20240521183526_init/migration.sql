-- AlterTable
ALTER TABLE "users" ADD COLUMN "creditBalance" INTEGER;

-- CreateTable
CREATE TABLE "transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripeId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "plan" TEXT,
    "credits" INTEGER,
    "buyerId" TEXT,
    CONSTRAINT "transactions_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_stripeId_key" ON "transactions"("stripeId");
