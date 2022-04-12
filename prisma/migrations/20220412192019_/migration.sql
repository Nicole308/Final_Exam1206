-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "listID" INTEGER,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_listID_fkey" FOREIGN KEY ("listID") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;
