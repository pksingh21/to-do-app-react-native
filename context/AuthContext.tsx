import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { supabase } from "../supabaseInit";
import { Session } from "@supabase/supabase-js";
interface ContextProps {
  userLoggedIn: boolean;
  session: Session | null;
}
export const AuthContext = createContext<Partial<ContextProps>>({
  userLoggedIn: false,
  session: null,
});

interface ContextProps {
  children: React.ReactNode;
}

export function AuthProvider(props: ContextProps): React.ReactNode {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    async function login() {
      try {
        const session = await supabase.auth.getSession();
        const sessionData = session.data.session;
        setSession(sessionData);
        setUserLoggedIn(sessionData ? true : false);
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setSession(session);
            setUserLoggedIn(session ? true : false);
          }
        );
        return () => {
          authListener!.subscription.unsubscribe();
        };
      } catch (err) {
        console.log(err);
      }
    }
    login();
  }, [userLoggedIn]);
  return (
    <AuthContext.Provider value={{ userLoggedIn, session }}>
      {props.children}
    </AuthContext.Provider>
  );
}
