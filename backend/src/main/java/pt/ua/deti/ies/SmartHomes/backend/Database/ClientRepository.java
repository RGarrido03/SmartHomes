package pt.ua.deti.ies.SmartHomes.backend.Database;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Client findByName(String name);

}

