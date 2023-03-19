import api from "@/services/api";

export async function getSession() {
  try {
    const response = await api.get("/api/v1/session/");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao obter a sessão: " + error.message);
  }
}

export async function getUsers() {
  try {
    const response = await api.get("/api/v1/whoami/");
    const data = response.data;
    const user_info = {
      id: data?.id,
      password: data?.password,
      last_login: data?.last_login,
      is_superuser: data?.is_supersuser,
      first_name: data?.first_name,
      lastname: data?.last_name,
      email: data?.email,
      is_staff: data?.is_staff,
      is_active: data?.is_active,
      date_joined: data?.date_joined,
      matricula: data?.matricula,
      data_admissao: data?.data_admissao,
      gestor: data?.gestor,
      data_senha: data?.data_senha,
      groups: data?.groups,
      user_permissions: data?.user_permissions,
      setores: data?.setores,
    };
    const user_type = user_info.setores[0].recursos_humanos;
    return { user_info, user_type };
  } catch (error) {
    throw new Error("Erro ao obter usuários: " + error.message);
  }
}