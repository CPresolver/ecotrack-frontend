import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // Isso pode ser útil para garantir que o estado do usuário seja carregado corretamente
      router.push("/login");
    }
  }, [user, router]);

  if (user === null) {
    // Exibe nada ou um carregando até o usuário ser carregado
    return <p>Carregando...</p>;
  }

  return children;
};

export default PrivateRoute;
