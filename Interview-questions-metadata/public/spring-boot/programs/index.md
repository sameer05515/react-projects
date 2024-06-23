# write spring boot rest controller to send streaming data as response

To create a Spring Boot REST controller that sends streaming data as a response, you can use the `StreamingResponseBody` class. This allows you to send data in a streaming fashion, which is useful for large data sets or real-time data.

Here's an example of how you can create a Spring Boot REST controller that streams data as a response:

```java
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.IOException;
import java.io.OutputStream;

@RestController
@RequestMapping("/streaming")
public class StreamingController {

    @GetMapping(value = "/data", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<StreamingResponseBody> streamData() {
        StreamingResponseBody responseBody = new StreamingResponseBody() {
            @Override
            public void writeTo(OutputStream outputStream) throws IOException {
                // Simulate streaming data, you can replace this with your data source
                for (int i = 0; i < 10; i++) {
                    String data = "Data " + i + "\n";
                    outputStream.write(data.getBytes());
                    outputStream.flush();
                    try {
                        Thread.sleep(1000); // Simulate delay between data chunks
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
                outputStream.close();
            }
        };

        return ResponseEntity.ok().body(responseBody);
    }
}
```

In this example, we've created a REST endpoint at `/streaming/data`. When a client makes a GET request to this endpoint, it will receive a stream of data in the response. You can replace the simulated data with your actual data source or streaming logic.

Make sure to include the necessary dependencies in your `build.gradle` or `pom.xml` for Spring Boot and Spring Web. This example uses the `StreamingResponseBody` to stream data in chunks.

Remember to adapt this code to your specific use case and data source as needed.