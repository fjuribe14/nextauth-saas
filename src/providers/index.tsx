// import { AuthSessionProvider } from "./session-provider";
import { ThemeProvider } from "./theme-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {/* <AuthSessionProvider> */}
      {children}
      {/* </AuthSessionProvider> */}
    </ThemeProvider>
  );
}

export default Providers;
