import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}

    @Get()
    async getBookmarks(@GetUser('id') userId: number) {
        try {
            return await this.bookmarkService.getBookmarks(userId);
        } catch (error) {
            console.error('Error fetching bookmarks:', error.message);
            throw new InternalServerErrorException('Failed to fetch bookmarks');
        }
    }

    @Get(':id')
    async getBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number
    ) {
        try {
            return await this.bookmarkService.getBookmarkById(userId, bookmarkId);
        } catch (error) {
            console.error('Error fetching bookmark by ID:', error.message);
            throw new InternalServerErrorException('Failed to fetch bookmark by ID');
        }
    }

    @Post()
    async createBookmark(
        @GetUser('id') userId: number,
        @Body() dto: CreateBookmarkDto
    ) {
        try {
            return await this.bookmarkService.createBookmark(userId, dto);
        } catch (error) {
            console.error('Error creating bookmark:', error.message);
            throw new InternalServerErrorException('Failed to create bookmark');
        }
    }

    @Patch(':id')
    async editBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() dto: EditBookmarkDto
    ) {
        try {
            return await this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
        } catch (error) {
            console.error('Error editing bookmark:', error.message);
            throw new InternalServerErrorException('Failed to edit bookmark');
        }
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number
    ) {
        try {
            return await this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
        } catch (error) {
            console.error('Error deleting bookmark:', error.message);
            throw new InternalServerErrorException('Failed to delete bookmark');
        }
    }
}
