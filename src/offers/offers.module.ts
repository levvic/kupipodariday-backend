import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';

@Module({
  providers: [OffersService],
  controllers: [OffersController],
  imports: [TypeOrmModule.forFeature([Offer]), OffersModule],
})
export class OffersModule {}
