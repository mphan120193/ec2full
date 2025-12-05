import { createClient } from 'redis';

const redisClient = createClient(
  {
  //url: 'redis://redis:6379' // this is only we put backend frontend and redis is in 1 container
  url: 'redis://localhost:6379'
}
);

await redisClient.connect();

export default redisClient;
