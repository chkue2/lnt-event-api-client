interface ConnectionDone {
  (): void;
}

interface ConnectionCallback {
  (done: ConnectionDone): void;
}

class ConnectionPool {
  private queues: ConnectionCallback[] = [];
  private busy = false;
  private interval: NodeJS.Timeout;

  constructor() {
    this.interval = setInterval(() => {
      if (!this.busy && this.queues.length > 0) {
        this.busy = true;
        const queue = this.queues.shift();
        if (queue) queue(() => (this.busy = false));
      }
    }, 50);
  }

  public stop() {
    clearInterval(this.interval);
  }

  public subscribe(ConnectionCallback: ConnectionCallback) {
    this.queues.push(ConnectionCallback);
  }
}

const connectionPool = new ConnectionPool();
export default connectionPool;
