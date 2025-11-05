import { useState, useEffect, useMemo, type PropsWithChildren } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import bgImage2 from '@/images/2.jpg';

const BACKGROUND_IMAGES = [ bgImage2 ];

type SiteLayoutProps = { mainClassName?: string };
type NavItem = { label: string; to: string; isButton?: boolean };
interface User { id: number; nim: string; role: string }

const USER_NAV_ITEMS: NavItem[] = [ 
    { label: "Home", to: "/" }, 
    { label: "General Election", to: "/general-election" }, 
    { label: "Candidates", to: "/candidates" } 
];

// --- PERUBAHAN UTAMA DI SINI ---
// Tambahkan link untuk halaman admin yang baru
const ADMIN_NAV_ITEMS: NavItem[] = [ 
    { label: "Home", to: "/" }, 
    { label: "Live Score", to: "/admin/dashboard" },
    { label: "Manage Users", to: "/admin/users" },
    { label: "Add Candidate", to: "/admin/add-candidate" }
];
// --- AKHIR PERUBAHAN ---

const SiteLayout = ({ children, mainClassName }: PropsWithChildren<SiteLayoutProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => { if (isHomePage) { const intervalId = setInterval(() => setBgIndex(prev => (prev + 1) % BACKGROUND_IMAGES.length), 10000); return () => clearInterval(intervalId); } }, [isHomePage]);
  useEffect(() => { 
    const userDataString = localStorage.getItem('loggedInUser'); 
    if (userDataString) {
        try {
            setUser(JSON.parse(userDataString));
        } catch(e) {
            console.error("Gagal parse data user dari localStorage", e);
            // Hapus data yang korup
            localStorage.removeItem('loggedInUser');
        }
    }
  }, []);
  
  const handleLogout = () => { localStorage.removeItem('loggedInUser'); setUser(null); setIsOpen(false); navigate('/login'); };
  
  const navItemsToDisplay = useMemo(() => {
    if (user?.role === 'ADMIN') {
      return ADMIN_NAV_ITEMS;
    }
    if (user) {
      return USER_NAV_ITEMS;
    }
    return [
      ...USER_NAV_ITEMS,
      { label: "Register", to: "/register", isButton: true },
      { label: "Login", to: "/login", isButton: true }
    ];
  }, [user]);

  return (
    <div className={cn("relative flex min-h-screen flex-col overflow-hidden text-white", !isHomePage && "bg-brand-gradient")}>
      
      {isHomePage ? (
        <>
          <div className="fixed inset-0 z-[-10] bg-black">
            {BACKGROUND_IMAGES.map((imageUrl, index) => (
              <div
                key={index}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                style={{ backgroundImage: `url(${imageUrl})`, opacity: index === bgIndex ? 1 : 0 }}
              />
            ))}
          </div>
          <div 
            className="fixed inset-0 z-[-9]"
            style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 20%, transparent 80%)' }}
          />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute -top-32 left-16 h-72 w-72 rounded-full bg-brand-radial blur-3xl" />
          <div className="pointer-events-none absolute right-[-6rem] top-40 h-96 w-96 rounded-full bg-brand-radial blur-3xl" />
        </>
      )}
      
      <header className="fixed top-0 w-full z-30 px-4 py-6 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl">
          <NavLink to="/" className="flex shrink-0 items-center gap-3">
            <img
              src="https://i.ibb.co/93f5Byrn/Group-673.png"
              alt="HMPSTI logo"
              className={cn(
                "h-10 w-auto object-contain transition-all duration-300",
                { "filter brightness-0 invert": !isHomePage }
              )}
              loading="lazy"
            />
          </NavLink>

          <div className="flex flex-1 items-center justify-end gap-3">
            <nav className="hidden lg:flex lg:items-center lg:gap-x-2">
              <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm font-medium">
                {navItemsToDisplay.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} className={({ isActive }) => cn( "rounded-full px-4 py-2 transition", item.isButton && "border border-white/80 bg-transparent font-semibold text-white hover:bg-white hover:text-brand-primary-soft", !item.isButton && "hover:bg-white/15", isActive && !item.isButton && "bg-white text-brand-primary-soft" )}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {user && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer ml-4">
                      <AvatarImage src="" alt="User profile" />
                      <AvatarFallback className="bg-primary text-white font-bold">{user.nim.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-4">
                    <DropdownMenuLabel>Hello, <span className="font-semibold">{user.nim}</span></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </nav>

            <button type="button" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20 lg:hidden" onClick={() => setIsOpen((prev) => !prev)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
            <div className="mx-auto mt-4 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl lg:hidden">
               <ul className="flex flex-col gap-y-2 p-4 text-center">
                {navItemsToDisplay.map((item) => (
                  <li key={item.to}>
                    <NavLink 
                      to={item.to} 
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => cn( "block rounded-lg px-4 py-3 transition", item.isButton && "border border-white/80 bg-transparent font-semibold text-white hover:bg-white hover:text-brand-primary-soft", !item.isButton && "hover:bg-white/15", isActive && !item.isButton && "bg-white text-brand-primary-soft" )}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
        )}
      </header>
      
      <main className={cn("relative z-20 flex-1 pt-32 sm:pt-40", mainClassName)}>
        {children}
      </main>
    </div>
  );
};

export default SiteLayout;