import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  // Get all bookmarks for a user
  async getBookmarks(userId: number) {
    try {
      return await this.prisma.bookmark.findMany({
        where: { userId },
      });
    } catch (error) {
      console.error('Error fetching bookmarks:', error.message);
      throw new InternalServerErrorException('Failed to fetch bookmarks');
    }
  }

  // Get a bookmark by ID for a user
  async getBookmarkById(userId: number, bookmarkId: number) {
    try {
      return await this.prisma.bookmark.findFirst({
        where: { id: bookmarkId, userId },
      });
    } catch (error) {
      console.error('Error fetching bookmark by ID:', error.message);
      throw new InternalServerErrorException('Failed to fetch bookmark by ID');
    }
  }

  // Create a new bookmark for a user
  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    try {
      return await this.prisma.bookmark.create({
        data: { userId, ...dto },
      });
    } catch (error) {
      console.error('Error creating bookmark:', error.message);
      throw new InternalServerErrorException('Failed to create bookmark');
    }
  }

  // Edit a bookmark by ID for a user
  async editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
    try {
      const bookmark = await this.prisma.bookmark.findUnique({
        where: { id: bookmarkId },
      });

      if (!bookmark || bookmark.userId !== userId) {
        throw new ForbiddenException('Access to resource denied');
      }

      return await this.prisma.bookmark.update({
        where: { id: bookmarkId },
        data: { ...dto },
      });
    } catch (error) {
      console.error('Error editing bookmark:', error.message);
      throw new InternalServerErrorException('Failed to edit bookmark');
    }
  }

  // Delete a bookmark by ID for a user
  async deleteBookmarkById(userId: number, bookmarkId: number): Promise<void> {
    try {
      console.log('Attempting to delete bookmark:', { userId, bookmarkId });

      const bookmark = await this.prisma.bookmark.findUnique({
        where: { id: bookmarkId },
      });
      console.log('Bookmark fetched:', bookmark);

      if (!bookmark) {
        console.warn('Bookmark not found:', { bookmarkId });
        throw new NotFoundException('Bookmark not found');
      }
      if (bookmark.userId !== userId) {
        console.warn('Unauthorized access to bookmark:', { userId, bookmarkId });
        throw new ForbiddenException('Access to resource denied');
      }

      await this.prisma.bookmark.delete({
        where: { id: bookmarkId },
      });
      console.log('Bookmark deleted successfully:', { bookmarkId });
    } catch (error) {
      console.error('Error deleting bookmark:', error.message, error.stack);
      throw new InternalServerErrorException('Failed to delete bookmark');
    }
  }
}
