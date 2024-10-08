import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm"
import { Product } from "./entities/product.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductsService, ProductsRepository],
    controllers: [ProductsController],
    exports: [ProductsService, ProductsRepository],
})
export class ProductsModule {}