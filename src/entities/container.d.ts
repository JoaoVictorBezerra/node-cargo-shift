import { ContainerStatus } from '@prisma/client';

export interface CreateContainerRequest {
  clientId: string;
  container: string;
  type: number;
  status: ContainerStatus;
}
