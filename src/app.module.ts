import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Offer } from './offers/entities/offer.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { Wish } from './wishes/entities/wish.entity';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'nest_project',
      schema: 'nest_project',
      entities: [User, Offer, Wish, Wishlist],
      synchronize: true,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
