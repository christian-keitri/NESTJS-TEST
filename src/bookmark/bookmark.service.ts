import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { title } from 'process';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  // Get all bookmarks for a user
  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  // Get a bookmark by ID for a user
  getBookmarkById(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
  }

  // Create a new bookmark for a user
  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });
    return bookmark;
  }

  // Edit a bookmark by ID for a user
  async editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
    // Get the bookmark by ID
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    // Check if the user owns the bookmark
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    // Update the bookmark if user owns it
    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  // Delete a bookmark by ID for a user
  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    // Check if the bookmark exists and if the user owns it
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    // Delete the bookmark if user owns it
    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });

    return { message: 'Bookmark deleted successfully' }; // Return a success message
  }
}
