package com.rabisko.mvp.domain.user;

/**
 * INPUT do DELETE /user/excluir-conta. So precisa do email — o User e
 * achado por email no UserService.excluirUser.
 */
public record ExcludeDTO(String email) {
}
