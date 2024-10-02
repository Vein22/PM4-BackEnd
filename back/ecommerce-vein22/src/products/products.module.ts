import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { ProductsService } from "./products.service";

@Module({
    providers: [ProductsService, ProductsRepository],
    controllers: [ProductsController]
})
export class ProductsModule {}