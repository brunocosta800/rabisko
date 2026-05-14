package com.rabisko.mvp.repositories;

import com.rabisko.mvp.domain.studio.Studio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/*
 * Realinhamento: PK UUID (tabela public.estudios).
 */
public interface StudioRepository extends JpaRepository<Studio, UUID> {
}
