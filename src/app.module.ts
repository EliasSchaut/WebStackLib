import { ContextType, DynamicModule, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { EnvValidationSchema } from '@/common/validation/env.validation';
import { I18nLangResolver } from '@/common/middleware/i18n.resolver';

@Module({})
export class WebStackAppModule {
  static forRoot(
    modules: any[] = [],
    options?: {
      i18n_path?: string;
    },
  ): DynamicModule {
    return {
      module: this,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: EnvValidationSchema,
          ignoreEnvFile: true,
        }),
        I18nModule.forRoot({
          fallbackLanguage: 'en',
          loaderOptions: {
            path: options?.i18n_path ?? join(__dirname, '..', 'src', 'locales'),
            watch: false,
          },
          loader: I18nJsonLoader,
          resolvers: [I18nLangResolver],
          typesOutputPath: join(
            __dirname,
            '..',
            'src',
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
            process.cwd(),
            'src',
            'types',
            'generated',
            'schema.gql',
          ),
        }),
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'client', 'dist'),
        }),
        ...modules,
      ],
    };
  }
}
