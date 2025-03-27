<<<<<<< HEAD
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException, Logger } from '@nestjs/common';
import { HttpException, Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

// Custom exception filter for logging validation errors
@Catch(BadRequestException)
class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Log the full error details for debugging
    this.logger.error('Validation exception: ', exception.message);

    const status = exception.getStatus();
    const message = exception.message || 'Validation failed';

    // Send response back to client with more details
    response.status(status).json({
      statusCode: status,
      message: message,
      errors: exception.getResponse(),  // Include validation errors
      path: request.url,
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use the ValidationPipe with custom options
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: false,
    }),
  );

  // Apply the custom validation exception filter globally
  app.useGlobalFilters(new ValidationExceptionFilter());

  await app.listen(3333);
}

bootstrap();
=======
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException, Logger } from '@nestjs/common';
import { HttpException, Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

// Custom exception filter for logging validation errors
@Catch(BadRequestException)
class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Log the full error details for debugging
    this.logger.error('Validation exception: ', exception.message);

    const status = exception.getStatus();
    const message = exception.message || 'Validation failed';

    // Send response back to client with more details
    response.status(status).json({
      statusCode: status,
      message: message,
      errors: exception.getResponse(),  // Include validation errors
      path: request.url,
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use the ValidationPipe with custom options
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: false,
    }),
  );

  // Apply the custom validation exception filter globally
  app.useGlobalFilters(new ValidationExceptionFilter());

  await app.listen(3333);
}

bootstrap();
>>>>>>> 6bcfb262e57f216b58b1251b43670ff842f23284
