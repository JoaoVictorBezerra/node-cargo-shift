-- CreateEnum
CREATE TYPE "ContainerStatus" AS ENUM ('EMPTY', 'STUFFED');

-- CreateEnum
CREATE TYPE "ContainerHandlingType" AS ENUM ('GATE_IN', 'GATE_OUT', 'WEIGHING', 'LOADING', 'UNLOADING', 'REPOSITIONING');

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Container" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "container" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "status" "ContainerStatus" NOT NULL,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContainerHandling" (
    "id" TEXT NOT NULL,
    "containerId" TEXT NOT NULL,
    "type" "ContainerHandlingType" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContainerHandling_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Container_container_key" ON "Container"("container");

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerHandling" ADD CONSTRAINT "ContainerHandling_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "Container"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
