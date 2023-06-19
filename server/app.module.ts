import { ContextType, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { EnvValidationSchema } from '@/common/validation/env.validation';
import { I18nLangResolver } from '@/common/middleware/i18n.resolver';
import { AuthModule } from '@/graphql/auth/auth.module';
import { ServerModule } from '@/graphql/server/server.module';
import { UserModule } from '@/graphql/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvValidationSchema,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '..', 'server', 'locales'),
        watch: true,
      },
      loader: I18nJsonLoader,
      resolvers: [I18nLangResolver],
      typesOutputPath: join(
        __dirname,
        '..',
        'server',
        'types',
        'generated',
        'i18n.generated.ts',
      ),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
      },
      context: (ctx: ContextType) => ctx,
      autoSchemaFile: join(
        __dirname,
        '..',
        'server',
        'types',
        'generated',
        'schema.gql',
      ),
    }),
    AuthModule,
    ServerModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
