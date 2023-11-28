package pt.ua.deti.ies.SmartHomes.backend.Database;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "House")
public class House {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long houseId;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @NotBlank(message = "House name is mandatory")
    private String name;

    @NotBlank(message = "House location is mandatory")
    private String location;

    private BigDecimal electricityPow;
    private BigDecimal electricityMon;
    private BigDecimal waterLiters;
    private BigDecimal waterMon;

    private int totalSolarPV;
    private int totalWindGen;
    private int sentToGrid;
    private int waterLitersYesterday;
    private int waterLitersWeek;

    @OneToMany(mappedBy = "devices")
    private List<Device> devices;

    public House(long houseId, Client client, @NotBlank(message = "House name is mandatory") String name,
            @NotBlank(message = "House location is mandatory") String location, BigDecimal electricityPow,
            BigDecimal electricityMon, BigDecimal waterLiters, BigDecimal waterMon, int totalSolarPV, int totalWindGen,
            int sentToGrid, int waterLitersYesterday, int waterLitersWeek, List<Device> devices) {
        this.houseId = houseId;
        this.client = client;
        this.name = name;
        this.location = location;
        this.electricityPow = electricityPow;
        this.electricityMon = electricityMon;
        this.waterLiters = waterLiters;
        this.waterMon = waterMon;
        this.totalSolarPV = totalSolarPV;
        this.totalWindGen = totalWindGen;
        this.sentToGrid = sentToGrid;
        this.waterLitersYesterday = waterLitersYesterday;
        this.waterLitersWeek = waterLitersWeek;
        this.devices = devices;
    }

    public long getHouseId() {
        return houseId;
    }

    public void setHouseId(long houseId) {
        this.houseId = houseId;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BigDecimal getElectricityPow() {
        return electricityPow;
    }

    public void setElectricityPow(BigDecimal electricityPow) {
        this.electricityPow = electricityPow;
    }

    public BigDecimal getElectricityMon() {
        return electricityMon;
    }

    public void setElectricityMon(BigDecimal electricityMon) {
        this.electricityMon = electricityMon;
    }

    public BigDecimal getWaterLiters() {
        return waterLiters;
    }

    public void setWaterLiters(BigDecimal waterLiters) {
        this.waterLiters = waterLiters;
    }

    public BigDecimal getWaterMon() {
        return waterMon;
    }

    public void setWaterMon(BigDecimal waterMon) {
        this.waterMon = waterMon;
    }

    public int getTotalSolarPV() {
        return totalSolarPV;
    }

    public void setTotalSolarPV(int totalSolarPV) {
        this.totalSolarPV = totalSolarPV;
    }

    public int getTotalWindGen() {
        return totalWindGen;
    }

    public void setTotalWindGen(int totalWindGen) {
        this.totalWindGen = totalWindGen;
    }

    public int getSentToGrid() {
        return sentToGrid;
    }

    public void setSentToGrid(int sentToGrid) {
        this.sentToGrid = sentToGrid;
    }

    public int getWaterLitersYesterday() {
        return waterLitersYesterday;
    }

    public void setWaterLitersYesterday(int waterLitersYesterday) {
        this.waterLitersYesterday = waterLitersYesterday;
    }

    public int getWaterLitersWeek() {
        return waterLitersWeek;
    }

    public void setWaterLitersWeek(int waterLitersWeek) {
        this.waterLitersWeek = waterLitersWeek;
    }

    public List<Device> getDevices() {
        return devices;
    }

    public void setDevices(List<Device> devices) {
        this.devices = devices;
    }
    
    

}
