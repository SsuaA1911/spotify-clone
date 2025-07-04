import type { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import {
    useSessionContext,
    useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import type { Subscription, UserDetails } from "@/types";
import { SiApachehbase } from "react-icons/si";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined,
);

export interface Props {
    children: React.ReactNode;
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase,
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const getUserDetails = () => supabase.from("user").select("*").single();
    const getSubscription = () =>
        supabase
            .from("subscriptions")
            .select("*,prices(*,products(*))")
            .in("status", ["trialing", "active"])
            .single();

    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription && isHydrated) {
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                (results) => {
                    const userDetailsPromise = results[0];
                    const subscriptionPromise = results[1];

                    if (userDetailsPromise.status === "fulfilled") {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                    }

                    if (subscriptionPromise.status === "fulfilled") {
                        setSubscription(subscriptionPromise.value.data as Subscription);
                    }
                    setIsLoadingData(false);
                },
            );
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
            setSubscription(null);
        }
    }, [user, isLoadingUser, isHydrated]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription,
    };

    // Don't render until hydrated to prevent mismatch
    if (!isHydrated) {
        return <div {...props} />;
    }

    return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a MyUserContextProvider");
    }
    return context;
};