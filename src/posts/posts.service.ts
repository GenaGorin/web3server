import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postRepository: typeof Post,
        private filesService: FilesService) {

    }
    async create(dto: CreatePostDto, image: any, userId: number) {
        console.log('userId', userId);

        const fileName = await this.filesService.createFile(image);
        const post = await this.postRepository.create({ ...dto, image: fileName, userId: userId });
        return post;
    }

    async getPosts() {
        const posts = await this.postRepository.findAll();
        return posts;
    }
}
