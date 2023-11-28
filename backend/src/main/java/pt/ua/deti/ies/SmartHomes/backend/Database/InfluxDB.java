package pt.ua.deti.ies.SmartHomes.backend.Database;

public class InfluxDB {

    private static char[] token = "my-token".toCharArray();
    private static String org = "my-org";
    private static String bucket = "my-bucket";

    public static void main(final String[] args) {

    //     InfluxDBClient influxDBClient = InfluxDBClientFactory.create("http://localhost:8086", token, org, bucket);

    //     //
    //     // Write data
    //     //
    //     WriteApiBlocking writeApi = influxDBClient.getWriteApiBlocking();

    //     //
    //     // Write by Data Point
    //     //
    //     Point point = Point.measurement("temperature")
    //             .addTag("location", "west")
    //             .addField("value", 55D)
    //             .time(Instant.now().toEpochMilli(), WritePrecision.MS);

    //     writeApi.writePoint(point);

    //     //
    //     // Write by LineProtocol
    //     //
    //     writeApi.writeRecord(WritePrecision.NS, "temperature,location=north value=60.0");

    //     //
    //     // Write by POJO
    //     //
    //     Temperature temperature = new Temperature();
    //     temperature.location = "south";
    //     temperature.value = 62D;
    //     temperature.time = Instant.now();

    //     writeApi.writeMeasurement( WritePrecision.NS, temperature);

    //     //
    //     // Query data
    //     //
    //     String flux = "from(bucket:\"my-bucket\") |> range(start: 0)";

    //     QueryApi queryApi = influxDBClient.getQueryApi();

    //     List<FluxTable> tables = queryApi.query(flux);
    //     for (FluxTable fluxTable : tables) {
    //         List<FluxRecord> records = fluxTable.getRecords();
    //         for (FluxRecord fluxRecord : records) {
    //             System.out.println(fluxRecord.getTime() + ": " + fluxRecord.getValueByKey("_value"));
    //         }
    //     }

    //     influxDBClient.close();
    // }

    // @Measurement(name = "temperature")
    // private static class Temperature {

    //     @Column(tag = true)
    //     String location;

    //     @Column
    //     Double value;

    //     @Column(timestamp = true)
    //     Instant time;
    }
    
}
