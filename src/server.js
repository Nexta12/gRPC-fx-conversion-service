const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("proto/fx.proto");
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

server.addService(grpcObject.FXService.service, {
  GetQuote: (_, callback) => {
    const quotes = ["1.2345", "1.3456", "1.4567"]; // Sample quotes
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    callback(null, { quote: randomQuote });
  },
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Error starting gRPC server:", err);
    } else {
      console.log("gRPC server running on port:", port)
    }
  }
);
