// "use client";

// import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

// import { ThemeProvider } from "@/components/theme-provider";
// import { SessionContext } from "next-auth/react";
// import { ReactNode, useState } from "react";

// function Providers({ children }: {children: ReactNode }) {
//     const [supabaseClient] = useState(() => createBrowserSupabaseClient());
//     return (
//         <SessionContextProvider supabaseClient={supabaseClient}>
//             <Provider store={store}>
//                 <ThemeProvider enableSystem={true} attribute="class">
//                     <Toaster position="top-center"/>
//                     {children}
//                 </ThemeProvider>
//             </Provider>
//         </SessionContextProvider>
//     )
// }

// export default Providers;