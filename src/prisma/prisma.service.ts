import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Conectado ao banco de dados MongoDB.');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados MongoDB:', error);
    }
  }
}
