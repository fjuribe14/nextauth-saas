/*
  Warnings:

  - A unique constraint covering the columns `[email,client_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_email_client_id_idx";

-- CreateIndex
CREATE UNIQUE INDEX "user_email_client_id_key" ON "user"("email", "client_id");
