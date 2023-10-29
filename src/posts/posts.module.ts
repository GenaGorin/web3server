import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Post } from "./post.model";
import { FilesModule } from "../files/files.module";
import { AuthModule } from 'src/auth/auth.module';


@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Post]),
    FilesModule,
    forwardRef(() => AuthModule),
  ]
})
export class PostsModule { }