import { Container, ContainerStatus } from '@prisma/client';
import { CreateContainerRequest } from '../entities/container';
import { ContainerRepository } from '../repositories/container-repository';
import { v4 as uuidv4 } from 'uuid';
import { BusinessException } from '../exceptions';
import { HttpStatusCode } from '../constants';

export class ContainerService {
  protected containerRepository: ContainerRepository;

  constructor() {
    this.containerRepository = new ContainerRepository();
  }

  async create(createContainerRequest: CreateContainerRequest) {
    const containerRegex = /^[A-Z]{4}-\d{7}$/;
    if (containerRegex.test(createContainerRequest.container) === false) {
      throw new BusinessException(
        HttpStatusCode.CONFLICT,
        'Container must have the following format: AAAA-1234567',
      );
    }

    const containerAlreadyExistis =
      await this.containerRepository.findByContainerNumber(
        createContainerRequest.container,
      );

    if (
      createContainerRequest.status != ContainerStatus.EMPTY &&
      createContainerRequest.status != ContainerStatus.STUFFED
    ) {
      throw new BusinessException(
        HttpStatusCode.CONFLICT,
        'Container status must be EMPTY or STUFFED',
      );
    }

    if (containerAlreadyExistis !== null) {
      throw new BusinessException(
        HttpStatusCode.CONFLICT,
        'Container already exists',
      );
    }

    const container: Container = {
      id: uuidv4(),
      ...createContainerRequest,
    };

    return await this.containerRepository.create(container);
  }

  async delete(containerId: string) {
    const containerToBeDeleted =
      await this.containerRepository.findById(containerId);

    if (containerToBeDeleted === null) {
      throw new BusinessException(
        HttpStatusCode.NOT_FOUND,
        'Container not found',
      );
    }

    // TODO: Adicionar verificação se existe alguma movimentação com esse container.

    return await this.containerRepository.delete(containerId);
  }

  async findById(containerId: string) {
    const container = await this.containerRepository.findById(containerId);

    if (container === null) {
      throw new BusinessException(
        HttpStatusCode.NOT_FOUND,
        'Container not found',
      );
    }

    return container;
  }

  async findAll() {
    return await this.containerRepository.findAll();
  }

  async update(containerId: string, container: CreateContainerRequest) {
    const containerToUpdate =
      await this.containerRepository.findById(containerId);

    if (containerToUpdate === null) {
      throw new BusinessException(
        HttpStatusCode.NOT_FOUND,
        'Container not found',
      );
    }

    const newContainer: Container = {
      id: containerId,
      ...container,
    };

    return await this.containerRepository.update(containerId, newContainer);
  }

  async findByContainerNumber(containerNumber: string) {
    const container =
      await this.containerRepository.findByContainerNumber(containerNumber);

    if (container === null) {
      throw new BusinessException(
        HttpStatusCode.NOT_FOUND,
        'Container not found',
      );
    }

    return container;
  }
}
