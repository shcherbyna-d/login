import {
  User,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { firebaseApp } from "../firebase";

type AuthContextProps = {
  token: string | null;
  loading: boolean;
  user: User | null;
  onLogin: (login: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth(firebaseApp);

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const token = await user.getIdToken();

        setToken(token);
        setUser(user);
        setLoading(false);
      } else {
        // User is signed out
        setToken(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [auth]);

  const handleLogin = async (login: string, password: string) => {
    signInWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user.getIdToken();
      })
      .then((token) => {
        setToken(token);

        const origin = location.state?.from?.pathname || "/home";
        navigate(origin);
      });
  };

  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        setToken(null);
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const value = {
    token,
    loading,
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps | null => {
  return useContext(AuthContext);
};
