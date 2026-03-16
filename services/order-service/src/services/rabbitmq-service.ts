import * as amqp from 'amqplib';

export class RabbitMQService {
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;

  constructor(private uri: string) {}

  public async start(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.uri);
      this.channel = await this.connection.createChannel();

      console.log(`[RabbitMQ] Connected and channel created!`);
    } catch (error) {
      console.error(`[RabbitMQ] Errors related to connecting to RabbitMQ:`, error);
      throw error;
    }
  }
  public async consume<T>(queue: string, callback: (message: T) => Promise<void>): Promise<void> {
    if (!this.channel) {
      throw new Error(`[RabbitMQ] Channel not initialized`);
    }

    await this.channel.assertQueue(queue, { durable: true });

    await this.channel.prefetch(1);

    console.log(`[RabbitMQ] Listening to the queue: ${queue}`);

    this.channel.consume(queue, async (msg) => {
      if (msg) {
        try {
          const content: T = JSON.parse(msg.content.toString());
          await callback(content);

          this.channel.ack(msg);
        } catch (error) {
          console.error(`[RabbitMQ] Error processing message from queue. ${queue}:`, error);
          this.channel.nack(msg, false, true);
        }
      }
    });
  }

  public async publishInQueue<T>(queue: string, message: T): Promise<void> {
    if (!this.channel) {
      throw new Error(`[RabbitMQ] Channel not initialized`);
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  }
}
