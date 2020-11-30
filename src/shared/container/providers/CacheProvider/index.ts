import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';

import RedisCacheProdiver from './implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProdiver,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
