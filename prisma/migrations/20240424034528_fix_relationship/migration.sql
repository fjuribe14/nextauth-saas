/*
  Warnings:

  - You are about to drop the `_serviceTouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_serviceTouser" DROP CONSTRAINT "_serviceTouser_A_fkey";

-- DropForeignKey
ALTER TABLE "_serviceTouser" DROP CONSTRAINT "_serviceTouser_B_fkey";

-- DropTable
DROP TABLE "_serviceTouser";

-- CreateTable
CREATE TABLE "user_services" (
    "user_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_services_pkey" PRIMARY KEY ("user_id","service_id")
);

-- AddForeignKey
ALTER TABLE "user_services" ADD CONSTRAINT "user_services_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_services" ADD CONSTRAINT "user_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
