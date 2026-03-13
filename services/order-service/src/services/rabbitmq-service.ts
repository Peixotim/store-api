import { Connection, Channel, connect, Message } from 'amqplib';
export class RabbitMQService {
  private connection!: Connection;
  private channel!: Channel;

  constructor(private uri: string) {}

  private reconnect(): void {
    setTimeout(() => {
      this.start();
    }, 5000);
  }

  public async start(): Promise<void> {
    try {
      this.connection = await connect(this.uri);
      this.channel = await this.connection.createChannel();
      console.log('[RabbitMQ] Successfully connected!');

      this.connection.on('error', (error) => {
        console.error(`[RabbitMQ] Error in connection`, error);
      });

      this.connection.on('close', () => {
        console.warn('[RabbitMQ] Connection lost. Attempting to reconnect in 5 seconds...');
        this.reconnect();
      });
    } catch (error) {
      console.error(`Error in Start Connection with RabbitMQ`);
      throw error;
    }
  }

  public async publishInQueue<T>(queue: string, message: T): Promise<void> {
    if (!this.channel) {
      throw new Error(`RabbitMQ Channel it is not open !`);
    }

    await this.channel.assertQueue(queue, { durable: true });

    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  }
}
