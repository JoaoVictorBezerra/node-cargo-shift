import { CreateClientRequest } from '../entities';
import { prismaClient } from '../lib/prisma';

export class ClientRepository {
  async findById(id: string) {
    return await prismaClient.client.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByName(name: string) {
    return await prismaClient.client.findFirst({
      where: {
        name: name,
      },
    });
  }

  async findAll() {
    return await prismaClient.client.findMany();
  }

  async create(client: CreateClientRequest) {
    return await prismaClient.client.create({
      data: {
        name: client.name,
        id: client.id,
      },
    });
  }

  async delete(id: string) {
    return await prismaClient.client.delete({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, name: string) {
    return await prismaClient.client.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }
}
