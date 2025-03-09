import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super(); // Chama o construtor de PrismaClient
     }
   async onModuleInit() {
      await this.$connect();
   }

   async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as Parameters<PrismaClient['$on']>[0], async () => {
        await app.close();
     });
   }
}