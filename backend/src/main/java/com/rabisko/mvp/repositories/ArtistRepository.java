package com.rabisko.mvp.repositories;

import com.rabisko.mvp.domain.artist.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/*
 * Realinhamento: PK UUID (tabela public.tatuadores).
 */
public interface ArtistRepository extends JpaRepository<Artist, UUID> {
}
