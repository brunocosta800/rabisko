package com.rabisko.mvp.repositories;

import com.rabisko.mvp.domain.client.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/*
 * Realinhamento: PK UUID (tabela public.clientes).
 */
public interface ClientRepository extends JpaRepository<Client, UUID> {
}
