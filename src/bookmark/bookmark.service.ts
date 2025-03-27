<<<<<<< HEAD
import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import {
    CreateBookmarkDto,
    EditBookmarkDto,
  } from './dto';
  
  @Injectable()
  export class BookmarkService {
    constructor(private prisma: PrismaService) {}
  
    getBookmarks(userId: number) {
      return this.prisma.bookmark.findMany({
        where: {
          userId,
        },
      });
    }
  
    getBookmarkById(
      userId: number,
      bookmarkId: number,
    ) {
      return this.prisma.bookmark.findFirst({
        where: {
          id: bookmarkId,
          userId,
        },
      });
    }
  
    async createBookmark(
      userId: number,
      dto: CreateBookmarkDto,
    ) {
      const bookmark =
        await this.prisma.bookmark.create({
          data: {
            userId,
            ...dto,
          },
        });
  
      return bookmark;
    }
  
    async editBookmarkById(
      userId: number,
      bookmarkId: number,
      dto: EditBookmarkDto,
    ) {
      // get the bookmark by id
      const bookmark =
        await this.prisma.bookmark.findUnique({
          where: {
            id: bookmarkId,
          },
        });
  
      // check if user owns the bookmark
      if (!bookmark || bookmark.userId !== userId)
        throw new ForbiddenException(
          'Access to resources denied',
        );
  
      return this.prisma.bookmark.update({
        where: {
          id: bookmarkId,
        },
        data: {
          ...dto,
        },
      });
    }
  
    async deleteBookmarkById(
      userId: number,
      bookmarkId: number,
    ) {
      const bookmark =
        await this.prisma.bookmark.findUnique({
          where: {
            id: bookmarkId,
          },
        });
  
      // check if user owns the bookmark
      if (!bookmark || bookmark.userId !== userId)
        throw new ForbiddenException(
          'Access to resources denied',
        );
  
      await this.prisma.bookmark.delete({
        where: {
          id: bookmarkId,
        },
      });
    }
  }
=======
import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
  async deleteBookmarkById(userId: number, bookmarkId: number) {
    try {
      const bookmark = await this.prisma.bookmark.findUnique({
        where: { id: bookmarkId },
      });

      if (!bookmark || bookmark.userId !== userId) {
        throw new ForbiddenException('Access to resource denied');
      }

      await this.prisma.bookmark.delete({
        where: { id: bookmarkId },
      });

      return { message: 'Bookmark deleted successfully' };
    } catch (error) {
      console.error('Error deleting bookmark:', error.message);
      throw new InternalServerErrorException('Failed to delete bookmark');
    }
  }
}
>>>>>>> 6bcfb262e57f216b58b1251b43670ff842f23284
