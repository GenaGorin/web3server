import { Body, Controller, Post, UploadedFile, UseInterceptors, Get, UseGuards, Req } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

interface CustomRequest extends Request {
    user: {
        id: number;
        email: string;
    }
}

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtAuthGuard)
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image, @Req() req: CustomRequest) {
        return this.postService.create(dto, image, req.user.id);
    }

    @Get()
    getPosts() {
        return this.postService.getPosts();
    }
}
