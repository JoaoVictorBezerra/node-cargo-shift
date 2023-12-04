import { Container } from '@prisma/client';
import { prismaClient } from '../lib/prisma';

export class ContainerRepository {
  async findByContainerNumber(container: string) {
    return await prismaClient.container.findUnique({
      where: {
        container: container,
      },
      include: {
        client: true,
      },
    });
  }

  async findById(idContainer: string) {
    return await prismaClient.container.findUnique({
      where: {
        id: idContainer,
      },
      include: {
        client: true,
      },
    });
  }

  async findByClientId(clientId: string) {
    return await prismaClient.container.findMany({
      where: {
        clientId: clientId,
      },
      include: {
        client: true,
      },
    });
  }

  async create(container: Container) {
    await prismaClient.container.create({
      data: container,
    });
    return this.findByContainerNumber(container.container);
  }

  async findAll() {
    return await prismaClient.container.findMany({
      include: {
        client: true,
      },
    });
  }

  async delete(containerId: string) {
    await prismaClient.container.delete({
      where: { id: containerId },
    });
  }

  async update(containerId: string, container: Container) {
    return await prismaClient.container.update({
      where: { id: containerId },
      data: container,
    });
  }
}
