/*
  Warnings:

  - You are about to drop the `user_on_message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `room_id` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_on_message" DROP CONSTRAINT "user_on_message_messageId_fkey";

-- DropForeignKey
ALTER TABLE "user_on_message" DROP CONSTRAINT "user_on_message_userId_fkey";

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "room_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "user_on_message";

-- CreateTable
CREATE TABLE "client_to_user" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_to_user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_to_user" ADD CONSTRAINT "client_to_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
