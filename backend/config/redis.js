import { createClient } from 'redis';

const redisClient = createClient(
  {
  url: 'redis://redis:6379' // this is only we put backend frontend and redis is in 1 container
  
}
);

await redisClient.connect();

export default redisClient;
