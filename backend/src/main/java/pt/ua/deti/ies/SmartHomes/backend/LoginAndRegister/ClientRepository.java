package pt.ua.deti.ies.SmartHomes.backend.LoginAndRegister;

import org.springframework.data.jpa.repository.JpaRepository;

import pt.ua.deti.ies.SmartHomes.backend.Database.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findByUsername(String username);
}
