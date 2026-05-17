package com.rabisko.mvp.repositories;

import com.rabisko.mvp.domain.studio.Studio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Repositorio JPA de Studio (tabela `estudios`). Sem queries customizadas
 * por enquanto — JpaRepository cobre o que precisamos.
 */
public interface StudioRepository extends JpaRepository<Studio, UUID> {
}
