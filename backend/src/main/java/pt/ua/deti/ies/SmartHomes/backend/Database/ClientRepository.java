package pt.ua.deti.ies.SmartHomes.backend.Database;


import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Client findByName(String name);

    Client createClient();

    @Query("SELECT c FROM Client c WHERE c.email = :email")
    Client findByEmailAddress(@Param("email") String email);

    Page<Client> findAll(Pageable pageable);



}

