import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  
  @Entity()
  export class Offer {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    hidden: boolean = false;
  
    @Column()
    amount: number;
  
    @ManyToOne(() => Wish, (wish) => wish.offers)
    item: Wish;  
    
    @ManyToOne(() => User, (user) => user.offers)
    user: User;
  
    @CreateDateColumn()
     createdAt: Date;
  
     @UpdateDateColumn()
     updatedAt: Date;
  }