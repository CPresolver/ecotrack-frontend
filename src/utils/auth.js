import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login"); // Redireciona se não estiver autenticado
      }
    }, [user, loading, router]);

    if (loading) return <p>Carregando...</p>;

    return user ? <Component {...props} /> : null;
  };
}
