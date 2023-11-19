export interface Order {
  price: number,
  size: number,
}

export interface ServerRespond {
  stock: string,
  top_bid: Order,
  top_ask: Order,
  timestamp: Date,
}

class DataStreamer {
  static API_URL: string = 'http://localhost:3000/query?id=1';

  static async getData(): Promise<ServerRespond[]> {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', DataStreamer.API_URL, true);

      request.onload = () => {
        if (request.status === 200) {
          // Imprime la respuesta para depurar
          console.log('Raw response:', request.responseText);

          // Intenta limpiar la respuesta antes de analizarla como JSON
          const cleanedResponse = request.responseText.trim();
          try {
            const jsonData = JSON.parse(cleanedResponse) as ServerRespond[];
            resolve(jsonData);
          } catch (error) {
            console.error('Error parsing JSON:', error);
            reject(new Error('Error parsing JSON'));
          }
        } else {
          reject(new Error('Request failed'));
        }
      };

      request.send();
    });
  }
}

export default DataStreamer;
