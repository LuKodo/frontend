import { createContext, createEffect, createSignal, useContext, JSXElement } from "solid-js";

interface AuthContextType {
    isAuthenticated: boolean;
    user: { username: string } | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>();

export const AuthProvider = (props: { children: JSXElement }) => {
    const [isAuthenticated, setIsAuthenticated] = createSignal(
        localStorage.getItem('user') !== null
    );
    const [user, setUser] = createSignal<{ username: string } | null>(null);

    createEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
        }
    });

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok && response.status === 200) {
                const data = await response.json();
                const userData = data[0];

                setIsAuthenticated(true);
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');
    };

    const value: AuthContextType = {
        get isAuthenticated() { return isAuthenticated(); },
        get user() { return user(); },
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};