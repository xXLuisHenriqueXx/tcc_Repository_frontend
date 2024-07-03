import { ReactNode, createContext, useEffect, useMemo, useReducer } from "react";
import * as SecureStore from "expo-secure-store"
import { User } from "../entities/User"
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../services/authService";
import { Alert } from "react-native";

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isSignout: boolean;
}

interface AuthAction {
    type: "RESTORE_TOKEN" | "SIGN_IN" | "SIGN_OUT";
    user: User | null;
    token: string | null;
}

function authReducer(prevState: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "RESTORE_TOKEN":
            return {
                ...prevState,
                user: action.user,
                token: action.token,
                isLoading: false,
            };

        case "SIGN_IN":
            return {
                ...prevState,
                user: action.user,
                token: action.token,
                isSignout: false,
            };

        case "SIGN_OUT":
            return {
                ...prevState,
                user: null,
                token: null,
                isSignout: true,
            };

        default:
            return prevState;
    }
}

interface AuthContextData extends AuthState {
    register: (
        name: string,
        email: string,
        password: string,
    ) => Promise<void>;

    login: (
        email: string,
        password: string,
    ) => Promise<void>;

    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export function AuthContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [state, dispatch] = useReducer(authReducer, {
        isLoading: true,
        isSignout: false,
        user: null,
        token: null,
    });

    useEffect(() => {
        const bootstrapAsync = async () => {
            let storedToken: string | null = null;
            let currentUser: User | null = null;

            try {
                storedToken = await SecureStore.getItemAsync("luisapp-token");
                const userDataString = await AsyncStorage.getItem("@current-user");
                currentUser = userDataString ? JSON.parse(userDataString) : null;
            } catch (err) {
                console.log(err);
            }

            dispatch({
                type: "RESTORE_TOKEN",
                token: storedToken,
                user: currentUser
            });
        };

        bootstrapAsync();
    }, []);

    const methods = useMemo(
        () => ({
            logout: async () => {
                dispatch({
                    type: "SIGN_OUT",
                    token: null,
                    user: null
                });

                await SecureStore.deleteItemAsync("luisapp-token");
                await AsyncStorage.removeItem("@user");
            },

            login: async (
                email: string,
                password: string
            ) => {
                const params = { email, password };

                const { status, data } = await authService.login(params);

                if (status === 400 || status === 401) {
                    return;
                }

                dispatch({
                    type: "SIGN_IN",
                    token: data.token,
                    user: data.user
                });
            },

            register: async (
                name: string,
                email: string,
                password: string
            ) => {
                const params = { name, email, password };

                const loginParams = { email, password };

                const data = await authService.register(params);

                if (data.status === 400) {
                    Alert.alert("Erro ao cadastrar", data.data.message);

                    return;
                }

                dispatch({
                    type: "SIGN_IN",
                    token: data?.data.token,
                    user: data?.data.user
                });

                await authService.login(loginParams);
            },
        }), []
    );

    return (
        <AuthContext.Provider value={{ ...state, ...methods}}>
            { children }
        </AuthContext.Provider>
    )
}