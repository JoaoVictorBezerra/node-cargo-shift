import { ClientRepository } from '../repositories';
import { v4 as uuidv4 } from 'uuid';
import { ContainerRepository } from '../repositories/container-repository';
import { BusinessException } from '../exceptions';

export class ClientService {
  protected clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  async create(name: string) {
    const exists = await this.clientRepository.findByName(name);

    if (exists) {
      throw new BusinessException(409, 'Client already exists');
    }

    const client = {
      id: uuidv4(),
      name: name,
    };
    return await this.clientRepository.create(client);
  }

  async findById(id: string) {
    return await this.clientRepository.findById(id);
  }

  async findByName(name: string) {
    console.log(name);
    return await this.clientRepository.findByName(name);
  }

  async findAll() {
    return await this.clientRepository.findAll();
  }

  async delete(id: string) {
    const containerRepository = new ContainerRepository();

    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new BusinessException(400, 'Client not found');
    }

    const containers = await containerRepository.findByClientId(id);
    if (containers.length > 0) {
      throw new BusinessException(
        409,
        'You cannot delete a client with containers',
      );
    }

    return await this.clientRepository.delete(id);
  }

  async update(id: string, name: string) {
    const nameAlreadyExists = await this.clientRepository.findByName(name);

    if (nameAlreadyExists) {
      throw new BusinessException(409, 'Client already exists');
    }

    return await this.clientRepository.update(id, name);
  }
}
