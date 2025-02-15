import { Module } from "@nestjs/common";
import { HashService } from "./services/hash.service";
import { PaginationService } from "./services/pagination.service";

@Module({
    providers: [HashService, PaginationService],
    exports: [HashService, PaginationService],
})
export class CommonModule {}