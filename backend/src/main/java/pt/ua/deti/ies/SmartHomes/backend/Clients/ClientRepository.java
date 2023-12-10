package pt.ua.deti.ies.SmartHomes.backend.Clients;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findByUsername(String username);
}

